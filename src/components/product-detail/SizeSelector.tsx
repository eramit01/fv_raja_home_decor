interface SizeSelectorProps {
    sizes: Array<{ name: string; price: number }>;
    selectedSize: { name: string; price: number } | null;
    onSelectSize: (size: { name: string; price: number } | null) => void;
}

export const SizeSelector = ({ sizes, selectedSize, onSelectSize }: SizeSelectorProps) => {
    return (
        <div className="space-y-2">
            <h3 className="text-base font-semibold text-gray-900">Select Size</h3>

            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {sizes.map((size, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectSize(selectedSize?.name === size.name ? null : size)}
                        className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 transition-all ${selectedSize?.name === size.name
                            ? 'border-accent bg-accent-soft text-text-gold font-semibold ring-1 ring-accent'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        <div className="text-sm font-medium">{size.name}</div>
                        <div className="text-xs mt-0.5">₹{size.price.toLocaleString('en-IN')}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};
