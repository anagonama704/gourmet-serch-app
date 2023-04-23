import next from "next/types";
import styles from "@/styles/Footer.module.css";
const Footer = () => {
  const copy: string = "2023 ©︎ watanabe kei";
  return (
    <footer className={styles.footer}>
      <small className={styles.small}>{copy}</small>
    </footer>
  );
};
export default Footer;
