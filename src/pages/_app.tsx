import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { RecoilRoot } from "recoil";
import { ToastContainer, toast } from 'react-toastify';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
    <Head>
        <title>Code With Me</title>
        <meta name='description' content='contains leetcode problems and solutions'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <link rel='icon' href='/favicon.png'/>
    </Head>
    <ToastContainer />
    <Component {...pageProps} />
    </RecoilRoot>
    
  );
}
export default MyApp;
