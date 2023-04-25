import next, { GetServerSideProps } from "next/types";
import Header from "./component/Header";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import React, {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useRef,
  useState,
} from "react";
import PlaceIcon from "@mui/icons-material/Place";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import ArrowBackIosNewOutlined from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "@/styles/Results.module.css";
import { useRouter } from "next/router";
import Footer from "./component/Footer";
import { motion } from "framer-motion";
import { BorderColor } from "@mui/icons-material";

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
  results_returned: string;
};
type dres = {
  results: shops;
};
type dt = {
  data: dres;
};
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

const Results = ({ data }: dt) => {
  const router = useRouter();
  if (typeof data == undefined) {
    alert("ok");
    router.back();
  } else {
  }
  const [res, setRes] = useState<resType[]>([]);
  const [detailData, setDetailData] = useState<resType[]>([]);
  const [resCt, setResCt] = useState<string>();
  const [shopName, setShopName] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [budgets, setBudgets] = useState<string>("");
  const psp = () => {
    console.log(data);
    setRes(data.results.shop);
    console.log(res[0]);
  };

  useEffect(() => {
    const rrr = data.results.shop;
    const cou = data.results.results_returned;
    setResCt(cou);
    setRes(rrr);
    getServerSideProps;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const detail = (e: React.MouseEvent<HTMLDivElement>) => {
    const detailData: string = data.results.shop[Number(e.currentTarget.id)].id;
    router.push(
      {
        pathname: "/results_detail",
        query: { shopId: detailData },
      },
      "/results_detail"
    );
  };
  const serchs = () => {
    const fullCou = data.results.results_returned;
    const full = data.results.shop;
    const ser = data.results.shop.filter(function (ress, index) {
      if (shopName !== "" && ress.name.includes(shopName)) return true;
      if (genre !== "" && ress.genre.name.includes(genre)) return true;
    });
    const serCount = String(ser.length);
    if (ser.length == 0) {
      setResCt(fullCou);
      setRes(full);
    } else {
      setResCt(serCount);
      setRes(ser);
    }
  };
  return (
    <motion.div
      variants={{
        offscreen: {
          y: 100,
          opacity: 0,
        },
        onscreen: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        },
      }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0 }}
      className={styles.results}
    >
      <Header />
      <div className="res">
        <main className={styles.main}>
          <Card
            component="div"
            className={styles.serch}
            style={{ backgroundColor: "#fff" }}
          >
            <div className={styles.inputarea}>
              <Typography style={{ display: "flex", alignItems: "center" }}>
                <p
                  style={{
                    fontSize: "25px",
                    fontWeight: "800",
                    padding: "0 5px 0 0",
                  }}
                >
                  {resCt}
                </p>
                <p>件見つかりました</p>
              </Typography>
              <br />
              <label
                htmlFor="shopname"
                style={{ display: "flex", alignItems: "center" }}
              >
                <StorefrontIcon
                  style={{ color: "red", padding: "0 5px 0 0 " }}
                />
                店舗名称
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  margin: "10px 0 20px 0",
                }}
                name="shopname"
                placeholder="店舗名称"
                onChange={(e) => {
                  setShopName(e.target.value);
                }}
              />
              <label
                htmlFor="shopname"
                style={{ display: "flex", alignItems: "center" }}
              >
                <RestaurantIcon
                  style={{ color: "red", padding: "0 5px 0 0 " }}
                />
                ジャンル名称
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  margin: "10px 0 20px 0",
                }}
                name="shopname"
                placeholder="ジャンル名称"
                onChange={(e) => {
                  setGenre(e.target.value);
                }}
              />
              <label
                htmlFor="budget"
                style={{ display: "flex", alignItems: "center" }}
              >
                <CurrencyYenIcon style={{ color: "red" }} />
                予算
              </label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                style={{
                  borderRadius: "5px",
                  margin: "10px 0 0 0",
                  width: "100%",
                  height: "43px",
                  fontWeight: "100",
                }}
                name="budget"
                onChange={(e) => {
                  setBudgets(String(e.target.value));
                }}
                defaultValue="none"
              >
                <MenuItem value="none" style={{ fontWeight: "100" }}>
                  選択しない
                </MenuItem>
                <MenuItem value={1000} style={{ fontWeight: "100" }}>
                  〜1000円
                </MenuItem>
                <MenuItem value={2000} style={{ fontWeight: "100" }}>
                  〜2000円
                </MenuItem>
                <MenuItem value={3000} style={{ fontWeight: "100" }}>
                  〜3000円
                </MenuItem>
                <MenuItem value={4000} style={{ fontWeight: "100" }}>
                  〜4000円
                </MenuItem>
                <MenuItem value={5000} style={{ fontWeight: "100" }}>
                  〜5000円
                </MenuItem>
                <MenuItem value={6000} style={{ fontWeight: "100" }}>
                  〜6000円
                </MenuItem>
                <MenuItem value={7000} style={{ fontWeight: "100" }}>
                  〜7000円
                </MenuItem>
                <MenuItem value={8000} style={{ fontWeight: "100" }}>
                  〜8000円
                </MenuItem>
                <MenuItem value={9000} style={{ fontWeight: "100" }}>
                  〜9000円
                </MenuItem>
                <MenuItem value={10000} style={{ fontWeight: "100" }}>
                  10000円以上
                </MenuItem>
              </Select>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "red",
                  width: "100%",
                  height: "50px",
                  margin: "50px 0 0 0",
                }}
                onClick={serchs}
              >
                この条件で検索
                <ArrowForwardIosIcon />
              </Button>
              <Button
                variant="contained"
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "50px",
                  margin: "50px auto 0 auto",
                  padding: "10px 0",
                }}
                onClick={() => {
                  router.push(
                    {
                      pathname: "/",
                    },
                    "/"
                  );
                }}
              >
                <ArrowBackIosNewOutlined />
                現在地検索へ戻る
              </Button>
            </div>
          </Card>
          <Box component="div" className={styles.resDez}>
            {res
              .map((ress, index) => {
                return (
                  <Card
                    component={motion.div}
                    id={index + ""}
                    key={index}
                    style={{
                      width: "30%",
                      height: "420px",
                      margin: "50px 0 0 0",
                    }}
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
                          duration: 0.3,
                        },
                      },
                    }}
                    whileHover={{
                      y: 0,
                      scale: 1.1,
                      transition: { duration: 0.3 },
                    }}
                    initial="offscreen" // 初期表示はoffscreen
                    whileInView="onscreen" // 画面内に入ったらonscreen
                    viewport={{ once: false, amount: 0 }}
                    className={styles.rescard}
                    onClick={detail}
                  >
                    <CardHeader
                      avatar={
                        <img src={ress.logo_image + ""} height={30} alt="ok" />
                      }
                      title={ress.name}
                      titleTypographyProps={{
                        fontSize: "14px",
                      }}
                      style={{ height: "30px" }}
                      // subheader={ress.access}
                    />
                    <CardMedia
                      component="img"
                      width="auto"
                      height="200px"
                      image={ress.photo.pc.l}
                    />
                    <CardContent>
                      <div style={{ display: "flex", padding: "0 0 10px 0" }}>
                        <Typography
                          style={{
                            fontSize: "13px",
                            fontWeight: "700",
                          }}
                        >
                          定休日：
                        </Typography>
                        <Typography style={{ fontSize: "13px" }}>
                          {ress.close}
                        </Typography>
                      </div>
                      <div style={{ display: "flex" }}>
                        <PlaceIcon style={{ color: "red" }} />
                        <Typography style={{ fontSize: "13px" }}>
                          {ress.access}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
              .filter((ress) => ress)}
            <Footer />
          </Box>
        </main>
      </div>
    </motion.div>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  let lat: string;
  let lang: string;
  let range: string;

  // Perform localStorage action
  if (typeof context.query.lat == "undefined") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  } else {
    lat = String(context.query.lat);
    lang = String(context.query.lang);
    range = String(context.query.range);
  }

  // console.log(context.query.lat);
  // const pp = () => {
  //   navigator.geolocation.getCurrentPosition(suc, err);
  // };
  // const suc = (geos: geo) => {
  //   const lat: string = String(geos.coords.latitude);
  //   const lang: string = String(geos.coords.longitude);
  //   console.log("succ");
  // };
  // const err = () => {
  //   console.log("err");
  // };
  // pp;
  // if (!context.query) {
  //   lat = 33;
  //   lang = 23;
  // } else {
  //   lat = context.query.lat;
  //   lang = context.query.lang;
  // }
  const defaultEndpoint: string = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.API_KEY}&format=json&count=100${lat}${lang}${range}`;
  console.log(defaultEndpoint);
  const res: Response = await fetch(defaultEndpoint);
  const data: dt = (await res.json()) ?? "値なし";

  return {
    props: {
      data,
    },
  };
};
export default Results;
