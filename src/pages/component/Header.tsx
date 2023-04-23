import next from "next/types";
import { Card } from "@mui/material";
import style from "@/styles/Header.module.css";
import Link from "next/link";
const Header = () => {
  return (
    <Card component="header" className={style.header}>
      <Link href="/" className={style.a}>
        <h1 className={style.h1}>Fit&Eat</h1>
      </Link>
    </Card>
  );
};
export default Header;
