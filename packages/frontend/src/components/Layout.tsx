import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="h-screen flex flex-row justify-start">
      <Sidebar />
      <div className="bg-white flex-1 p-4 text-white"></div>
    </div>
  );
};
export default Layout;
