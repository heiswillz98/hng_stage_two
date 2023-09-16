import { FC, PropsWithChildren } from "react";
import MainProps from "./main.props";
// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";

const Main: FC<PropsWithChildren<MainProps>> = ({ children, meta }) => {
  return (
    <>
      {meta}
      {/* <Header /> */}
      <main className="max-w-[2000px] mx-auto bg-[#F6F6F6]">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Main;
