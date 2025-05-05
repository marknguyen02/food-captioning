import React, { useState } from 'react';
import { 
    MessageCircle, 
    Mail, 
    MapPin, 
    Send, 
    ArrowRight, 
    HelpCircle 
} from 'lucide-react';

function Support() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Support form submitted:', formData);
        alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.');
    };

    return (
        <div className='w-full h-full bg-[#20262E] overflow-auto'>
            <div className="mx-auto max-w-7xl px-4 py-5">
                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-5 hidden md:block">
                    Hỗ Trợ
                </h1>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-800 border border-gray-800 shadow-xl rounded-xl overflow-hidden 
                        transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.3)] 
                        hover:border-blue-500 group">
                        <div className="p-4 flex items-center transition-colors duration-300 bg-slate-700">
                            <HelpCircle className="text-cyan-400 stroke-2" size={24} />
                            <h3 className="ml-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
                                Hỗ Trợ Khách Hàng
                            </h3>
                        </div>
                        <div className="p-4 overflow-auto max-h-[600px] space-y-4">
                            <div className="flex items-start">
                                <MessageCircle className="text-teal-400 mr-3 mt-1" size={20} />
                                <div className="text-left">
                                    <p className="text-sm text-gray-400 uppercase tracking-wider">Hotline</p>
                                    <p className="text-lg text-teal-400 font-semibold">1900 6868</p>
                                    <p className="text-sm text-gray-500">Hỗ trợ 24/7</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Mail className="text-amber-400 mr-3 mt-1" size={20} />
                                <div className="text-left">
                                    <p className="text-sm text-gray-400 uppercase tracking-wider">Email</p>
                                    <p className="text-lg text-amber-400 font-semibold">support@photomanager.com</p>
                                    <p className="text-sm text-gray-500">Phản hồi trong 24h</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="text-pink-400 mr-3 mt-1" size={20} />
                                <div className="text-left">
                                    <p className="text-sm text-gray-400 uppercase tracking-wider">Địa Chỉ</p>
                                    <p className="text-lg text-pink-400 font-semibold">Tầng 5, Tòa nhà Innovation</p>
                                    <p className="text-sm text-gray-500">Hà Nội, Việt Nam</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form 
                        onSubmit={handleSubmit}
                        className="bg-gray-900 border border-gray-800 shadow-xl rounded-xl overflow-hidden 
                        transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.3)] 
                        hover:border-blue-500 group"
                    >
                        <div className="p-4 flex items-center transition-colors duration-300 bg-slate-700">
                            <HelpCircle className="text-cyan-400 stroke-2" size={24} />
                            <h3 className="ml-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
                                Gửi Yêu Cầu Hỗ Trợ
                            </h3>
                        </div>
                        <div className="p-4 bg-gray-800 overflow-auto max-h-[600px] space-y-4">
                            <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nhập họ và tên"
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 placeholder-gray-400 
                                focus:outline-none focus:border-cyan-500 transition-all duration-300"
                            />
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Nhập địa chỉ email"
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 placeholder-gray-400 
                                focus:outline-none focus:border-cyan-500 transition-all duration-300"
                            />
                            <select 
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 
                                appearance-none focus:outline-none focus:border-cyan-500 transition-all duration-300"
                            >
                                <option value="" className="text-gray-300">Chọn chủ đề hỗ trợ</option>
                                <option value="technical" className="text-gray-300">Hỗ trợ kỹ thuật</option>
                                <option value="billing" className="text-gray-300">Thanh toán</option>
                                <option value="other" className="text-gray-300">Khác</option>
                            </select>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Nội dung yêu cầu hỗ trợ"
                                required
                                rows={6}
                                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 placeholder-gray-400 
                                resize-none focus:outline-none focus:border-cyan-500 transition-all duration-300"
                            />
                            <button 
                                type="submit"
                                className="w-full bg-cyan-600 text-white p-3 rounded-xl 
                                hover:bg-gradient-to-r hover:from-cyan-500 hover:to-pink-500 
                                transition-all duration-300 flex items-center justify-center group 
                                shadow-md hover:shadow-lg"
                            >
                                <Send className="mr-2 text-white" size={20} />
                                Gửi Yêu Cầu
                                <ArrowRight 
                                    className="ml-2 opacity-0 group-hover:opacity-100 text-white 
                                    transition-all duration-300" 
                                    size={20} 
                                />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Support;