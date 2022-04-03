import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";

const product = ({ product }: any) => {
  console.log(product.image.img);

  return (
    <Fragment>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
      </Head>

      <div dangerouslySetInnerHTML={{ __html: product.image.img }}></div>
    </Fragment>
  );
};

export const getStaticProps = async (context: any) => {
  const res = await axios.get(
    `https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryById?id=${context.params.id}`
  );

  return {
    props: {
      product: res.data,
    },
  };
};

export const getStaticPaths = async () => {
  const pids = await axios.get(
    "https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds"
  );
  const paths = pids.data.map((id: string) => ({ params: { id: id } }));

  return {
    paths,
    fallback: false,
  };
};

export default product;
