import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
    <Head>
        <title>Leet Code</title>
        <meta name='description' content='contains leetcode problems and solutions'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <link rel='icon' href='./favicon.png'/>
    </Head>
    <Component {...pageProps} />
    </RecoilRoot>
  );
}
export default MyApp;
