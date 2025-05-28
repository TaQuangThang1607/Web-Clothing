import Carousel from "./components/Carousel";
import Featurs from "./components/Featurs";
import FooterPage from "./components/Footer";
import Header from "./components/Header";
import ProductsByIdsView from "./components/ProductsByIdsView";

export default function Home() {
  return (
    <>
    <Header />
        <Carousel />
        <div className="w-full">
            <Featurs />
        </div>

        <div className="w-full">
          <ProductsByIdsView />
        </div>
    <FooterPage />
    </>
  );
}
