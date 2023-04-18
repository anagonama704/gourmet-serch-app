import next from "next/types";
import { Card } from "@mui/material";
import style from "@/styles/Header.module.css";
const Header = () => {
  return (
    <Card component="header" className={style.header}>
      <a href="#" className={style.a}>
        <h1 className={style.h1}>食住る</h1>
      </a>
    </Card>
  );
};
export default Header;
