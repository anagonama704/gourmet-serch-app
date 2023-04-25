import axios from "axios";
import next, { GetServerSideProps } from "next/types";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./component/Header";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LanguageIcon from "@mui/icons-material/Language";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { motion } from "framer-motion";
import styles from "@/styles/ResultsDetail.module.css";
import Footer from "./component/Footer";
import ArrowBackIosNewOutlined from "@mui/icons-material/ArrowBackIosNewOutlined";
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
  const router = useRouter();
  console.log(data);
  useEffect(() => {}, []);
  return (
    <motion.div
      variants={{
        offscreen: {
          // 画面外の場合のスタイル
          y: 100,
          opacity: 0,
        },
        onscreen: {
          // 画面内の場合のスタイル
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        },
      }}
      initial="offscreen" // 初期表示はoffscreen
      whileInView="onscreen" // 画面内に入ったらonscreen
      viewport={{ once: false, amount: 0 }}
      className={styles.results_detail}
    >
      <Header />
      <main className={styles.main}>
        {data.results.shop.map((ress, index) => {
          return (
            <Card component="div" key={index} className={styles.card}>
              <div className={styles.card_cmp}>
                <CardHeader
                  title={
                    <div style={{ display: "flex" }}>
                      <RestaurantIcon
                        style={{ color: "red", fontSize: "20px" }}
                      />
                      {"　" + ress.genre.name}
                    </div>
                  }
                  titleTypographyProps={{
                    fontSize: "15px",
                  }}
                  style={{ height: "20px" }}
                />
                <CardContent style={{ height: "300px" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        width: "60%",
                        maxHeight: "300px",
                        overflowY: "auto",
                      }}
                    >
                      <h3 style={{ padding: "10px 0 7px 0", fontSize: "15px" }}>
                        {ress.name_kana}
                      </h3>
                      <h2 className={styles.h2}>{ress.name}</h2>
                      <h3 style={{ padding: "10px 0 0 0" }}>{ress.catch}</h3>
                      <div
                        style={{
                          width: "90%",
                          height: "auto",
                          padding: "20px 10px",
                        }}
                      >
                        <p className={styles.subc}>住所：{ress.address}</p>
                        <p className={styles.subc}>アクセス：{ress.access}</p>
                        <p className={styles.subc}>営業時間：{ress.open}</p>
                        <p className={styles.subc}>
                          ディナー予算：{ress.budget.average}
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "block",
                        width: "50%",
                        height: "300px",
                        backgroundImage: `url(${ress.photo.pc.l})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  </div>
                </CardContent>
                <CardActions>
                  <IconButton href={ress.urls.pc} target="_blank">
                    <div
                      style={{
                        display: "flex",
                        fontSize: "15px",
                        alignItems: "center",
                      }}
                    >
                      <LanguageIcon />
                      店舗WEBサイト
                    </div>
                  </IconButton>
                  <IconButton href={ress.coupon_urls.pc} target="_blank">
                    <div
                      style={{
                        display: "flex",
                        fontSize: "15px",
                        alignItems: "center",
                      }}
                    >
                      <ConfirmationNumberIcon />
                      クーポン
                    </div>
                  </IconButton>
                </CardActions>
                <Button
                  variant="contained"
                  style={{ display: "block", margin: "0 auto" }}
                  onClick={() => {
                    router.back();
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ArrowBackIosNewOutlined />
                    戻る
                  </div>
                </Button>
              </div>
            </Card>
          );
        })}
      </main>
      <Footer />
    </motion.div>
  );
};
export default Results_detail;
