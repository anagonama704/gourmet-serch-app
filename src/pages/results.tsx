import next, { GetServerSideProps } from "next/types";
import Header from "./component/Header";
import { Card } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  console.log(context.query.lat);
  let lat: string = String(context.query.lat);
  let lang: string = String(context.query.lang);
  let range: string = String(context.query.range);
  // if (!context.query) {
  //   lat = 33;
  //   lang = 23;
  // } else {
  //   lat = context.query.lat;
  //   lang = context.query.lang;
  // }
  const defaultEndpoint: string = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.API_KEY}&format=json&count=100&lat=${lat}&lng=${lang}&range=${range}`;
  console.log(defaultEndpoint);
  const res: Response = await fetch(defaultEndpoint);
  const data: JSON = await res.json();

  return {
    props: {
      data,
    },
  };
};
const Results = ({ data }: any) => {
  const psp = () => {
    console.log(data);
  };

  return (
    <div id="app">
      <Header />
      <div className="res">
        <Card />
        <Link href="/">aaa</Link>
        <button onClick={psp}>aaaa</button>
      </div>
    </div>
  );
};
export default Results;
