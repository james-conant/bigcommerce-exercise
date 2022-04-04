import Head from "next/head";
import { Button } from "../components/Button";
import { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";
import styles from "../styles/Store.module.css";

type image = {
  height: string;
  img: string;
  title: string;
  url: string;
  width: string;
};

type url = {
  type: string;
  value: string;
  defaultText: string;
  customText: string;
  target: string;
  nofollow: string;
  locale: string;
  customValues: any[];
};

interface Store {
  description: string;
  id: string;
  title: string;
  image: image;
  url: url;
}

interface StoreProps {
  store: Store;
  pids: string[];
}

export default function Store({ store, pids }: StoreProps) {
  const position = pids.indexOf(store.id);
  const src = store.image.img
    .match(/(?:"[^"]*"|^[^"]*$)/)![0]
    .replace(/"/g, "");

  const minus = pids[position - 1];
  const plus = pids[position + 1];

  return (
    <>
      <Head>
        <meta name="description" content={store.description} />
        <title>{store.title}</title>
      </Head>
      <div className={styles.container}>
        {position + 1}/{pids.length}
      </div>
      <div className={styles.store}>
        <Button pos={minus} exp={position < 1} title="prev" />
        <img src={src} />
        <Button pos={plus} exp={position > pids.length - 2} title="next" />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const store = await axios.get(
    `https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryById?id=${context.params?.id}`
  );

  const pids = await axios.get(
    "https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds"
  );

  return {
    props: {
      store: store.data,
      pids: pids.data.sort(),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pids = await axios.get(
    "https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds"
  );
  const paths = pids.data.sort().map((id: string) => ({ params: { id } }));

  return {
    paths,
    fallback: true,
  };
};
