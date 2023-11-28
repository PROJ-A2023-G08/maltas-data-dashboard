import "@/styles/globals.css";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import theme from "@/styles/theme";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Head from "next/head";
import { appWithTranslation } from 'next-i18next';
import useAuth from "../../lib/util/useAuth";
import { AuthResponse } from "../../lib/api/api";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
function App({ Component, pageProps }: AppProps) {
  const auth = useAuth();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Maltas Dashboard</title>
        </Head>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default appWithTranslation(App);
