import PrimarySearchAppBar from "@/layouts/PrimarySearchAppBar";
import Layout from "@/components/Layout";
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
export default function Home() {
  return (
    <main >
      {/*<PrimarySearchAppBar />*/}
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

