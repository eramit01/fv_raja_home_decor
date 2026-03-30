import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { api } from '../services/api';
import { bannerService, Banner } from '../services/banner.service';
import { TrustStrip } from '../components/TrustStrip';
import { ExperienceSection } from '../components/ExperienceSection';
import { Stories } from '../components/home/Stories';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const BulkEnquiryPage = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        category: 'Corporate Gifting',
        quantity: '',
        message: ''
    });

    useEffect(() => {
        const fetchBanners = async () => {
            const response = await bannerService.getActiveBanners('bulk-enquiry');
            if (response.success) {
                setBanners(response.data.banners);
            }
        };
        fetchBanners();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/bulk-enquiries', formData);
            alert('Thank you! Our dedicated bulk orders team will contact you within 24 hours.');
            setFormData({
                name: '',
                company: '',
                phone: '',
                email: '',
                category: 'Corporate Gifting',
                quantity: '',
                message: ''
            });
        } catch (error) {
            console.error('Failed to submit enquiry', error);
            alert('Failed to submit enquiry. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Slider Section */}
            <div className="relative w-full">
                {banners.length > 0 ? (
                    <Swiper
                        modules={[Autoplay, Pagination, Navigation]}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        className="w-full group flipkart-banner-swiper"
                    >
                        {banners.map((banner) => (
                            <SwiperSlide key={banner._id}>
                                <div className="relative w-full aspect-[4/3] md:aspect-[21/9] lg:h-[60vh] bg-gray-100">
                                    <img 
                                        src={banner.image} 
                                        alt={banner.title} 
                                        className="w-full h-full object-contain md:object-cover" 
                                    />
                                    {/* Link overlay if banner has a link */}
                                    {banner.link && (
                                        <a href={banner.link} className="absolute inset-0 z-10"></a>
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="h-[40vh] md:h-[60vh] bg-gray-900 flex items-center justify-center relative overflow-hidden">
                         <img 
                            src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1920&q=80" 
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                            alt="Bulk Orders"
                         />
                         <div className="relative text-center text-white px-4">
                            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight italic">Scale Your Business with Premium Decor</h1>
                             <button 
                                onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-accent text-white px-8 py-3 rounded-full font-bold text-lg hover:opacity-90 transition-all shadow-xl"
                            >
                                Get Started
                            </button>
                         </div>
                    </div>
                )}
            </div>

            {/* Professional Value Proposition - Compact */}
            <div className="py-12 md:py-16 bg-white text-center px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                        Bulk Orders & Corporate Gifting
                    </h2>
                    <p className="text-base md:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto italic border-l-4 border-accent pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                        "Premium glassware & luxury decor at factory-direct prices. 
                        Customized identification for your business growth."
                    </p>
                </div>
            </div>

            {/* Trust & Experience - Combined Compact */}
            <div className="bg-gray-50 pb-12">
                <TrustStrip />
                <ExperienceSection />
            </div>

            {/* Form Section (Moved Up) */}
            <div className="bg-white py-20 px-4 scroll-mt-20 border-t border-gray-100" id="enquiry-form">
                <div className="container mx-auto">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
                        {/* Copy Section */}
                        <div className="lg:w-1/2 space-y-8">
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Ready to collaborate?</h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    Whether you're looking for corporate gifts, wedding favors, or 
                                    retail inventory, our team is equipped to handle large-scale orders 
                                    with precision and care.
                                </p>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-gray-700 font-medium">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                                    Custom Branding & Packaging
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 font-medium">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                                    Pan-India & International Delivery
                                </li>
                                <li className="flex items-center gap-3 text-gray-700 font-medium">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                                    Lowest Factory Prices Guaranteed
                                </li>
                            </ul>

                            <div className="p-8 bg-green-900 text-white rounded-[2rem] shadow-2xl relative overflow-hidden group">
                                <FaWhatsapp className="absolute -right-4 -bottom-4 text-white/10 text-9xl transition-transform group-hover:scale-110" />
                                <h4 className="text-xl font-bold mb-2">Direct Professional Support</h4>
                                <p className="text-green-100/80 mb-6 text-sm">Chat with our dedicated bulk success manager on WhatsApp for instant catalogs.</p>
                                <a 
                                    href="https://wa.me/919258063524" 
                                    target="_blank" 
                                    className="inline-block bg-green-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-400 transition-colors"
                                >
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:w-1/2 w-full">
                            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 w-full">
                                <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Request a Personalized Quote</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name *</label>
                                            <input required type="text" placeholder="e.g. John Doe" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-gray-900" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Company Name</label>
                                            <input type="text" placeholder="e.g. Acme Corp Pvt Ltd" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-gray-900" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number *</label>
                                            <input required type="tel" placeholder="e.g. +91 98765 43210" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-gray-900" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                                            <input required type="email" placeholder="e.g. name@company.com" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-gray-900" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Requirement Category</label>
                                        <select className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-gray-900" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                            <option>Corporate Gifting</option>
                                            <option>Wedding Return Gifts</option>
                                            <option>Candle Manufacturing (Raw Materials)</option>
                                            <option>Hotel/Restaurant Supply</option>
                                            <option>Reselling/Distribution</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">What is your expected quantity?</label>
                                        <input type="text" placeholder="e.g. 100 units" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-gray-900" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Additional Details</label>
                                        <textarea rows={4} placeholder="Please tell us about your specific requirements, timeline, or custom branding needs..." className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none text-gray-900 pt-4" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>
                                    </div>

                                    <button type="submit" className="w-full bg-black text-white font-black py-4 rounded-2xl text-lg hover:bg-gray-900 transition-all shadow-xl active:scale-95">
                                        Get Your Quote
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Manufacturing Process (Stories Integration - Moved Down) */}
            <div className="bg-gray-50 py-16 border-t border-gray-100">
                 <div className="container mx-auto px-4 text-center mb-0">
                    <span className="text-accent font-bold uppercase tracking-widest text-[10px]">Transparency in Motion</span>
                    <h2 className="text-2xl md:text-4xl font-black text-gray-900 mt-2 tracking-tight">Our Manufacturing Process</h2>
                    <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed font-medium max-w-2xl mx-auto mt-2">
                        Watch how every product is crafted with precision, quality, and care — before it reaches you.
                    </p>
                 </div>
                 <Stories hideHeader={true} />
            </div>
        </div>
    );
};
