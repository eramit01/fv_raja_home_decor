import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface GiftOccasion {
    id: string;
    label: string;
    designs: Array<{ id: string; image: string }>;
}

interface GiftCustomizationProps {
    occasions: GiftOccasion[];
    extraPrice: number;
    onCustomizationChange: (data: {
        occasion: string;
        designId: string;
        message: string;
        active: boolean;
        price: number;
    }) => void;
}

export const GiftCustomization: React.FC<GiftCustomizationProps> = ({
    occasions,
    extraPrice,
    onCustomizationChange,
}) => {
    const [isActive, setIsActive] = useState(false);
    const [selectedOccasion, setSelectedOccasion] = useState<GiftOccasion | null>(null);
    const [selectedDesignId, setSelectedDesignId] = useState<string>('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (occasions.length > 0 && !selectedOccasion) {
            setSelectedOccasion(occasions[0]);
        }
    }, [occasions, selectedOccasion]);

    useEffect(() => {
        onCustomizationChange({
            occasion: selectedOccasion?.label || '',
            designId: selectedDesignId,
            message,
            active: isActive,
            price: extraPrice,
        });
    }, [selectedOccasion, selectedDesignId, message, isActive, extraPrice, onCustomizationChange]);

    const handleOccasionSelect = (occasion: GiftOccasion) => {
        setSelectedOccasion(occasion);
        setSelectedDesignId(''); // Reset design when occasion changes
    };

    return (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm mb-6">
            {/* Toggle Header */}
            <div
                className={`px-5 py-5 flex justify-between items-center cursor-pointer transition-all ${isActive ? 'bg-primary-900 text-white' : 'bg-white hover:bg-primary-50'}`}
                onClick={() => setIsActive(!isActive)}
            >
                <div>
                    <h3 className={`text-lg font-bold tracking-tight ${isActive ? 'text-white' : 'text-primary-900'}`}>Make It Special</h3>
                    <p className={`text-sm ${isActive ? 'text-accent-light' : 'text-gold font-medium'}`}>Gift Personalization {extraPrice > 0 ? '+' : ''}₹{extraPrice}</p>
                </div>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isActive ? 'border-accent bg-accent rotate-180' : 'border-primary-200'}`}>
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4L6 8L10 4" stroke={isActive ? "#1C1C1E" : "#D4AF37"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 py-8 space-y-8 bg-primary-50/30">
                            {/* 1. Occasion Selection */}
                            <div className="space-y-3">
                                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Select Occasion</label>
                                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                                    {occasions.map((occ) => (
                                        <button
                                            key={occ.id}
                                            onClick={() => handleOccasionSelect(occ)}
                                            className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border-2 ${selectedOccasion?.id === occ.id
                                                ? 'bg-primary-900 text-white border-primary-900 shadow-lg translate-y-[-1px]'
                                                : 'bg-white text-primary-900 border-primary-100 hover:border-primary-700'
                                                }`}
                                        >
                                            {occ.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Occasion-Based Image Display */}
                            {selectedOccasion && selectedOccasion.designs.length > 0 && (
                                <div className="space-y-3">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Choose Tag Design</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {selectedOccasion.designs.map((design) => (
                                            <div
                                                key={design.id}
                                                onClick={() => setSelectedDesignId(design.id)}
                                                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${selectedDesignId === design.id
                                                    ? 'border-[#C6A75E] shadow-md'
                                                    : 'border-transparent'
                                                    }`}
                                            >
                                                <img src={design.image} alt="Design" className="w-full h-full object-cover" />
                                                {selectedDesignId === design.id && (
                                                    <div className="absolute top-2 right-2 bg-[#C6A75E] text-white p-1 rounded-full">
                                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 3. Custom Message Area */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Personal Message</label>
                                    <span className="text-[10px] font-medium text-gray-400">{message.length} / 200</span>
                                </div>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value.slice(0, 200))}
                                    placeholder="Write your personal message…"
                                    className="w-full h-32 px-4 py-3 bg-white border-2 border-primary-100 rounded-xl text-sm text-primary-900 focus:outline-none focus:border-accent transition-all resize-none shadow-inner"
                                />
                            </div>

                            {/* 5. Live Preview Box */}
                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-primary-400 text-center block">Handwritten Note Preview</label>
                                <div className="bg-premium border-2 border-accent/20 rounded-2xl p-8 text-center min-h-[180px] flex flex-col items-center justify-center space-y-4 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" />
                                    <h4 className="font-bold text-2xl text-primary-900 tracking-tight">{selectedOccasion?.label || 'Select Occasion'}</h4>
                                    <div className="w-16 h-0.5 bg-accent/40" />
                                    <p className="text-primary-800 italic text-lg/relaxed max-w-[260px] whitespace-pre-wrap font-medium font-serif">
                                        {message || '“May your life be filled with light and love.”'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
