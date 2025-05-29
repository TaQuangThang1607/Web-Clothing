import { ProductDTO } from "@/app/types/dto/ProductDTO";
const API_URL = 'http://localhost:8080/api/products';
// app/services/client/viewpageProduct.ts
export async function getAllPageProducts(): Promise<ProductDTO[]> {
    try {
        console.log('Fetching from:', API_URL); // Log URL
        const res = await fetch(API_URL);
        
        console.log('Response status:', res.status);
        const textData = await res.text();
        console.log('Raw response text:', textData); // Log raw response
        
        try {
            const data = JSON.parse(textData);
            console.log('Parsed JSON data:', data); // Log parsed data
            
            // Thử tất cả các trường hợp có thể
            if (Array.isArray(data)) {
                return data as ProductDTO[];
            } else if (data?.content && Array.isArray(data.content)) {
                return data.content as ProductDTO[];
            } else if (data?.data && Array.isArray(data.data)) {
                return data.data as ProductDTO[];
            } else if (data?.items && Array.isArray(data.items)) {
                return data.items as ProductDTO[];
            } else if (data?.products && Array.isArray(data.products)) {
                return data.products as ProductDTO[];
            }
            
            console.warn('Unknown data structure:', data);
            return []; // Trả về mảng rỗng thay vì throw error
            
        } catch (jsonError) {
            console.error('JSON parse error:', jsonError);
            return [];
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return []; // Trả về mảng rỗng thay vì throw error
    }
}