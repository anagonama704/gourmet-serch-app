import Head from "next/head";
import Header from "./component/Header";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { ChangeEvent, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Link from "next/link";
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
  const [range, setRange] = useState<string>("1");
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
  const ppus = () => {
    console.log(ppp);
    router.push(
      {
        pathname: "/results",
        query: { lat: ppp, lang: pppp, range: range },
      },
      "/results"
    );
  };
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
    <div className={styles.apps}>
      <main className={styles.main}>
        <div
          style={{
            width: "auto",
            height: "100vh",
            overflowY: "hidden",
            position: "absolute",
            display: "flex",
          }}
        >
          <video
            src="/gourmet.mp4"
            poster="/backpos.png"
            playsInline
            muted
            autoPlay
            loop
            className={styles.vid}
          ></video>
          <div className={styles.content}>
            <div className={styles.c_left}>
              <div className={styles.left_cmp}>
                <h1 className={styles.h1}>
                  <p>Fit</p>
                  <p>&</p>
                  <p>Eat</p>
                </h1>
                <h2 className={styles.small}>
                  <small>product by kei</small>
                </h2>
              </div>
            </div>
            <div className={styles.c_right}>
              {/* {ppp} <button onClick={push}>push</button>
              <Card
                component="img"
                src={aa + ""}
                alt=""
                width={50}
                height="auto"
              />
              <Link href="/results">aaa</Link>
              <Card>
                <p>aaa</p>
              </Card> */}
              <div className={styles.right_cmp}>
                <label htmlFor="shopName">店舗名</label>
                <input type="text" className={styles.names} name="shopName" />
                <br />
                <FormControl
                  component="div"
                  variant="standard"
                  sx={{ minWidth: 120 }}
                  className={styles.range}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Age
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Age"
                    value={range}
                    onChange={(e) => {
                      if (e.target.value !== undefined) {
                        setRange(e.target.value as string);
                      }
                    }}
                  >
                    <MenuItem value={"1"}>300m</MenuItem>
                    <MenuItem value={"2"}>500m</MenuItem>
                    <MenuItem value={"3"}>1000m</MenuItem>
                    <MenuItem value={"4"}>2000m</MenuItem>
                    <MenuItem value={"5"}>3000m</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained" color="success" onClick={ppus}>
                  Serch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
