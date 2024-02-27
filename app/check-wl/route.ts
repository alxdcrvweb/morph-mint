// handle frame actions
// ./app/frames/route.ts

import {
  getFrameHtml,
  validateFrameMessage,
  Frame,
  getFrameMessage,
} from "frames.js";
import { NextRequest } from "next/server";
import { wl } from "../whitelist";
import { useState } from "react";
export async function POST(request: NextRequest) {
  const wlImageUrl = `${process.env.NEXT_PUBLIC_HOST}/wl.jpg`;
  const notwlImageUrl = `${process.env.NEXT_PUBLIC_HOST}/nwl.jpg`;
  const body = await request.json();
  let message = await getFrameMessage(body);
  let wlCheck = false;
  if (message.requesterFid) {
    const getUserById = async (id: number | null) => {
      try {
        const response = await fetch(
          `https://api.neynar.com/v2/farcaster/user/bulk?fids=${id}&viewer_fid=${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              api_key: process.env.NEYNAR_API_KEY as string,
            },
          }
        );
        let info = await response.json();
        return info.data.users[0].custody_address;
      } catch (error) {
        console.error("error", error);
      }

      // console.log("HIIIII", response);
    };
    await getUserById(message?.requesterFid).then((res) => {
      const isWl = wl.includes(res.toLowerCase());
      console.log('test');
      if (isWl) {
        wlCheck = true;
      } else {
        wlCheck = false;
      }
    });
    if (wlCheck) {
      const frame: Frame = {
        image: wlImageUrl,
        version: "vNext",
        buttons: [
          {
            label: "Website",
            action: "link",
            target: "https://mrphs.io/",
          },
        ],
        postUrl: `${process.env.NEXT_PUBLIC_HOST}/`,
      };

      // Return the frame as HTML
      const html = getFrameHtml(frame);

      return new Response(html, {
        headers: {
          "Content-Type": "text/html",
        },
        status: 200,
      });
    } else {
      const frame: Frame = {
        image: notwlImageUrl,
        version: "vNext",
        buttons: [
          {
            label: "Website",
            action: "link",
            target: "https://mrphs.io/",
          },
        ],
        postUrl: `${process.env.NEXT_PUBLIC_HOST}/stats`,
      };
      const html = getFrameHtml(frame);

      return new Response(html, {
        headers: {
          "Content-Type": "text/html",
        },
        status: 200,
      });
    }
  } else {
    return new Response("No FID", {
      status: 400,
    });
  }
}
// Use the frame message to build the frame
