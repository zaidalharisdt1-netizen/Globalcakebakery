import { useState, useCallback } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  stock: 'available' | 'limited' | 'out';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface StoreState {
  cart: CartItem[];
  isCartOpen: boolean;
  isMenuOpen: boolean;
  cookieConsent: 'accepted' | 'declined' | null;
  searchQuery: string;
  activeCategory: string;
}

// Sample product data - Global Cake & Bakery catalog
export const products: Product[] = [
  // Breads
  { id: 1, name: 'Roti Tawar Premium', price: 28900, originalPrice: 31700, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop', category: 'Breads', rating: 4.8, description: 'Roti tawar premium dengan tekstur lembut dan rasa susu yang kaya', stock: 'available' },
  { id: 2, name: 'Singapore Kaya Toast', price: 17900, originalPrice: 19600, image: 'https://images.unsplash.com/photo-1585476866867-8160f914f2fb?w=400&h=400&fit=crop', category: 'Breads', rating: 4.7, description: 'Roti panggang dengan selai kaya tradisional Singapura', stock: 'available' },
  { id: 3, name: 'Multi Grain Smoked', price: 18300, originalPrice: 20100, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=400&fit=crop', category: 'Breads', rating: 4.6, description: 'Roti multi grain dengan smoked flavor', stock: 'available' },
  { id: 4, name: 'Roti Tawar Kering', price: 25900, originalPrice: 28400, image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400&h=400&fit=crop', category: 'Breads', rating: 4.5, description: 'Roti tawar kering untuk toast', stock: 'available' },
  { id: 5, name: 'Roti Lady Finger Beef', price: 18900, originalPrice: 20700, image: 'https://images.unsplash.com/photo-1601205741712-b261aff33a7d?w=400&h=400&fit=crop', category: 'Breads', rating: 4.9, description: 'Roti isi daging sapi cincang', stock: 'available' },
  { id: 6, name: 'Roti Mexican Coffee', price: 15200, originalPrice: 16700, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop', category: 'Breads', rating: 4.7, description: 'Roti dengan rasa kopi Meksiko', stock: 'available' },
  { id: 7, name: 'Roti Mocca Mesis', price: 12100, originalPrice: 13300, image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=400&fit=crop', category: 'Breads', rating: 4.6, description: 'Roti mocca dengan taburan mesis', stock: 'available' },
  { id: 8, name: 'Roti Bakso Sapi', price: 15500, originalPrice: 17000, image: 'https://images.unsplash.com/photo-1621236378699-8597fab6a5b1?w=400&h=400&fit=crop', category: 'Breads', rating: 4.8, description: 'Roti isi bakso sapi dengan saus spesial', stock: 'available' },
  { id: 9, name: 'Roti Coklat', price: 11400, originalPrice: 12500, image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&h=400&fit=crop', category: 'Breads', rating: 4.9, description: 'Roti isi coklat lumer', stock: 'available' },

  // Traditional Snacks
  { id: 10, name: 'Lemper Ayam', price: 8500, originalPrice: 9500, image: 'https://images.unsplash.com/photo-1603097439248-4a31678c4e63?w=400&h=400&fit=crop', category: 'Traditional Snacks', rating: 4.7, description: 'Lemper ketan isi ayam suwir', stock: 'available' },
  { id: 11, name: 'Kue Lumpur', price: 7200, originalPrice: 8000, image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=400&fit=crop', category: 'Traditional Snacks', rating: 4.5, description: 'Kue lumpur tradisional dengan topping kismis', stock: 'available' },
  { id: 12, name: 'Onde-Onde', price: 6500, originalPrice: 7200, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop', category: 'Traditional Snacks', rating: 4.6, description: 'Onde-onde isi kacang hijau dengan wijen', stock: 'available' },
  { id: 13, name: 'Risoles Mayo', price: 9800, originalPrice: 10800, image: 'https://images.unsplash.com/photo-1625938145744-e380515399ca?w=400&h=400&fit=crop', category: 'Traditional Snacks', rating: 4.8, description: 'Risoles isi mayonnaise, sosis, dan sayuran', stock: 'available' },

  // Chiffon & Roll Cakes
  { id: 14, name: 'Chiffon Pandan', price: 45000, originalPrice: 49500, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop', category: 'Chiffon & Roll Cakes', rating: 4.8, description: 'Chiffon cake rasa pandan yang lembut dan fluffy', stock: 'available' },
  { id: 15, name: 'Bolu Gulung Coklat', price: 52000, originalPrice: 57000, image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=400&fit=crop', category: 'Chiffon & Roll Cakes', rating: 4.9, description: 'Bolu gulung dengan krim coklat', stock: 'available' },
  { id: 16, name: 'Chiffon Vanila', price: 42000, originalPrice: 46000, image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=400&fit=crop', category: 'Chiffon & Roll Cakes', rating: 4.7, description: 'Chiffon cake vanila klasik', stock: 'available' },
  { id: 17, name: 'Bolu Gulung Stroberi', price: 54000, originalPrice: 59000, image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=400&fit=crop', category: 'Chiffon & Roll Cakes', rating: 4.6, description: 'Bolu gulung dengan selai stroberi segar', stock: 'available' },

  // Donuts
  { id: 18, name: 'Donut Coklat Glaze', price: 12500, originalPrice: 13800, image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop', category: 'Donuts', rating: 4.8, description: 'Donut dengan glazur coklat premium', stock: 'available' },
  { id: 19, name: 'Donut Strawberry', price: 13000, originalPrice: 14300, image: 'https://images.unsplash.com/photo-1612203985729-70726954388c?w=400&h=400&fit=crop', category: 'Donuts', rating: 4.7, description: 'Donut dengan topping strawberry glaze', stock: 'available' },
  { id: 20, name: 'Donut Tiramisu', price: 14500, originalPrice: 15900, image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&h=400&fit=crop', category: 'Donuts', rating: 4.9, description: 'Donut rasa tiramisu dengan taburan kakao', stock: 'available' },
  { id: 21, name: 'Donut Matcha', price: 13800, originalPrice: 15200, image: 'https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?w=400&h=400&fit=crop', category: 'Donuts', rating: 4.6, description: 'Donut dengan glaze matcha Jepang', stock: 'available' },

  // Cakes
  { id: 22, name: 'Black Forest', price: 185000, originalPrice: 210000, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop', category: 'Cakes', rating: 4.9, description: 'Kue Black Forest klasik dengan krim coklat dan ceri', stock: 'available' },
  { id: 23, name: 'Cheese Cake', price: 165000, originalPrice: 185000, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=400&fit=crop', category: 'Cakes', rating: 4.8, description: 'Cheese cake creamy dengan topping buah', stock: 'available' },
  { id: 24, name: 'Red Velvet', price: 175000, originalPrice: 195000, image: 'https://images.unsplash.com/photo-1586788680434-30d324de94eb?w=400&h=400&fit=crop', category: 'Cakes', rating: 4.7, description: 'Red velvet dengan cream cheese frosting', stock: 'available' },

  // Cookies
  { id: 25, name: 'Almond Cookies', price: 35000, originalPrice: 38500, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop', category: 'Cookies', rating: 4.7, description: 'Kue kering almond yang renyah', stock: 'available' },
  { id: 26, name: 'Choco Chips Cookies', price: 32000, originalPrice: 35000, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop', category: 'Cookies', rating: 4.8, description: 'Cookies dengan choco chips melimpah', stock: 'available' },
  { id: 27, name: 'Butter Cookies', price: 28000, originalPrice: 31000, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop', category: 'Cookies', rating: 4.6, description: 'Kue kering mentega klasik', stock: 'available' },

  // Pastry
  { id: 28, name: 'Croissant Butter', price: 22000, originalPrice: 24200, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop', category: 'Pastry and Danish', rating: 4.9, description: 'Croissant butter autentik Prancis', stock: 'available' },
  { id: 29, name: 'Danish Apple', price: 25000, originalPrice: 27500, image: 'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=400&h=400&fit=crop', category: 'Pastry and Danish', rating: 4.7, description: 'Danish pastry dengan isi apel dan karamel', stock: 'available' },
  { id: 30, name: 'Pain au Chocolat', price: 24000, originalPrice: 26500, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop', category: 'Pastry and Danish', rating: 4.8, description: 'Pastry dengan batang coklat di dalamnya', stock: 'available' },
];

export const categories = [
  { id: 'breads', name: 'Breads', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop' },
  { id: 'traditional', name: 'Traditional Snacks', image: 'https://images.unsplash.com/photo-1603097439248-4a31678c4e63?w=400&h=400&fit=crop' },
  { id: 'chiffon', name: 'Chiffon & Roll Cakes', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=400&fit=crop' },
  { id: 'donuts', name: 'Donuts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop' },
  { id: 'pastry', name: 'Pastry and Danish', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop' },
  { id: 'pudding', name: 'Pudding', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop' },
  { id: 'cakes', name: 'Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop' },
  { id: 'lapis', name: 'Lapis', image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=400&fit=crop' },
  { id: 'cookies', name: 'Cookies', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop' },
  { id: 'snackbox', name: 'Snack Box', image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&h=400&fit=crop' },
];

export const moments = [
  { id: 'coffee', name: 'Coffee Break', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop' },
  { id: 'gathering', name: 'Gathering', image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300&fit=crop' },
  { id: 'snacks', name: 'Snacks', image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=400&h=300&fit=crop' },
  { id: 'dessert', name: 'Dessert', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop' },
  { id: 'birthday', name: 'Birthday', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop' },
  { id: 'breakfast', name: 'Breakfast', image: 'https://images.unsplash.com/photo-1533089862017-5614ec87f5e3?w=400&h=300&fit=crop' },
];

export const banners = [
  {
    id: 1,
    title: 'Soft Cheesecake',
    subtitle: 'Diskon 20%',
    description: 'Light, soft and fluffy. Perfect combination of sponge cake and cheesecake',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&h=400&fit=crop',
    color: '#E84C3D',
    tag: 'NEW PRODUCT'
  },
  {
    id: 2,
    title: 'Potongan Ongkir',
    subtitle: 'Gratis Ongkir',
    description: 'Dapatkan voucher potongan ongkir Rp15.000 untuk setiap pembelian di atas Rp100.000',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&h=400&fit=crop',
    color: '#2C5F8A',
    tag: 'PROMO'
  },
  {
    id: 3,
    title: 'Kue Ulang Tahun',
    subtitle: 'Diskon 15%',
    description: 'Pesan kue ulang tahun custom dan dapatkan diskon spesial',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=400&fit=crop',
    color: '#D4A853',
    tag: 'SPECIAL'
  }
];

// Custom hook for store state
export function useStore() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'declined' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const openProductModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  }, []);

  return {
    cart,
    isCartOpen,
    setIsCartOpen,
    isMenuOpen,
    setIsMenuOpen,
    cookieConsent,
    setCookieConsent,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    isSearchOpen,
    setIsSearchOpen,
    selectedProduct,
    isProductModalOpen,
    setIsProductModalOpen,
    openProductModal,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    installPrompt,
    setInstallPrompt,
    showInstallBanner,
    setShowInstallBanner,
  };
}
