
import { PageResponse } from "../../types/dto/apiResponse";
import { Product } from "../../types/product";
import { getAllProductsInClient } from "./clientService";

export async function getAllPageProducts(
  page: number = 0,
  size: number = 9,
  sort: string = 'name,asc',
  search: string = '',
  brand: string = '',
  minPrice?: number,
  maxPrice?: number
): Promise<PageResponse<Product>> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
    ...(search && { search }),
    ...(brand && { brand }),
    ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
    ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
  });

  return getAllProductsInClient(page, size, sort, queryParams.toString());
}

export async function getBrandsCount(
  search: string = '',
  minPrice?: number,
  maxPrice?: number
): Promise<Map<string, number>> {
  const queryParams = new URLSearchParams({
    ...(search && { search }),
    ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
    ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
  });

  try {
    const response = await fetch(`http://localhost:8080/api/products/brands-count?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return new Map(Object.entries(result));
  } catch (error) {
    console.error('Error fetching brands count:', error);
    throw error;
  }
}