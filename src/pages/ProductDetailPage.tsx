import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addToCart } from '../store/slices/cartSlice';
import { openLoginModal } from '../store/slices/uiSlice';
import { toast } from 'react-hot-toast';
import { calculateFinalPrice } from '../utils/pricingEngine';

import { FiShoppingBag } from 'react-icons/fi';
import { ImageGallery } from '../components/product-detail/ImageGallery';
import { PricingBlock } from '../components/product-detail/PricingBlock';
import { RatingsSummary } from '../components/product-detail/RatingsSummary';
import { SizeSelector } from '../components/product-detail/SizeSelector';
import { PackSelector } from '../components/product-detail/PackSelector';
import { VariantSelector } from '../components/product-detail/VariantSelector';
import { ProductDescription } from '../components/product-detail/ProductDescription';
import { ReviewsSection } from '../components/product-detail/ReviewsSection';
import { FAQSection } from '../components/product-detail/FAQSection';
import { RelatedProducts } from '../components/product-detail/RelatedProducts';
import { StickyBottomBar } from '../components/product-detail/StickyBottomBar';
import { FragranceSelector } from '../components/product-detail/FragranceSelector';
import { GiftCustomization, GiftOccasion } from '../components/product-detail/GiftCustomization';
import { ProductSpecifications } from '../components/product-detail/ProductSpecifications';
import { PincodeChecker } from '../components/product-detail/PincodeChecker';
import { api } from '../services/api';
import { ProductDetailSkeleton } from '../components/skeletons/ProductDetailSkeleton';

interface Product {
  _id: string;
  name: string;
  description: string;
  shortDescription?: string;
  images: string[];
  price: number;
  originalPrice?: number;
  stock: number;
  rating: number;
  totalReviews: number;
  category: { _id: string; name: string; slug: string };

  // Specs
  material?: string;
  finish?: string;
  capacity?: number;
  weight?: number;
  dimensions?: {
    height?: number;
    width?: number;
    length?: number;
    weight?: number;
  };
  specifications?: Array<{ key: string; value: string }>;

  // Universal Product Model
  variants?: Array<{
    _id: string;
    label: string;
    sku?: string;
    price: number;
    originalPrice?: number;
    stock: number;
    image?: string;
    isDefault?: boolean;
    packs?: Array<{
      _id: string;
      label: string;
      quantity: number;
      price: number;
      originalPrice?: number;
      isDefault?: boolean;
    }>;
  }>;
  sortOrder?: number;
  pdpLayout?: string[];

  styles?: Array<{
    _id: string;
    label: string;
    priceAdjustment: number;
    image?: string;
  }>;

  colors?: Array<{
    _id: string;
    label: string;
    hex: string;
    image?: string;
  }>;

  addOns?: Array<{
    _id: string;
    label: string;
    price: number;
    description?: string;
    required?: boolean;
  }>;

  // Legacy (Support fallback if needed)
  sizes?: Array<{ name: string; price: number }>;
  fragrances?: string[];
  packs?: Array<{
    label: string;
    quantity: number;
    pricingType: 'auto' | 'discount' | 'fixed';
    fixedPrice?: number;
    discountPercent?: number;
  }>;
  faqs?: Array<{ question: string; answer: string }>;
  allowMixedFragrance?: boolean;
  giftOptions?: {
    active: boolean;
    price: number;
    occasions: Array<{
      id: string;
      label: string;
      designs: Array<{ id: string; image: string }>;
    }>;
  };
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  // Product state
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Universal Selection State
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<{ label: string; hex: string; image?: string } | null>(null);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  // Legacy State (Keep for now or map to new)
  const [selectedSize, setSelectedSize] = useState<{ name: string; price: number } | null>(null);
  const [selectedFragrance, setSelectedFragrance] = useState<string>('');
  const [selectedFragrances, setSelectedFragrances] = useState<string[]>([]);
  const [giftCustomization, setGiftCustomization] = useState({
    occasion: '',
    designId: '',
    message: '',
    active: false,
    price: 49
  });

