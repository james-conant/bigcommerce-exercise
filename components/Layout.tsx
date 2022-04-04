import styles from "../styles/Layout.module.css";

export default function Layout({ children }: any) {
  return (
    <>
      <main className={styles.main}>{children}</main>
    </>
  );
}
