'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { CartItem } from '../types/cart/cart';
import { Product } from '../types/product';
import { useUser } from './UserContext';
import { 
  getCartApi, 
  addToCartApi as apiAddToCart, 
  removeFromCartApi as apiRemoveFromCart, 
  updateCartQuantityApi as apiUpdateQuantity, 
  clearCartApi as apiClearCart,
  CartDetail 
} from '../services/client/CartService';
// CartContextType.tsx
const getInitialCart = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalItems: number;
  loading: boolean;
  syncCartFromServer: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  // Convert CartDetail to CartItem
  const convertToCartItem = (dto: CartDetail): CartItem => ({
    product: {
      id: dto.productId,
      name: dto.productName,
      price: dto.price,
      imageUrl: dto.productImageUrl || '',
      description: '',
      color: '',
      quantity: 0, 
      size: 0,
      sold: 0,
      brand: ''
    },
    quantity: dto.quantity
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (user) {
      syncCartFromServer();
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const syncCartFromServer = async () => {
  if (!user) return;

  try {
    setLoading(true);
    const serverCart = await getCartApi();
    console.log('Server cart received:', serverCart); // Ghi log để kiểm tra
    if (!Array.isArray(serverCart)) {
      console.error('Expected array, got:', serverCart);
      throw new Error('Invalid cart data from server');
    }
    const convertedCart = serverCart.map(convertToCartItem);
    setCart(convertedCart);
  } catch (error) {
    console.error('Error syncing cart from server:', error);
    toast.error('Không thể đồng bộ giỏ hàng từ server');
  } finally {
    setLoading(false);
  }
};


  const addToCart = async (product: Product) => {
    try {
      setLoading(true);
      
      if (user) {
        // Nếu user đã login, gọi API
        const serverCart = await apiAddToCart(product.id, 1);
        const convertedCart = serverCart.map(convertToCartItem);
        setCart(convertedCart);
      } else {
        // Nếu chưa login, chỉ lưu localStorage
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.product.id === product.id);
          if (existingItem) {
            return prevCart.map((item) =>
              item.product.id === product.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            );
          }
          return [...prevCart, { product, quantity: 1 }];
        });
      }

      toast.success(`${product.name} đã được thêm vào giỏ hàng!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Không thể thêm sản phẩm vào giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      setLoading(true);

      if (user) {
        await apiRemoveFromCart(productId);
        await syncCartFromServer();

        setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
      } else {
        // Chỉ cập nhật localStorage
        setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
      }

      toast.info('Sản phẩm đã được xóa khỏi giỏ hàng.');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Không thể xóa sản phẩm khỏi giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }

    try {
      setLoading(true);

      if (user) {
        await apiUpdateQuantity(productId, quantity);

        // setCart((prevCart) =>
        //   prevCart.map((item) =>
        //     item.product.id === productId ? { ...item, quantity } : item
        //   )
        // );
        await syncCartFromServer();
      } else {
        // Chỉ cập nhật localStorage
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Không thể cập nhật số lượng');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);

      if (user) {
        // Gọi API để xóa toàn bộ
        await apiClearCart();
      }
      
      // Cập nhật local state
      setCart([]);
      toast.info('Giỏ hàng đã được xóa.');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Không thể xóa giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        totalItems,
        loading,
        syncCartFromServer
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart phải được sử dụng trong CartProvider');
  }
  return context;
};