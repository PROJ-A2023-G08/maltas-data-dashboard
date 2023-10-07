import "antd/dist/reset.css";
import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import themeAntd from "@/styles/themeAntd";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={themeAntd}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
