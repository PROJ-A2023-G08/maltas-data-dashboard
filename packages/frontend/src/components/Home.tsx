import { useTranslation } from "next-i18next";

const Home = () => {
  const { t } = useTranslation("common");

  return <h1>{t("sidebar.Home")}</h1>;
};

export default Home;
