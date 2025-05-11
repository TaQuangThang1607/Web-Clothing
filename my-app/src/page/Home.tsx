import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { getAllProducts } from "../services/productService";
import { ProductCard } from "../components/ProductCard";

export const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container py-5">
            <header className="text-center mb-5">
                <h1 className="display-4">Welcome to Shoes Store</h1>
                <p className="lead">Discover our latest collection of premium shoes</p>
            </header>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {products.map((product) => (
                        <div key={product.id} className="col">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
