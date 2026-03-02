import { CgSpinner } from 'react-icons/cg';

export const LoadingFallback = () => {
    return (
        <div className="flex items-center justify-center min-h-[60vh] w-full bg-premium/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <CgSpinner className="w-12 h-12 animate-spin text-primary-600" />
                <p className="text-primary-800 font-medium animate-pulse">Loading experience...</p>
            </div>
        </div>
    );
};
