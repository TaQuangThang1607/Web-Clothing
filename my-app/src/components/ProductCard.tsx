import type { Product } from "../types/Product";

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="card h-100 shadow-sm">
            <img src={product.imageUrl} className="card-img-top" alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.description.substring(0, 100)}...</p>
                <p className="card-text fw-bold">${product.price}</p>
                <p className="card-text">
                    <small>Size: {product.size} | Color: {product.color}</small>
                </p>
            </div>
        </div>
    );
};