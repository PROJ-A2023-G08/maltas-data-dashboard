import dynamic from "next/dynamic";

const ResponsivePie = dynamic(
  () => import("@nivo/pie").then((m) => m.ResponsivePie),
  { ssr: false },
);

import Data1 from "../../public/data1.json";
const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <div style={{ height: "400px" }}>
        <ResponsivePie data={Data1} />
      </div>
    </>
  );
};

export default Home;
