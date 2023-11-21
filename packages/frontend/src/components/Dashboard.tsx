import { useTranslation } from "next-i18next";

const Dashboard = () => {
  const { t } = useTranslation("common");

  return <h1>{t("sidebar.Dashboard")}</h1>;
};

export default Dashboard;
