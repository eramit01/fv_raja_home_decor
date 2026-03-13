import { CgSpinner } from 'react-icons/cg';

export const LoadingFallback = () => {
    return (
        <div className="flex items-center justify-center min-h-[60vh] w-full bg-white transition-opacity duration-300">
            <div className="flex flex-col items-center gap-6">
                <div className="relative">
                    <div className="w-16 h-16 border-t-2 border-r-2 border-primary-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-primary-600/10 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <p className="text-primary-600 font-bold tracking-[0.2em] uppercase text-xs">Raja Home Decor</p>
                    <div className="h-[1px] w-12 bg-primary-600/30 animate-grow-shink"></div>
                </div>
            </div>
        </div>
    );
};