  // UI state
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Fetch product
  useEffect(() => {
    // Reset all selection state when navigating to a new product
    setSelectedVariantId(null);
    setSelectedPackId(null);
    setSelectedStyleId(null);
    setSelectedColor(null);
    setSelectedAddOnIds([]);
    setSelectedSize(null);
    setSelectedFragrance('');
    setSelectedFragrances([]);
    setGiftCustomization({
      occasion: '',
      designId: '',
      message: '',
      active: false,
      price: 49
    });
    setShowFullDescription(false);

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        const data = response.data;

        if (data.success) {
          const fetchedProduct = data.data.product;
          setProduct(fetchedProduct);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Pricing Engine Calculation
  const pricingResult = product ? (() => {
    const calc = calculateFinalPrice(product, {
      variantId: selectedVariantId || undefined,
      packId: selectedPackId || undefined,
      styleId: selectedStyleId || undefined,
      addOnIds: selectedAddOnIds,
      quantity: 1
    });

    // Add gift personalization price if active (post-calculation)
    if (giftCustomization.active) {
      calc.finalPrice += giftCustomization.price;
      calc.basePrice += giftCustomization.price;

      calc.discountAmount = Math.max(0, calc.basePrice - calc.finalPrice);
      calc.discountPercent = calc.basePrice > 0 ? Math.round((calc.discountAmount / calc.basePrice) * 100) : 0;
    }

    return calc;
  })() : { finalPrice: 0, basePrice: 0, discountAmount: 0, discountPercent: 0, breakdown: { base: 0, packAdjustment: 0, styleAdjustment: 0, addOnsTotal: 0 } };

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (!product) return;

    let selectedVariant = null;

    // Validation: Require Variant/Size selection if available
    if (product.variants && product.variants.length > 0) {
      if (!selectedVariantId) {
        toast.error('Please select an option (Size/Color)');
        return;
      }
      // Check stock for selected variant
      selectedVariant = product.variants.find(v => v._id === selectedVariantId);
      if (selectedVariant && selectedVariant.stock === 0) {
        toast.error('Selected variant is out of stock');
        return;
      }
    }

    // Validation: Legacy Size
    else if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    // Fragrance validation (Legacy support)
    if (product.fragrances && product.fragrances.length > 0) {
      if (product.allowMixedFragrance) {
        const activePack = product.variants?.find(v => v._id === selectedVariantId)?.packs?.find(p => p._id === selectedPackId)
          || product.packs?.find((p: any) => p._id === selectedPackId || p.id === selectedPackId);

        const requiredCount = (activePack as any)?.quantity || 1;
        if (selectedFragrances.length < requiredCount || selectedFragrances.some(f => !f)) {
          toast.error(`Please select all ${requiredCount} fragrances`);
          return;
        }
      } else if (!selectedFragrance) {
        toast.error('Please select a fragrance');
        return;
      }
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      image: selectedVariant?.image || product.images[0],
      price: pricingResult.finalPrice,
      quantity: 1, // Default to 1
      variantId: selectedVariantId || undefined,
      packId: selectedPackId || undefined,
      styleId: selectedStyleId || undefined,
      addOnIds: selectedAddOnIds,
      // Legacy fields
      size: !selectedVariantId ? selectedSize?.name : undefined,
      fragrance: selectedFragrance,
      fragrances: product.allowMixedFragrance ? selectedFragrances : undefined,
      giftCustomization: giftCustomization.active ? giftCustomization : undefined
    };

    if (!user) {
      dispatch(openLoginModal({
        pendingAction: 'CART',
        pendingActionData: cartItem
      }));
      return;
    }

    dispatch(addToCart(cartItem));
    toast.success('Added to cart!');
  };

  // Handle Buy Now
  const handleBuyNow = () => {
    handleAddToCart();
    // navigate('/cart'); // handleAddToCart now handles redirect in LoginModal if not user
    if (user) navigate('/cart');
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-primary-600 hover:underline"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-12 text-[#2A2421]">
      <div className="max-w-7xl mx-auto px-4 py-2 lg:py-4">

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">

          {/* Left Column: Image Gallery (Sticky on Desktop) */}
          <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-24 mx-auto w-full">
            <ImageGallery
              images={product.images}
              productName={product.name}
              selectedImage={
                product.styles?.find(s => s._id === selectedStyleId)?.image ||
                selectedColor?.image ||
                product.variants?.find(v => v._id === selectedVariantId)?.image
              }
            />

            {/* Desktop CTA (Moved to Left Column) */}
            <div className="hidden lg:flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 py-3 px-6 border border-primary-600 text-primary-600 font-bold rounded-sm border-2 hover:bg-primary-600 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase text-sm tracking-wide"
              >
                <FiShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 py-3 px-6 bg-primary-600 text-white font-bold rounded-sm border-2 border-primary-600 hover:bg-primary-700 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase text-sm tracking-wide shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <span>Buy Now</span>
              </button>
            </div>
          </div>

          {/* Right Column: Product Info & Controls */}
          <div className="lg:col-span-7 xl:col-span-7 mt-4 lg:mt-0">
            <div className="flex flex-col gap-4 lg:gap-4">

              {/* Header Section */}
              {(() => {
                const defaultLayout = ['pricing', 'variants', 'styles', 'addons', 'gift', 'description', 'specs'];
                const layout = product.pdpLayout && product.pdpLayout.length > 0 ? product.pdpLayout : defaultLayout;

                const renderSection = (sectionId: string) => {
                  switch (sectionId) {
                    case 'pricing':
                      return (
                        <div key="pricing" className="border-b border-gray-100 pb-3">
                          <div className="flex items-start justify-between">
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight tracking-tight">
                              {product.name}
                            </h1>
                          </div>

                          <div className="mt-1.5 flex items-center gap-3">
                            <RatingsSummary
                              rating={product.rating}
                              totalReviews={product.totalReviews}
                            />
                            {product.category && (
                              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                {product.category.name}
                              </span>
                            )}
                          </div>

                          <div className="mt-2">
                            <PricingBlock
                              price={pricingResult.finalPrice}
                              originalPrice={pricingResult.basePrice}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Free shipping on all prepaid orders • 7-day easy returns
                            </p>
                          </div>

                          {/* Pincode Delivery Checker */}
                          <div className="mt-2">
                            <PincodeChecker />
                          </div>
                        </div>
                      );

                    case 'variants':
                      return (
                        <div key="variants" className="space-y-4">
                          {/* Product Colors */}
                          {product.colors && product.colors.length > 0 && (
                            <div className="space-y-2">
                              <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider">Select Color</h3>
                              <div className="flex flex-wrap gap-3">
                                {product.colors.map((color, index) => {
                                  const isSelected = selectedColor?.label === color.label;
                                  return (
                                    <button
                                      key={index}
                                      onClick={() => setSelectedColor(isSelected ? null : color)}
                                      className={`group relative w-10 h-10 rounded-full flex items-center justify-center transition-all ${isSelected
                                        ? 'ring-2 ring-primary-600 ring-offset-2'
                                        : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
                                        }`}
                                      title={color.label}
                                    >
                                      <span
                                        className="w-full h-full rounded-full border border-gray-200 shadow-sm"
                                        style={{ backgroundColor: color.hex }}
                                      />
                                      {isSelected && (
                                        <span className="absolute inset-0 flex items-center justify-center">
                                          <svg className="w-5 h-5 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                          </svg>
                                        </span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                              {selectedColor && (
                                <p className="text-sm font-medium text-gray-700">
                                  Selected: <span className="text-gray-900 font-bold">{selectedColor.label}</span>
                                </p>
                              )}
                            </div>
                          )}

                          {/* Legacy Size Selection (Fallback if no variants) */}
                          {(!product.variants || product.variants.length === 0) && product.sizes && product.sizes.length > 0 && (
                            <SizeSelector
                              sizes={product.sizes}
                              selectedSize={selectedSize}
                              onSelectSize={setSelectedSize}
                            />
                          )}

                          {/* Variant Selection */}
                          {product.variants && product.variants.length > 0 && (
                            <VariantSelector
                              variants={product.variants as any}
                              selectedVariantId={selectedVariantId}
                              onSelectVariant={(variantId) => {
                                setSelectedVariantId(variantId);
                                const variant = product.variants?.find(v => v._id === variantId);
                                if (variant && variant.packs && variant.packs.length > 0) {
                                  setSelectedPackId(variant.packs[0]._id);
                                } else {
                                  setSelectedPackId(null);
                                }
                              }}
                            />
                          )}

                          {/* Pack Selection (Context Aware) */}
                          {(() => {
                            const activeVariant = product.variants?.find(v => v._id === selectedVariantId);
                            const activePacks = activeVariant ? activeVariant.packs : product.packs;

                            if (activePacks && activePacks.length > 0) {
                              const activePack = activePacks.find((p: any) => p._id === selectedPackId || p.id === selectedPackId);
                              const quantity = (activePack as any)?.quantity || 1;

                              return (
                                <>
                                  <PackSelector
                                    packs={activePacks as any}
                                    fragrances={product.allowMixedFragrance ? [] : (product.fragrances || [])}
                                    selectedPackId={selectedPackId}
                                    selectedFragrance={selectedFragrance}
                                    onSelectPack={(id) => {
                                      setSelectedPackId(id);
                                      if (product.allowMixedFragrance) {
                                        const pack = activePacks.find((p: any) => p._id === id || p.id === id);
                                        const qty = (pack as any)?.quantity || 1;
                                        const initialFrags = Array(qty).fill(product.fragrances?.[0] || '');
                                        setSelectedFragrances(initialFrags);
                                      }
                                    }}
                                    onSelectFragrance={setSelectedFragrance}
                                    basePrice={activeVariant ? activeVariant.price : product.price}
                                    baseOriginalPrice={activeVariant ? activeVariant.originalPrice : product.originalPrice}
                                    productImage={
                                      product.styles?.find(s => s._id === selectedStyleId)?.image ||
                                      activeVariant?.image ||
                                      product.images[0]
                                    }
                                  />

                                  {product.allowMixedFragrance && selectedPackId && product.fragrances && (
                                    <FragranceSelector
                                      candleCount={quantity}
                                      selectedFragrances={selectedFragrances}
                                      fragranceOptions={product.fragrances.map(f => ({
                                        id: f,
                                        name: f,
                                        color: '#6B7280'
                                      }))}
                                      onFragranceChange={(index, val) => {
                                        const newFrags = [...selectedFragrances];
                                        newFrags[index] = val;
                                        setSelectedFragrances(newFrags);
                                      }}
                                    />
                                  )}
                                </>
                              );
                            }
                            return null;
                          })()}

                          {/* Fragrance Selection (Standalone) */}
                          {(() => {
                            const activeVariant = product.variants?.find(v => v._id === selectedVariantId);
                            const activePacks = activeVariant ? activeVariant.packs : product.packs;
                            const hasPacks = activePacks && activePacks.length > 0;

                            if (product.fragrances && product.fragrances.length > 0 && !hasPacks) {
                              return (
                                <div className="space-y-2 pt-1.5">
                                  <h3 className="text-base font-semibold text-gray-900">Choose Fragrance</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {product.fragrances.map((fragrance: string, index: number) => (
                                      <button
                                        key={index}
                                        onClick={() => setSelectedFragrance(fragrance)}
                                        className={`px-4 py-2 rounded-lg border transition-all ${selectedFragrance === fragrance
                                          ? 'border-primary-600 bg-primary-50 text-primary-700 font-medium ring-1 ring-primary-600'
                                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                          }`}
                                      >
                                        {fragrance}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      );

                    case 'styles':
                      return (
                        <div key="styles">
                          {(() => {
                            const activeVariant = product.variants?.find(v => v._id === selectedVariantId);
                            const activePack = activeVariant
                              ? activeVariant.packs?.find(p => p._id === selectedPackId)
                              : product.packs?.find(p => (p as any)._id === selectedPackId || (p as any).id === selectedPackId);

                            const availableStyles = (activePack as any)?.styles?.length > 0
                              ? (activePack as any).styles
                              : product.styles;

                            if (availableStyles && availableStyles.length > 0) {
                              return (
                                <div className="space-y-2">
                                  <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider">Customize Style</h3>
                                  <div className="flex flex-wrap gap-3">
                                    {availableStyles.map((style: any) => {
                                      const styleId = style._id || style.id || style.label;
                                      const isSelected = selectedStyleId === styleId || (selectedStyleId === style.label);

                                      return (
                                        <button
                                          key={styleId}
                                          onClick={() => {
                                            const idToSet = style._id || style.id || style.label;
                                            setSelectedStyleId(isSelected ? null : idToSet);
                                          }}
                                          className={`flex flex-col items-center justify-center px-4 py-3 rounded-xl border-2 transition-all min-w-[100px] text-center ${isSelected
                                            ? 'border-primary-600 bg-primary-600 text-white font-bold ring-1 ring-primary-600'
                                            : 'border-gray-200 bg-white text-gray-700 hover:border-primary-600 hover:bg-primary-600 hover:text-white'
                                            }`}
                                        >
                                          <div className={`text-sm font-bold whitespace-nowrap ${isSelected ? 'text-white' : 'group-hover:text-white'}`}>{style.label}</div>
                                          {style.priceAdjustment !== 0 && (
                                            <div className={`text-xs mt-0.5 font-bold ${isSelected ? 'text-gray-200' : 'text-gray-600 group-hover:text-gray-200'}`}>
                                              {style.priceAdjustment > 0 ? '+' : ''}₹{style.priceAdjustment}
                                            </div>
                                          )}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          })()}
                        </div>
                      );

                    case 'addons':
                      return (
                        <div key="addons">
                          {product.addOns && product.addOns.length > 0 && (
                            <div className="space-y-2">
                              <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider">Add-Ons</h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {product.addOns.map((addon) => {
                                  const isSelected = selectedAddOnIds.includes(addon._id);
                                  return (
                                    <label key={addon._id} className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-colors ${isSelected ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                      <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary-600 border-primary-600 text-white' : 'border-gray-300 bg-white'}`}>
                                          {isSelected && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                        </div>
                                        <div className="flex flex-col">
                                          <span className={`text-sm font-bold ${isSelected ? 'text-primary-900' : 'text-gray-900'}`}>{addon.label}</span>
                                          {addon.description && <span className="text-xs text-gray-500">{addon.description}</span>}
                                        </div>
                                      </div>
                                      <span className="text-sm font-bold text-gray-900">+₹{addon.price}</span>
                                      <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={isSelected}
                                        onChange={() => {
                                          if (isSelected) {
                                            setSelectedAddOnIds(prev => prev.filter(id => id !== addon._id));
                                          } else {
                                            setSelectedAddOnIds(prev => [...prev, addon._id]);
                                          }
                                        }}
                                      />
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );

                    case 'summary':
                      return (
                        <div key="summary">
                          {(() => {
                            const basePriceForBreakdown = pricingResult.basePrice
                              - pricingResult.breakdown.styleAdjustment
                              - pricingResult.breakdown.addOnsTotal
                              - (giftCustomization.active ? giftCustomization.price : 0);

                            const hasBreakdown = pricingResult.discountAmount > 0
                              || pricingResult.breakdown.styleAdjustment > 0
                              || pricingResult.breakdown.addOnsTotal > 0
                              || giftCustomization.active;

                            if (!hasBreakdown) return null;

                            return (
                              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-4">
                                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Price Breakdown</h3>

                                <div className="space-y-2.5 text-sm">
                                  <div className="flex justify-between text-gray-600">
                                    <span>Base Price</span>
                                    <span className="font-medium text-gray-900">₹{basePriceForBreakdown}</span>
                                  </div>

                                  {pricingResult.discountAmount > 0 && (
                                    <div className="flex justify-between text-[#88651E] font-bold">
                                      <span>Discount</span>
                                      <span className="font-bold">-₹{pricingResult.discountAmount}</span>
                                    </div>
                                  )}

                                  {pricingResult.breakdown.styleAdjustment > 0 && (
                                    <div className="flex justify-between text-gray-600">
                                      <span>Style Adjustment</span>
                                      <span className="font-medium text-gray-900">+₹{pricingResult.breakdown.styleAdjustment}</span>
                                    </div>
                                  )}

                                  {pricingResult.breakdown.addOnsTotal > 0 && (
                                    <div className="flex justify-between text-gray-600">
                                      <span>Add-Ons</span>
                                      <span className="font-medium text-gray-900">+₹{pricingResult.breakdown.addOnsTotal}</span>
                                    </div>
                                  )}

                                  {giftCustomization.active && giftCustomization.price > 0 && (
                                    <div className="flex justify-between text-gray-600">
                                      <span>Gift Personalization</span>
                                      <span className="font-medium text-gray-900">+₹{giftCustomization.price}</span>
                                    </div>
                                  )}
                                </div>

                                <div className="border-t border-dashed border-gray-300 pt-3 flex justify-between items-center">
                                  <span className="text-base font-bold text-gray-900">Final Total</span>
                                  <span className="text-xl font-bold text-[#88651E]">₹{pricingResult.finalPrice}</span>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      );

                    case 'description':
                      return (
                        <div key="description" className="hidden lg:block border-t border-gray-100 pt-4">
                          <ProductDescription
                            shortDescription={product.shortDescription || product.description.substring(0, 150)}
                            fullDescription={product.description}
                            showFull={showFullDescription}
                            onToggle={() => setShowFullDescription(!showFullDescription)}
                          />
                        </div>
                      );

                    case 'specs':
                      return (
                        <div key="specs" className="hidden lg:block">
                          <ProductSpecifications product={product} />
                        </div>
                      );

                    default:
                      return null;
                  }
                };

                return (
                  <div className="flex flex-col gap-4 lg:gap-4">
                    {layout.map(sectionId => renderSection(sectionId))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="mt-8 space-y-8">
          {/* Mobile Description */}
          <div className="lg:hidden">
            <ProductDescription
              shortDescription={product.shortDescription || product.description.substring(0, 200)}
              fullDescription={product.description}
              showFull={showFullDescription}
              onToggle={() => setShowFullDescription(!showFullDescription)}
            />
          </div>

          <div className="border-t pt-6">
            <ReviewsSection productId={product._id} />
          </div>

          {product.faqs && product.faqs.length > 0 && (
            <div className="border-t pt-6">
              <FAQSection faqs={product.faqs} />
            </div>
          )}

          <div className="border-t pt-6 pb-4">
            <RelatedProducts productId={product._id} categoryId={product.category._id} />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar (Hidden on Desktop) */}
      <div className="lg:hidden">
        <StickyBottomBar
          finalPrice={pricingResult.finalPrice}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          disabled={product.stock === 0}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
