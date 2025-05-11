import type { Product, ProductDTO } from "../types/Product";
import axios from 'axios';

const API_URL_ALL_PRODUCT = 'http://localhost:8080/admin/products';
const API_URL_CREATE_PRODUCT = 'http://localhost:8080/admin/products/create';


export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get(API_URL_ALL_PRODUCT);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const createProduct = async (productDTO: ProductDTO): Promise<Product> => {
    try {
        const response = await axios.post(API_URL_CREATE_PRODUCT, productDTO);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};