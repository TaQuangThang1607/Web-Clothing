import Image from "next/image";
import Carousel from "./components/Carousel";
import Featurs from "./components/Featurs";
import BestProduct from "./components/BestProduct";
import Header from "./components/Header";
import FooterPage from "./components/Footer";

export default function Home() {
  return (
    <>
    <Header />
        <Carousel />
        <div className="w-full">
            <Featurs />
        </div>

        <div className="w-full">
          <BestProduct />
        </div>
    <FooterPage />
    </>
  );
}
