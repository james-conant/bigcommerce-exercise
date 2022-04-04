import Link from "next/link";
import { GetStaticProps } from "next";
import axios from "axios";

interface ProductProps {
  pids: string[];
}
export default function Home({ pids }: ProductProps) {
  console.log(pids);
  return (
    <Link href={`/${pids[0]}`}>
      <a>Show Stores</a>
    </Link>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const pids = await axios.get(
    "https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds"
  );

  return {
    props: {
      pids: pids.data,
    },
  };
};
