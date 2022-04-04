import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import axios from "axios";

interface ProductProps {
  product: any;
  pids: string[];
}

export default function Product({ product, pids }: ProductProps) {
  const [position, setPosition] = useState(pids.indexOf(product.id));
  let src = product.image.img.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");

  const minus = () => pids[position - 1];
  const plus = () => pids[position + 1];

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
      </Head>

      <Link href={`/${minus()}`}>
        <button disabled={position < 1}>prev</button>
      </Link>
      <img src={src} />
      <Link href={`/${plus()}`}>
        <button disabled={position > pids.length - 2}>next</button>
      </Link>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await axios.get(
    `https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryById?id=${context.params?.id}`
  );

  const pids = await axios.get(
    "https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds"
  );

  return {
    props: {
      product: res.data,
      pids: pids.data,
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
    fallback: false,
  };
};
