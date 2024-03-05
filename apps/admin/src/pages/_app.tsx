import "../styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default MyApp;
