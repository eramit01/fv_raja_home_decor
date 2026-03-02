import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

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
    return (
        <div className="bg-white py-4 mt-2">
            <div className="container mx-auto px-4">
                {/* 1. Section Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
                    <Link
                        to={viewAllLink}
                        className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors flex items-center gap-1"
                    >
                        View All <span className="text-xl leading-none">→</span>
                    </Link>
                </div>
            </div>

            {/* 2. Full-width Banner */}
            <div className="w-full mb-6">
                <Link to={viewAllLink} className="block w-full overflow-hidden bg-gray-100 aspect-[1900/650]">
                    <img
                        src={bannerImage}
                        alt={`${title} Banner`}
                        className="w-full h-full object-contain font-display"
                        loading="lazy"
                    />
                </Link>
            </div>

            <div className="container mx-auto px-4">
                {/* 3. Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="h-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
