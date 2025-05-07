import { motion } from "framer-motion";
import { Menu } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faChartLine,
    faArrowUpFromBracket,
    faHeadset,
    faComputer,
    faArchive
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';


function Sider({ isSiderCollapsed }) {
    const navigate = useNavigate();

    const items = [
        {
            key: "upload",
            icon: <FontAwesomeIcon icon={faArrowUpFromBracket} />,
            label: "Upload",
            onClick: () => navigate('/')
        },
        {
            key: "album",
            icon: <FontAwesomeIcon icon={faArchive} />,
            label: "Album",
            onClick: () => navigate('/album')
        },
        {
            key: "dashboard",
            icon: <FontAwesomeIcon icon={faChartLine} />,
            label: "Dashboard",
            onClick: () => navigate('/dashboard')
        },
        {
            key: "support",
            icon: <FontAwesomeIcon icon={faHeadset} />,
            label: "Support",
            onClick: () => navigate('/support')
        },
    ];

    return (
        <>
            <div 
                className="group flex items-center justify-center gap-2 cursor-pointer h-[64px] bg-[#1b212e] px-4 caret-transparent"
                onClick={() => navigate('/')}
            >
                <FontAwesomeIcon 
                    icon={faComputer} 
                    className="text-xl group-hover:text-blue-400 transition-all duration-300"
                />
                {!isSiderCollapsed && (
                    <motion.span 
                        className="text-xl text-gray-100 font-semibold group-hover:text-blue-400 transition-all duration-300 select-none"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        CaptionAI
                    </motion.span>
                )}
            </div>

            <div>
                <style>
                    {`
                    .ant-menu-item-selected {
                        background-color: #374151 !important;
                    }
                    .ant-menu-item {
                        color: #F3F4F6 !important; /* text-gray-100 */
                        transition: all 0.3s ease;
                    }
                    .ant-menu-item:hover {
                        background-color: #2D3748 !important;
                        color: #60A5FA !important; /* text-blue-400 */
                    }
                    `}
                </style>
                <Menu 
                    mode="inline" 
                    items={items}
                    className="!bg-[#1F2937]"
                    theme="dark"
                />
            </div>
        </>
    );
}


export default Sider;