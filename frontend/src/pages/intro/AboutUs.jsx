import { Carousel } from 'antd';
import { motion } from 'framer-motion';

function AboutUs() {
  // High-quality Unsplash images for the carousel
  const images = [
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop&q=80", // Tech team working
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=600&fit=crop&q=80", // AI visualization
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop&q=80", // Team brainstorming
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop&q=80"  // Team collaboration
  ];
  
  // Team members with Unsplash profile images
  const teamMembers = [
    {
      name: "Nguyễn Minh Anh",
      role: "AI Research Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&q=80",
      description: "Chuyên gia về học máy và xử lý ngôn ngữ tự nhiên với hơn 8 năm kinh nghiệm."
    },
    {
      name: "Trần Đức Hải",
      role: "Computer Vision Specialist",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&h=300&fit=crop&q=80",
      description: "Đam mê nghiên cứu và phát triển các giải pháp thị giác máy tính tiên tiến."
    },
    {
      name: "Phạm Thu Hà",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop&q=80",
      description: "Chuyên gia phát triển sản phẩm công nghệ với định hướng người dùng."
    },
    {
      name: "Lê Quang Minh",
      role: "Full-stack Developer",
      image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=300&h=300&fit=crop&q=80",
      description: "Kỹ sư phần mềm giàu kinh nghiệm trong phát triển các ứng dụng AI."
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
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center w-full p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Enhanced Carousel Section */}
      <motion.div 
        className="w-full max-w-[1250px] min-w-[850px] mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Carousel
          autoplay
          autoplaySpeed={4000}
          draggable={true}
          pauseOnHover={false}
          pauseOnFocus={false}
          effect="fade"
          dots={{ className: "custom-dots" }}
        >
          {images.map((src, index) => (
            <div key={index}>
              <div className="relative">
                <img 
                  src={src} 
                  alt={`Slide ${index + 1}`} 
                  className='rounded-2xl h-[500px] w-full object-cover shadow-xl'
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-3xl font-bold mb-2">
                    {index === 0 ? "Đội ngũ chuyên gia" : 
                     index === 1 ? "Công nghệ tiên tiến" : 
                     index === 2 ? "Sáng tạo không ngừng" : "Hợp tác hiệu quả"}
                  </h3>
                  <p className="text-xl">
                    {index === 0 ? "Đội ngũ chuyên gia AI hàng đầu Việt Nam" : 
                     index === 1 ? "Ứng dụng công nghệ AI tiên tiến nhất" : 
                     index === 2 ? "Không ngừng đổi mới và sáng tạo" : "Hợp tác cùng phát triển"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </motion.div>

      {/* About Us Content */}
      <motion.div 
        className="flex flex-col items-center text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="text-4xl font-bold text-red-500 mb-6">Về chúng tôi</h2>
        <p className="mt-2 text-xl text-gray-700 max-w-[900px] leading-relaxed">
          Chúng tôi là một đội nhóm về Trí tuệ nhân tạo (AI), Xử lý ngôn ngữ tự nhiên (NLP)
          và Thị giác máy tính (Computer Vision), đam mê xây dựng các sản phẩm giúp tối ưu hóa nội dung số.
        </p>
        <p className="mt-4 text-xl text-gray-700 max-w-[900px] leading-relaxed">
          Với sứ mệnh giúp mọi người tiếp cận công nghệ AI một cách dễ dàng, chúng tôi phát triển
          các giải pháp thông minh giúp tạo ra nội dung chất lượng cao một cách nhanh chóng và hiệu quả.
        </p>
      </motion.div>

      {/* Our Values Section */}
      <motion.div 
        className="w-full max-w-[1250px] mb-16 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h3 
          className="text-3xl font-bold text-red-500 text-center mb-8"
          variants={itemVariants}
        >
          Giá trị cốt lõi
        </motion.h3>
        
        <div className="grid grid-cols-3 gap-8">
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg"
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)" }}
          >
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-3">Đổi mới</h4>
            <p className="text-gray-700">Không ngừng tìm kiếm giải pháp sáng tạo và đột phá để giải quyết các thách thức phức tạp.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg"
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)" }}
          >
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-3">Chất lượng</h4>
            <p className="text-gray-700">Cam kết mang đến những sản phẩm và dịch vụ chất lượng cao nhất cho khách hàng.</p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-lg"
            variants={itemVariants}
            whileHover={{ y: -10, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)" }}
          >
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold mb-3">Đồng đội</h4>
            <p className="text-gray-700">Làm việc cùng nhau như một đội, hỗ trợ và học hỏi lẫn nhau để đạt được mục tiêu chung.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div 
        className="w-full max-w-[1250px] mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h3 
          className="text-3xl font-bold text-red-500 text-center mb-8"
          variants={itemVariants}
        >
          Đội ngũ của chúng tôi
        </motion.h3>
        
        <div className="grid grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg text-center"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0px 15px 30px rgba(0,0,0,0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-red-100"
              />
              <h4 className="text-xl font-bold mb-1">{member.name}</h4>
              <p className="text-red-500 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AboutUs;