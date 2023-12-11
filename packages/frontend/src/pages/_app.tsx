import React from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import theme from "@/styles/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import { appWithTranslation } from 'next-i18next';
import useAuth from "../../lib/util/useAuth";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const auth = useAuth();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
       <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Maltas Dashboard</title>
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </LocalizationProvider>
  );
}

export default appWithTranslation(App);
