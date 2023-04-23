import next, { GetServerSideProps } from "next/types";
import Header from "./component/Header";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import styles from "@/styles/Results.module.css";

type budgetType = {
  average: string;
  code: string;
  name: string;
};
type couponType = {
  pc: string;
  sp: string;
};
type genreType = {
  catch: string;
  code: string;
  name: string;
};
type cordnameType = {
  code: string;
  name: string;
};
type mobileType = {
  l: string;
  s: string;
};
type pcType = {
  l: string;
  m: string;
  s: string;
};
type photoType = {
  mobile: mobileType;
  pc: pcType;
};
type resType = {
  access: string;
  address: string;
  band: string;
  barrier_free: string;
  budget: budgetType;
  budget_memo: string;
  capacity: number;
  card: string;
  catch: string;
  charter: string;
  child: string;
  close: string;
  coupon_urls: couponType;
  course: string;
  english: string;
  free_drink: string;
  free_food: string;
  genre: genreType;
  horigotatsu: string;
  id: string;
  karaoke: string;
  ktai_coupon: number;
  large_area: cordnameType;
  large_service_area: cordnameType;
  lat: number;
  lng: number;
  logo_image: string;
  lunch: string;
  middle_area: cordnameType;
  midnight: string;
  mobile_access: string;
  name: string;
  name_kana: string;
  non_smoking: string;
  open: string;
  other_memo: string;
  parking: string;
  party_capacity: number;
  pet: string;
  photo: photoType;
  private_room: string;
  service_area: cordnameType;
  shop_detail_memo: string;
  show: string;
  small_area: cordnameType;
  station_name: string;
  tatami: string;
  tv: string;
  urls: { pc: string };
  wedding: string;
  wifi: string;
};
type shops = {
  shop: resType[];
};
type dres = {
  results: shops;
};
type dt = {
  data: dres;
};
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
  const data: dt = await res.json();

  return {
    props: {
      data,
    },
  };
};
const Results = ({ data }: dt) => {
  const [res, setRes] = useState<resType[]>([]);
  const psp = () => {
    console.log(data);
    setRes(data.results.shop);
    console.log(res[0]);
  };

  useEffect(() => {
    psp;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <div className={styles.results}>
      <Header />
      <div className="res">
        <main className={styles.main}>
          <Box component="div" className={styles.serch}>
            aaa
          </Box>
          <Box component="div" className={styles.resDez}>
            {res.map((ress, index) => {
              return (
                <Card
                  key={index}
                  style={{
                    width: "30%",
                    height: "300px",
                    margin: "50px 0 0 0",
                  }}
                >
                  <CardHeader
                    avatar={
                      <img src={ress.logo_image + ""} height={30} alt="ok" />
                    }
                    title={ress.name}
                    subheader={ress.access}
                  />
                  <CardMedia
                    component="img"
                    width="auto"
                    height="auto"
                    image={ress.photo.pc.l}
                  />
                  <CardContent></CardContent>

                  {/* <div>{ress.name}</div>

              <Image
                src={ress.logo_image + ""}
                width={100}
                height={100}
                alt="ok"
              /> */}
                </Card>
              );
            })}
          </Box>
        </main>
      </div>
      <Link href="/">aaa</Link>
      <button onClick={psp}>aaaa</button>
    </div>
  );
};
export default Results;
