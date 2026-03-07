import { useState } from 'react';
import { FiMapPin, FiCheck, FiX, FiLoader } from 'react-icons/fi';

interface CheckResult {
    deliverable: boolean;
    estimatedDays: string;
    shippingCost: string;
    codAvailable: boolean;
}

export const PincodeChecker = () => {
    const [pincode, setPincode] = useState('');
    const [checking, setChecking] = useState(false);
    const [result, setResult] = useState<CheckResult | null>(null);
    const [error, setError] = useState('');

    const handleCheck = async () => {
        if (pincode.length !== 6 || !/^\d{6}$/.test(pincode)) {
            setError('Please enter a valid 6-digit pincode.');
            return;
        }
        setError('');
        setResult(null);
        setChecking(true);
        try {
            // Simulated API response — replace with:
            // const res = await api.get(`/shipping/check-pincode?pincode=${pincode}`);
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Demo logic: pincodes starting with 4 are deliverable
            const isDeliverable = pincode.startsWith('4');
            setResult({
                deliverable: isDeliverable,
                estimatedDays: isDeliverable ? '3-5 Business Days' : '',
                shippingCost: isDeliverable ? 'FREE on prepaid orders' : '',
                codAvailable: isDeliverable && !pincode.startsWith('40'),
            });
        } catch {
            setError('Unable to check delivery at this time. Please try again.');
        } finally {
            setChecking(false);
        }
    };

    return (
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
            <h4 className="text-sm font-bold text-gray-700 flex items-center gap-1.5 mb-3">
                <FiMapPin className="text-primary-600" /> Check Delivery Availability
            </h4>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={pincode}
                    onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setPincode(v);
                        if (result) setResult(null);
                        if (error) setError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                    placeholder="Enter 6-digit pincode"
                    className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-white"
                />
                <button
                    onClick={handleCheck}
                    disabled={checking || pincode.length !== 6}
                    className="px-4 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-lg hover:bg-primary-700 active:scale-95 transition disabled:opacity-50 flex items-center gap-1.5"
                >
                    {checking ? <FiLoader className="animate-spin" /> : 'Check'}
                </button>
            </div>

            {error && (
                <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                    <FiX className="w-3.5 h-3.5" /> {error}
                </p>
            )}

            {result && (
                <div className={`mt-3 p-3 rounded-lg text-sm ${result.deliverable ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
                    {result.deliverable ? (
                        <div className="space-y-1.5">
                            <p className="font-bold text-green-800 flex items-center gap-1.5">
                                <FiCheck className="w-4 h-4" /> Delivery available to {pincode}
                            </p>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <div className="bg-white rounded-md p-2 border border-green-100">
                                    <p className="text-xs text-gray-500">Estimated Delivery</p>
                                    <p className="text-xs font-bold text-gray-900 mt-0.5">{result.estimatedDays}</p>
                                </div>
                                <div className="bg-white rounded-md p-2 border border-green-100">
                                    <p className="text-xs text-gray-500">Shipping</p>
                                    <p className="text-xs font-bold text-green-700 mt-0.5">{result.shippingCost}</p>
                                </div>
                            </div>
                            <p className={`text-xs font-medium mt-1 ${result.codAvailable ? 'text-green-700' : 'text-gray-500'}`}>
                                {result.codAvailable ? '✓ Cash on Delivery available' : '✕ COD not available for this pincode'}
                            </p>
                        </div>
                    ) : (
                        <p className="font-bold text-red-700 flex items-center gap-1.5">
                            <FiX className="w-4 h-4" /> Sorry, we don't deliver to pincode {pincode} yet.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};
