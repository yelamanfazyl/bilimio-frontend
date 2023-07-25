import Navbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#1A1A1A] h-screen">
      <Navbar />
      <div className="flex flex-col py-8 w-[80%] m-auto h-[90%]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
