import Head from "next/head";
import Header from "./component/Header";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Card } from "@mui/material";
// const Hoge = dynamic(() => import(""), { ssr: false });
const inter = Inter({ subsets: ["latin"] });
interface dt {
  data: res;
}
interface res {
  results: shp;
}
interface shp {
  shop: Array<any>;
}
interface geo {
  coords: coo;
}
interface coo {
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  accuracy: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}
export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  console.log(context.query.lat);
  let lat: string = String(context.query.lat);
  let lang: string = String(context.query.lang);
  // if (!context.query) {
  //   lat = 33;
  //   lang = 23;
  // } else {
  //   lat = context.query.lat;
  //   lang = context.query.lang;
  // }
  const defaultEndpoint: string = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.API_KEY}&format=json&lat=${lat}&lng=${lang}&range=5`;
  console.log(defaultEndpoint);
  const res: Response = await fetch(defaultEndpoint);
  const data: JSON = await res.json();

  return {
    props: {
      data,
    },
  };
};
export default function Home({ data }: dt) {
  const [aa, setAA] = useState<string | null>("/next.svg");
  const [ppp, setPPP] = useState<number | null>();
  const [pppp, setPPPP] = useState<number | null>();
  const router = useRouter();
  const pp = () => {
    navigator.geolocation.getCurrentPosition(suc, err);
  };
  const suc = (geos: geo) => {
    setPPP(geos.coords.latitude);
    setPPPP(geos.coords.longitude);
    console.log(ppp);
    console.log(pppp);
    console.log("succ");
  };
  const err = () => {
    console.log("err");
  };
  useEffect(() => {
    pp();
    suc;
    push;
    getServerSideProps;
  });
  const push = () => {
    // const query = {
    //   lat: ppp,
    //   lang: pppp,
    // };
    console.log(data);
    console.log(aa);
    router.push(
      {
        pathname: "/",
        query: { lat: ppp, lang: pppp },
      },
      "/"
    );
    if (data.results.shop[0] !== "undefined") {
      setAA(data.results.shop[0].logo_image);
    } else {
      setAA("aa");
    }
  };
  return (
    <div id="app">
      <Header />
      <video
        src="/gourmet.mp4"
        muted
        autoPlay
        loop
        width="auto"
        style={{ maxWidth: "100%", opacity: 0.7 }}
      ></video>
      {ppp} <button onClick={push}>push</button>
      <Card component="img" src={aa + ""} alt="" width={50} height="auto" />
    </div>
  );
}
