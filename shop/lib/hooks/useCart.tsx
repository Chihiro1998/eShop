import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface Product {
  _id: string;
  title: string;
  description: string;
  media: string[];
  price: number;
  category: string;
  sizes: string[];
}

interface CartItem {
  item: Product;
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (data: CartItem) => void;
  incrementItem: (productId: string, amount?: number) => void;
  decrementItem: (productId: string, amount?: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity } = data;
        const currentItems = get().cartItems;
        const existingItem = currentItems.find(
          (cartItem) => cartItem.item._id === item._id
        );
        if (existingItem) {
          set({
            cartItems: currentItems.map((cartItem) =>
              cartItem.item._id === item._id
                ? { ...cartItem, quantity: cartItem.quantity + quantity }
                : cartItem
            ),
          });
          return toast.success("Item quantity updated in cart");
        }
        set({ cartItems: [...currentItems, { item, quantity }] });
        toast.success("Item added to cart");
      },
      incrementItem: (productId: string, amount: number = 1) => {
        const currentItems = get().cartItems;
        set({
          cartItems: currentItems.map((cartItem) =>
            cartItem.item._id === productId
              ? { ...cartItem, quantity: cartItem.quantity + amount }
              : cartItem
          ),
        });
        toast.success("Item quantity incremented");
      },
      decrementItem: (productId: string, amount: number = 1) => {
        const currentItems = get().cartItems;
        set({
          cartItems: currentItems.map((cartItem) =>
            cartItem.item._id === productId
              ? {
                  ...cartItem,
                  quantity: Math.max(cartItem.quantity - amount, 1),
                }
              : cartItem
          ),
        });
        toast.success("Item quantity decremented");
      },
      removeItem: (productId: string) => {
        const currentItems = get().cartItems;
        set({
          cartItems: currentItems.filter(
            (cartItem) => cartItem.item._id !== productId
          ),
        });
        toast.success("Item removed from cart");
      },
      clearCart: () => {
        set({ cartItems: [] });
        toast.success("Cart cleared");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
