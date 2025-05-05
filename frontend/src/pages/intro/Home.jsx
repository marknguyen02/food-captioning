import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
    const navigate = useNavigate();

    // Featured products with Unsplash images
    const featuredProducts = [
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=350&fit=crop&q=80", // Headphones
        "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=500&h=350&fit=crop&q=80", // Speaker
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=350&fit=crop&q=80", // Headphones gold
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=350&fit=crop&q=80"  // Laptop
    ];

    // Testimonials with animation stagger effect
    const testimonials = [
        {
            quote: "Tôi không còn phải mất hàng giờ nghĩ caption cho hình ảnh!",
            author: "Linh Nguyễn, Blogger"
        },
        {
            quote: "Phụ đề tự động giúp video của tôi tiếp cận nhiều khán giả hơn.",
            author: "Minh Trần, Content Creator"
        },
        {
            quote: "Công cụ AI tuyệt vời cho marketing thương hiệu của chúng tôi!",
            author: "Hà Phạm, Marketing Manager"
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.3 
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.div 
            className="flex flex-col gap-[100px] overflow-y-auto overflow-x-hidden p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Hero Section */}
            <div className="flex gap-[40px] items-center bg-white rounded-3xl p-8 shadow-xl">
                <motion.img 
                    src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=600&fit=crop&q=80" 
                    className="w-[55%] rounded-[30px] shadow-lg object-cover h-96"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    whileHover={{ scale: 1.03 }}
                />

                <motion.div 
                    className="flex flex-col flex-1 gap-[25px] items-center justify-center"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <span className="text-[36px] font-bold text-red-500 drop-shadow-md text-center">
                        Trình tạo phụ đề cho ảnh và video
                    </span>
                    <span className="text-gray-600 mt-2 text-xl text-center">
                        Tạo phụ đề ngay lập tức cho video của bạn và tiếp cận khán giả toàn cầu!
                        Phần mềm tạo phụ đề video tự động với công nghệ AI.
                    </span>
                    <Button
                        onClick={() => navigate('/login')}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transform transition hover:scale-105"
                    >
                        Khám Phá Ngay
                    </Button>
                </motion.div>
            </div>

            {/* Featured Products Section */}
            <motion.div 
                className="flex flex-col gap-[30px] items-center bg-white rounded-3xl py-8 shadow-xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <motion.span 
                    className="text-[36px] font-bold text-red-500 drop-shadow-md"
                    variants={itemVariants}
                >
                    Những sản phẩm nổi bật
                </motion.span>

                <div className="flex gap-[30px] justify-center flex-wrap">
                    {featuredProducts.map((src, index) => (
                        <motion.div 
                            key={index}
                            whileHover={{ scale: 1.08, rotate: 2, boxShadow: "0px 10px 25px rgba(0,0,0,0.15)" }}
                            transition={{ duration: 0.3 }}
                            className="rounded-2xl overflow-hidden shadow-lg"
                            variants={itemVariants}
                        >
                            <img
                                src={src}
                                alt={`Product ${index + 1}`}
                                className="cursor-pointer h-64 w-80 object-cover"
                            />
                        </motion.div>
                    ))}
                </div>

                <motion.div variants={itemVariants}>
                    <Button
                        onClick={() => navigate('/product')}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transform transition hover:scale-105 mt-6"
                    >
                        Xem thêm sản phẩm
                    </Button>
                </motion.div>
            </motion.div>

            {/* About Section */}
            <div className="flex items-center gap-12 bg-gray-50 rounded-3xl p-12 shadow-lg">
                <motion.div 
                    className="w-1/2 flex flex-col gap-[25px] items-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-bold text-red-500 drop-shadow-md">
                        AI Caption Generator!
                    </h2>
                    <p className="text-gray-600 mt-2 text-xl text-center">
                        AI Caption Generator – Tạo caption cho ảnh chỉ trong vài giây với công nghệ trí tuệ nhân tạo tiên tiến nhất
                    </p>
                    <Button
                        onClick={() => navigate('/about-us')}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transform transition hover:scale-105"
                    >
                        <p className="text-lg">Về chúng tôi</p>
                    </Button>
                </motion.div>

                <motion.div 
                    className="w-1/2 flex justify-center"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img 
                        src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&h=800&fit=crop&q=80" 
                        className="w-3/5 rounded-3xl shadow-xl object-cover h-96" 
                    />
                </motion.div>
            </div>

            {/* Testimonials Section */}
            <motion.div 
                className="flex flex-col items-center gap-[30px] bg-white rounded-3xl p-12 shadow-xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <motion.span 
                    className="text-3xl font-bold text-red-500 drop-shadow-md"
                    variants={itemVariants}
                >
                    Khách hàng nói gì?
                </motion.span>
                
                <div className="flex gap-6 flex-wrap justify-center">
                    {testimonials.map((testimonial, index) => (
                        <motion.div 
                            key={index}
                            className="bg-gray-50 p-6 rounded-2xl shadow-lg max-w-sm"
                            variants={itemVariants}
                            whileHover={{ y: -10, boxShadow: "0px 15px 25px rgba(0,0,0,0.1)" }}
                        >
                            <motion.p className="text-xl italic text-gray-700 mb-4">
                                "{testimonial.quote}"
                            </motion.p>
                            <motion.p className="text-lg font-semibold text-red-500">
                                {testimonial.author}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>    
        </motion.div>
    );
}

export default Home;