import Layout from "@maltas-dashboard/frontend/src/components/Layout";
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useAuth from "../../lib/util/useAuth";
import { ToastContainer } from 'react-toastify';
import { MeasurementProvider } from "@maltas-dashboard/frontend/src/contexts/MeasurementProvider.context";
import React from "react";
export default function Home() {
  const { logout, isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <div />
  }
  return (
    <MeasurementProvider>
      <main>
        <Layout />
        <ToastContainer />
      </main>
    </MeasurementProvider>
  );
}


export const getStaticProps: GetStaticProps = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
    ])),
  },
})

