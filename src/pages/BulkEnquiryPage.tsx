import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { api } from '../services/api';

export const BulkEnquiryPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        category: 'Corporate Gifting',
        quantity: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/bulk-enquiries', formData);
            alert('Thank you! We will contact you shortly.');
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
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white py-20 px-4">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1920&q=80"
                        alt="Bulk Orders"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="relative container mx-auto text-center max-w-3xl">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        Bulk Orders & Corporate Gifting
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8">
                        Premium glassware, candle holders, and decor at factory-direct prices.
                        Customized for your business needs.
                    </p>
                    <button
                        onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-lg font-bold text-lg transition-transform active:scale-95 shadow-lg"
                    >
                        Request a Quote
                    </button>
                </div>
            </div>


            {/* Content & Form Section */}
            <div className="container mx-auto px-4 py-16" id="enquiry-form">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Side: Process & Info */}
                    <div className="lg:w-1/2">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
                        <div className="space-y-8">
                            <ProcessStep
                                step="1"
                                title="Submit Enquiry"
                                description="Fill out the form with your requirements and estimated quantity."
                            />
                            <ProcessStep
                                step="2"
                                title="Get Quote"
                                description="Our team will contact you within 24 hours with the best factory-price quote."
                            />
                            <ProcessStep
                                step="3"
                                title="Sample Approval"
                                description="We send samples for quality check (if required) before finalizing the order."
                            />
                            <ProcessStep
                                step="4"
                                title="Production & Delivery"
                                description="Order processing starts immediately after approval with live tracking."
                            />
                        </div>

                        <div className="mt-12 p-6 bg-green-50 rounded-xl border border-green-100 flex flex-col sm:flex-row items-center gap-6">
                            <div className="bg-green-500 text-white p-4 rounded-full shadow-lg grow-0 shrink-0">
                                <FaWhatsapp size={32} />
                            </div>
                            <div>
                                <h3 className="font-black text-green-900 mb-1 uppercase tracking-tight">Prefer WhatsApp?</h3>
                                <p className="text-green-800 text-[13px] mb-3 leading-snug">
                                    Get instant catalog and bulk pricing directly on your phone.
                                </p>
                                <a
                                    href="https://wa.me/919258063524"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
                                >
                                    Chat Now
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:w-1/2">
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Request a Quote</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                                            value={formData.company}
                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                                        <input
                                            required
                                            type="tel"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Corporate Gifting</option>
                                        <option>Wedding Return Gifts</option>
                                        <option>Candle Manufacturing (Raw Materials)</option>
                                        <option>Hotel/Restaurant Supply</option>
                                        <option>Reselling/Distribution</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Quantity</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 50 pcs, 500 units"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                                        value={formData.quantity}
                                        onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message / Specific Requirements</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black"
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-colors shadow-md"
                                >
                                    Submit Enquiry
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ProcessStep = ({ step, title, description }: { step: string, title: string, description: string }) => (
    <div className="flex gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
            {step}
        </div>
        <div>
            <h4 className="font-bold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </div>
);
