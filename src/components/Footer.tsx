import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export const Footer = () => {
    return (
        <footer className="bg-[#141415] text-white pt-16 pb-8 border-t border-accent/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column (Full width on mobile, 1 col on large) */}
                    <div className="lg:col-span-1 text-center lg:text-left flex flex-col items-center lg:items-start">
                        <Link to="/" className="mb-6 inline-block group">
                            <img src="/banners/Logo/logo2.png" alt="Raja Home Decor" className="h-16 w-auto object-contain rounded-2xl" />
                        </Link>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Premium home decor and lifestyle products designed to elevate your living spaces. Experience luxury in every detail.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-11 h-11 rounded-full bg-primary-900/50 border border-primary-800/50 flex items-center justify-center hover:bg-accent hover:text-primary-900 hover:scale-110 transition-all shadow-lg group">
                                <FiInstagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-11 h-11 rounded-full bg-primary-900/50 border border-primary-800/50 flex items-center justify-center hover:bg-accent hover:text-primary-900 hover:scale-110 transition-all shadow-lg group">
                                <FiFacebook className="w-5 h-5 group-hover:fill-current" />
                            </a>
                            <a href="#" className="w-11 h-11 rounded-full bg-primary-900/50 border border-primary-800/50 flex items-center justify-center hover:bg-accent hover:text-primary-900 hover:scale-110 transition-all shadow-lg group">
                                <FiYoutube className="w-5 h-5 group-hover:fill-current" />
                            </a>
                            <a href="#" className="w-11 h-11 rounded-full bg-primary-900/50 border border-primary-800/50 flex items-center justify-center hover:bg-accent hover:text-primary-900 hover:scale-110 transition-all shadow-lg group">
                                <FiTwitter className="w-5 h-5 group-hover:fill-current" />
                            </a>
                        </div>
                    </div>

                    {/* Links Section - Grid of 3 columns on mobile (One Row), spanning 3 cols on large */}
                    <div className="lg:col-span-3 grid grid-cols-3 gap-1 md:gap-8 text-left">
                        {/* Quick Links */}
                        <div className="pl-2">
                            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 md:mb-6 md:text-lg text-gray-200">Links</h3>
                            <ul className="space-y-2 md:space-y-4 text-[10px] md:text-sm text-gray-400 font-medium">
                                <li><Link to="/products" className="hover:text-accent transition-colors block py-0.5">Products</Link></li>
                                <li><Link to="/about" className="hover:text-accent transition-colors block py-0.5">About Us</Link></li>
                                <li><Link to="/category/candles" className="hover:text-accent transition-colors block py-0.5">Candles</Link></li>
                                <li><Link to="/category/decor" className="hover:text-accent transition-colors block py-0.5">Decor</Link></li>
                                <li><Link to="/bulk-enquiry" className="hover:text-accent transition-colors block py-0.5">Bulk</Link></li>
                            </ul>
                        </div>

                        {/* Customer Service */}
                        <div className="pl-1">
                            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 md:mb-6 md:text-lg text-gray-200">Support</h3>
                            <ul className="space-y-2 md:space-y-4 text-[10px] md:text-sm text-gray-400 font-medium">
                                <li><Link to="/faq" className="hover:text-white transition-colors block py-0.5">FAQs</Link></li>
                                <li><Link to="/shipping-policy" className="hover:text-white transition-colors block py-0.5">Shipping Policy</Link></li>
                                <li><Link to="/refund-policy" className="hover:text-white transition-colors block py-0.5">Refund Policy</Link></li>
                                <li><Link to="/privacy-policy" className="hover:text-white transition-colors block py-0.5">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-white transition-colors block py-0.5">Terms & Conditions</Link></li>
                                <li><Link to="/orders" className="hover:text-white transition-colors block py-0.5">Track Order</Link></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="col-span-1">
                            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 md:mb-6 md:text-lg text-gray-200">Contact</h3>
                            <ul className="space-y-2.5 md:space-y-4 text-[10px] md:text-sm text-gray-400 font-medium">
                                <li className="flex flex-col md:flex-row items-start gap-1 md:gap-3">
                                    <div className="flex items-start gap-1.5 min-w-0">
                                        <FiMapPin className="w-3 h-3 md:w-5 md:h-5 text-gray-500 shrink-0 mt-0.5" />
                                        <span className="leading-tight break-words">123 Fashion St, Delhi</span>
                                    </div>
                                </li>
                                <li className="flex flex-col md:flex-row items-start gap-1 md:gap-3">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        <FiPhone className="w-3 h-3 md:w-5 md:h-5 text-gray-500 shrink-0" />
                                        <span className="leading-tight break-all">+91 98765 43210</span>
                                    </div>
                                </li>
                                <li className="flex flex-col md:flex-row items-start gap-1 md:gap-3">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        <FiMail className="w-3 h-3 md:w-5 md:h-5 text-gray-500 shrink-0" />
                                        <span className="leading-tight break-all">support@store.com</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


            </div>
        </footer>
    );
};
