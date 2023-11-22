import Layout from "@/components/Layout";
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import useAuth from "../../lib/util/useAuth";
export default function Home() {
  const { logout, isLoggedIn} = useAuth();
  if(!isLoggedIn){
    return <div/>
  }
  return (
    <main>
      <Layout />
    </main>
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

