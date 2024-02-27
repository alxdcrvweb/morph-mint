import Image from "next/image";
import styles from "./page.module.css";
import {
  FrameContainer,
  FrameImage,
  FrameButton,
  useFramesReducer,
  getPreviousFrame,
  validateActionSignature,
  FrameInput,
} from "frames.js/next/server";
import { Frame, getFrameFlattened, getFrameHtml } from "frames.js";
import type { Metadata } from "next";

// Declare the frame
const imageUrl = `${process.env.NEXT_PUBLIC_HOST}/main.jpg`;
const initialFrame: Frame = {
  image: imageUrl,
  version: "vNext",
  buttons: [
    {
      action: "post",
      label: "Check WL",
    },
    {
      label: "Mint",
      action: "link",
      target: "https://mrphs.io/mint",
    },

  ],
  postUrl: `${process.env.NEXT_PUBLIC_HOST}/check-wl`,
};

// console.log(process.env.NEXT_PUBLIC_HOST)

// Export Next.js metadata
export const metadata: Metadata = {
  title: "Morpheus",
  description: "Choose your side.",
  openGraph: {
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  other: getFrameFlattened(initialFrame),
};
export default async function Home() {
  // let html = getFrameHtml(initialFrame);
  // console.log(html);
  return <div>Morpheus Frame</div>;
}
