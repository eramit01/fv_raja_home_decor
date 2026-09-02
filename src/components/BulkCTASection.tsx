import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaIndustry } from 'react-icons/fa';

export const BulkCTASection = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-r from-blue-50/80 via-white to-blue-100/50 border-t border-b border-blue-200/80 my-10 relative overflow-hidden shadow-sm">
            <div className="container mx-auto px-4 py-10 md:py-14 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">

                    <div className="text-center md:text-left space-y-2">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
                            <FaIndustry className="text-xs text-blue-700" /> Direct Manufacturer
                        </div>
                        <h2 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Looking for Bulk Orders & Wholesale Glassware?
                        </h2>
                        <p className="text-sm md:text-base text-slate-600 font-medium max-w-xl">
                            Get factory-direct pricing for glass candle jars, vases, planters, and custom orders from Firozabad.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/bulk-enquiry')}
                        className="w-full md:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-blue-700/25 transition-all active:scale-95 flex items-center justify-center gap-2 group shrink-0"
                    >
                        <span>Get Bulk Quote</span>
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </button>

                </div>
            </div>
        </div>
    );
};


