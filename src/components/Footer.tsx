import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FiFacebook, FiInstagram, FiTwitter, FiYoutube,
    FiMapPin, FiPhone, FiMail, FiPlus, FiMinus
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const Footer = () => {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    const footerSections = [
        {
            title: "Top Categories",
            links: [
                { label: "Scented Candles", to: "/category/candles" },
                { label: "Decorative Lamps", to: "/category/lamps" },
                { label: "Wall Decor", to: "/category/wall-decor" },
                { label: "Gift Sets", to: "/category/gifts" },
                { label: "Home Fragrance", to: "/category/fragrance" }
            ]
        },
        {
            title: "About Us",
            links: [
                { label: "Our Story", to: "/about" },
                { label: "Blog", to: "/blog" },
                { label: "Sustainability", to: "/sustainability" },
                { label: "Careers", to: "/careers" },
                { label: "Press", to: "/press" }
            ]
        },
        {
            title: "Quick Links",
            links: [
                { label: "New Arrivals", to: "/products?sort=newest" },
                { label: "Best Sellers", to: "/products?sort=popular" },
                { label: "Bulk Enquiry", to: "/bulk-enquiry" },
                { label: "Store Locator", to: "/stores" },
                { label: "Site Map", to: "/sitemap" }
            ]
        },
        {
            title: "Help",
            links: [
                { label: "Track Order", to: "/orders" },
                { label: "Shipping Policy", to: "/shipping-policy" },
                { label: "Refund Policy", to: "/refund-policy" },
                { label: "Privacy Policy", to: "/privacy-policy" },
                { label: "Terms & Conditions", to: "/terms" },
                { label: "FAQs", to: "/faq" }
            ]
        }
    ];

    return (
        <footer className="bg-[#141415] text-white border-t border-accent/10">
            {/* Desktop Footer (Hidden on Mobile) */}
            <div className="hidden lg:block pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
                        {/* Brand Column */}
                        <div className="lg:col-span-1 flex flex-col items-start">
                            <Link to="/" className="mb-6 inline-block group">
                                <img src="/banners/Logo/logo2.png" alt="Raja Home Decor" className="h-16 w-auto object-contain rounded-2xl" />
                            </Link>
                            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                Premium home decor and lifestyle products designed to elevate your living spaces. Experience luxury in every detail.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-11 h-11 rounded-full bg-primary-900/50 border border-primary-800/50 flex items-center justify-center hover:bg-white hover:text-[#141415] hover:scale-110 transition-all shadow-lg group">
                                    <FiInstagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-11 h-11 rounded-full bg-primary-900/50 border border-primary-800/50 flex items-center justify-center hover:bg-white hover:text-[#141415] hover:scale-110 transition-all shadow-lg group">
                                    <FiFacebook className="w-5 h-5 group-hover:fill-current" />
                                </a>
                                <a href="#" className="w-11 h-11 rounded-full bg-primary-900/50 border border-primary-800/50 flex items-center justify-center hover:bg-white hover:text-[#141415] hover:scale-110 transition-all shadow-lg group">
                                    <FiYoutube className="w-5 h-5 group-hover:fill-current" />
                                </a>
                                <a href="#" className="w-11 h-11 rounded-full bg-primary-900/50 border border-primary-800/50 flex items-center justify-center hover:bg-white hover:text-[#141415] hover:scale-110 transition-all shadow-lg group">
                                    <FiTwitter className="w-5 h-5 group-hover:fill-current" />
                                </a>
                            </div>
                        </div>

                        {/* Desktop Links */}
                        {footerSections.slice(0, 3).map((section) => (
                            <div key={section.title}>
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-gray-200">{section.title}</h3>
                                <ul className="space-y-4 text-sm text-gray-400 font-medium tracking-tight">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <Link to={link.to} className="hover:text-accent transition-colors block py-0.5">{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Contact Row */}
                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex gap-8">
                            <div className="flex items-center gap-3">
                                <FiMail className="text-accent" />
                                <span className="text-sm text-gray-400">support@store.com</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FiPhone className="text-accent" />
                                <span className="text-sm text-gray-400">+91 98765 43210</span>
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs">© 2024 Raja Home Decor. All rights reserved.</p>
                    </div>
                </div>
            </div>

            {/* Mobile Footer (Accordion Style - Hidden on Desktop) */}
            <div className="lg:hidden">
                {/* 1. Contact Section (Top) */}
                <div className="pt-10 pb-9 px-4 border-b border-white/5 bg-[#1a1a1c]/20">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] mb-6 text-center text-gray-500">Contact Us</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <a
                            href="mailto:support@store.com"
                            className="flex items-center gap-3 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] rounded-2xl py-3.5 px-4 transition-all active:scale-[0.96] active:bg-white/[0.08] shadow-sm"
                        >
                            <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                                <FiMail className="text-amber-500" size={16} />
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.1em] text-gray-300 uppercase">Email</span>
                        </a>
                        <a
                            href="https://wa.me/919876543210"
                            className="flex items-center gap-3 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] rounded-2xl py-3.5 px-4 transition-all active:scale-[0.96] active:bg-white/[0.08] shadow-sm"
                        >
                            <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                                <FaWhatsapp className="text-green-500" size={17} />
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.1em] text-gray-300 uppercase">WhatsApp</span>
                        </a>
                    </div>
                </div>

                {/* 2. Accordion Sections */}
                <div className="divide-y divide-white/5">
                    {footerSections.map((section) => (
                        <div key={section.title} className="w-full">
                            <button
                                onClick={() => toggleSection(section.title)}
                                className="w-full px-4 py-5 flex items-center justify-between group"
                            >
                                <span className={`text-sm font-semibold tracking-tight transition-colors ${openSection === section.title ? 'text-white' : 'text-gray-400'}`}>
                                    {section.title}
                                </span>
                                {openSection === section.title ? (
                                    <FiMinus className="text-accent" size={18} />
                                ) : (
                                    <FiPlus className="text-gray-500" size={18} />
                                )}
                            </button>

                            <AnimatePresence>
                                {openSection === section.title && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <ul className="px-4 pb-6 pt-1 space-y-4">
                                            {section.links.map((link) => (
                                                <li key={link.label}>
                                                    <Link
                                                        to={link.to}
                                                        className="text-sm text-gray-400 font-medium hover:text-white transition-colors block w-full py-1"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Social & Legal (Bottom Mobile) */}
                <div className="px-4 py-8 bg-[#0a0a0b]/50">
                    <div className="flex justify-center gap-6 mb-6">
                        <FiInstagram className="text-gray-500 hover:text-white" size={20} />
                        <FiFacebook className="text-gray-500 hover:text-white" size={20} />
                        <FiYoutube className="text-gray-500 hover:text-white" size={20} />
                        <FiTwitter className="text-gray-500 hover:text-white" size={20} />
                    </div>
                    <p className="text-center text-[10px] text-gray-600 font-medium uppercase tracking-widest">
                        © 2024 Raja Home Decor • Premium Life
                    </p>
                </div>
            </div>
        </footer>
    );
};

