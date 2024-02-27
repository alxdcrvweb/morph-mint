import { ImageResponse } from "next/og";
import "../globals.scss";
export const runtime = "experimental-edge";

const getNostra = async () => {
  const response = await fetch(
    new URL(
      "../../public/fonts/Nostra/Nostrav1.0-StreamTrial.otf",
      import.meta.url
    )
  );
  const interSemiBold = await response.arrayBuffer();
  return interSemiBold;
};
const getApocLC = async () => {
  const response = await fetch(
    new URL(
      "../../public/fonts/ApocLC/ApocLC-Regular-Desktop.otf",
      import.meta.url
    )
  );
  const interSemiBold = await response.arrayBuffer();

  return interSemiBold;
};
// ...

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const time = searchParams.get("time");
  const frame = {
    display: "flex",
    // justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundSize: "contain",
    backgroundImage: `url(${process.env.NEXT_PUBLIC_HOST}/timeMorph.jpg)`,
    width: "100%",
    height: "100%",
    paddingTop: "150px",
  };

  return new ImageResponse(
    (
      //@ts-ignore
      <div style={frame}>
        {/* <img style={logo} src={`${process.env.NEXT_PUBLIC_HOST}/logo.svg`}/> */}
        <div style={{fontFamily: 'ApocLC', fontSize: "20px", color: "white"}}>See you soon</div>
        <div style={{ display: "flex", fontFamily: 'ApocLC', fontSize: "122px", color: "white" }}>
          {time}
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: "Nostra",
          data: await getNostra(),
          style: "normal",
          weight: 400,
        },
        {
          name: "ApocLC",
          data: await getApocLC(),
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
