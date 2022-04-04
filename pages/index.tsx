import Link from "next/link";
import { GetStaticProps } from "next";
import axios from "axios";
import { Button } from "../components/Button";
import styles from "../styles/Home.module.css";

interface StoreProps {
  pids: string[];
}
export default function Home({ pids }: StoreProps) {
  console.log(pids);
  return (
    <div className={styles.container}>
      <Button pos={pids[0]} title="Show Stores" />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pids = await axios.get(
    "https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds"
  );

  return {
    props: {
      pids: pids.data.sort(),
    },
  };
};
