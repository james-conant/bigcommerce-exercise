import styles from "../styles/Button.module.css";
import Link from "next/link";

interface ButtonProp {
  pos: string;
  exp?: boolean;
  title: string;
}

export function Button({ pos, exp, title }: ButtonProp) {
  return (
    <Link href={`/${pos}`}>
      <button className={styles.button} disabled={exp}>{title}</button>
    </Link>
  );
}
