import Image from "next/image";
import Carousel from "./components/Carousel";
import Featurs from "./components/Featurs";
import BestProduct from "./components/BestProduct";

export default function Home() {
  return (
    <>
        <Carousel />
        <div className="w-full">
            <Featurs />
        </div>

        <div className="w-full">
          <BestProduct />
        </div>
    
    </>
  );
}
