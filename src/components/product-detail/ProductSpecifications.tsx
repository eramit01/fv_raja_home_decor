import React from 'react';

interface ProductSpecificationsProps {
    product: {
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
    };
}

export const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ product }) => {
    const specs = [];

    if (product.material) specs.push({ label: 'Material', value: product.material });
    if (product.finish) specs.push({ label: 'Finish / Color', value: product.finish });
    if (product.capacity) specs.push({ label: 'Capacity', value: `${product.capacity} ml` });

    // Dimensions
    if (product.dimensions) {
        const { height, width, length } = product.dimensions;
        if (height || width || length) {
            const dimStr = [
                height ? `H: ${height}"` : '',
                width ? `W: ${width}"` : '',
                length ? `L: ${length}"` : ''
            ].filter(Boolean).join(' x ');
            specs.push({ label: 'Dimensions', value: dimStr });
        }
    }

    // Weight (Structured or Direct)
    const weight = product.weight || product.dimensions?.weight;
    if (weight) specs.push({ label: 'Weight', value: `${weight} kg` });

    // Custom Specs
    if (product.specifications && Array.isArray(product.specifications)) {
        product.specifications.forEach((spec) => {
            if (spec.key && spec.value) {
                specs.push({ label: spec.key, value: spec.value });
            }
        });
    }

    if (specs.length === 0) return null;

    return (
        <div className="border-t border-gray-100 pt-6 mt-6">
            <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider mb-4">Specifications</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                {specs.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-50 last:border-0 sm:last:border-b">
                        <span className="text-sm text-gray-500 font-medium">{spec.label}</span>
                        <span className="text-sm text-gray-900 font-bold text-right ml-4">{spec.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
