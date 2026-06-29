import { useStore } from '../hooks/useStore';
import Header from '../sections/Header';
import HeroBanner from '../sections/HeroBanner';
import ShopByCategories from '../sections/ShopByCategories';
import FeaturedMenu from '../sections/FeaturedMenu';
import ChooseYourMoment from '../sections/ChooseYourMoment';
import Footer from '../sections/Footer';
import CartDrawer from '../sections/CartDrawer';
import MenuDrawer from '../sections/MenuDrawer';
import ProductModal from '../sections/ProductModal';
import CookieConsent from '../sections/CookieConsent';
import InstallBanner from '../sections/InstallBanner';
import FloatingCartButton from '../sections/FloatingCartButton';
import { useState } from 'react';

export default function Home() {
  const store = useStore();
  const [showCookieSettings, setShowCookieSettings] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header
        cartCount={store.cartCount}
        onMenuOpen={() => store.setIsMenuOpen(true)}
        onCartOpen={() => store.setIsCartOpen(true)}
        onSearchOpen={() => store.setIsSearchOpen(true)}
        searchQuery={store.searchQuery}
        onSearchChange={store.setSearchQuery}
        isSearchOpen={store.isSearchOpen}
        onSearchClose={() => {
          store.setIsSearchOpen(false);
          store.setSearchQuery('');
        }}
      />

      {/* Main Content */}
      <main>
        {/* Hero Banner Carousel */}
        <HeroBanner />

        {/* Shop By Categories */}
        <ShopByCategories onCategorySelect={(cat) => {
          store.setActiveCategory(cat);
          window.scrollTo({ top: document.getElementById('featured-menu')?.offsetTop || 0, behavior: 'smooth' });
        }} />

        {/* Divider */}
        <div className="h-2 bg-[#FFF8F0]" />

        {/* Featured Menu */}
        <div id="featured-menu">
          <FeaturedMenu
            onAddToCart={store.addToCart}
            onProductClick={store.openProductModal}
            activeCategory={store.activeCategory}
            onCategoryChange={store.setActiveCategory}
            searchQuery={store.searchQuery}
          />
        </div>

        {/* Divider */}
        <div className="h-2 bg-[#FFF8F0]" />

        {/* Choose Your Moment */}
        <div id="moments">
          <ChooseYourMoment />
        </div>

        {/* Footer */}
        <Footer />
      </main>

      {/* Floating Cart Button */}
      <FloatingCartButton
        cartCount={store.cartCount}
        onClick={() => store.setIsCartOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={store.isCartOpen}
        onClose={() => store.setIsCartOpen(false)}
        cart={store.cart}
        onUpdateQuantity={store.updateQuantity}
        onRemove={store.removeFromCart}
        total={store.cartTotal}
      />

      {/* Menu Drawer */}
      <MenuDrawer
        isOpen={store.isMenuOpen}
        onClose={() => store.setIsMenuOpen(false)}
        onCookieSettings={() => setShowCookieSettings(true)}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={store.selectedProduct}
        isOpen={store.isProductModalOpen}
        onClose={() => store.setIsProductModalOpen(false)}
        onAddToCart={store.addToCart}
      />

      {/* Cookie Consent - Auto show */}
      <CookieConsent
        consent={store.cookieConsent}
        onAccept={() => store.setCookieConsent('accepted')}
        onDecline={() => store.setCookieConsent('declined')}
      />

      {/* Cookie Consent - Settings */}
      <CookieConsent
        consent={store.cookieConsent}
        onAccept={() => store.setCookieConsent('accepted')}
        onDecline={() => store.setCookieConsent('declined')}
        forceShow={showCookieSettings}
        onClose={() => setShowCookieSettings(false)}
      />

      {/* Install Banner */}
      <InstallBanner onInstall={(prompt) => store.setInstallPrompt(prompt)} />
    </div>
  );
}
