import axios from "axios";
import next, { GetServerSideProps } from "next/types";
import { useEffect } from "react";
import Header from "./component/Header";
import styles from "@/styles/ResultsDetail.module.css";
import { Card, CardContent, CardHeader } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
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
  const defaultEndpoint: string = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.API_KEY}&format=json&id=${context.query.shopId}`;
  console.log(defaultEndpoint);
  const res: Response = await fetch(defaultEndpoint);
  const data: dt = await res.json();

  return {
    props: {
      data,
    },
  };
};
const Results_detail = ({ data }: dt) => {
  console.log(data);
  useEffect(() => {}, []);
  return (
    <div className={styles.results_detail}>
      <Header />
      <main className={styles.main}>
        {data.results.shop.map((ress, index) => {
          return (
            <Card component="div" key={index} className={styles.card}>
              <div className={styles.card_cmp}>
                <CardHeader
                  title={
                    <div style={{ display: "flex" }}>
                      <RestaurantIcon />
                      {"　" + ress.genre.name}
                    </div>
                  }
                  titleTypographyProps={{
                    fontSize: "15px",
                  }}
                  style={{ height: "20px", margin: "20px 0 0 0" }}
                />
                <CardContent>
                  <h2 className={styles.h2}>{ress.name}</h2>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </main>
    </div>
  );
};
export default Results_detail;
