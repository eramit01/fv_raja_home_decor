import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { FiArrowRight } from 'react-icons/fi';

interface CategoryProductSectionProps {
    title: string;
    bannerImage: string;
    products: Product[];
    viewAllLink?: string;
}

export const CategoryProductSection = ({
    title,
    bannerImage,
    products,
    viewAllLink = '/products',
}: CategoryProductSectionProps) => {
    if (!bannerImage && products.length === 0) return null;

    return (
        <div className="bg-white border-t border-gray-100 py-6 sm:py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Section Header ── */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
                        {title}
                    </h2>
                    <Link
                        to={viewAllLink}
                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400 rounded-full px-3 py-1.5 transition-all duration-200"
                    >
                        View All <FiArrowRight size={13} />
                    </Link>
                </div>

                {/* ── Category Banner — matches main BannerSlider sizing ── */}
                {bannerImage && (
                    <Link
                        to={viewAllLink}
                        className="block -mx-4 sm:-mx-6 lg:-mx-8 mb-5 md:mb-8 lg:mb-10 hover:opacity-95 transition-opacity duration-300"
                    >
                        <div className="w-full overflow-hidden bg-gray-100 flex items-center justify-center max-h-40 sm:max-h-56 md:max-h-72 lg:max-h-80 xl:max-h-96">
                            <img
                                src={bannerImage}
                                alt={`${title} Banner`}
                                className="w-full h-full object-contain pointer-events-none"
                                loading="lazy"
                            />
                        </div>
                    </Link>
                )}

                {/* ── Product Grid ── */}
                {products.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
                            {products.map((product) => (
                                <div key={product.id} className="h-full">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-sm text-gray-400 text-center py-6">No products available in this category.</p>
                )}
            </div>
        </div>
    );
};
