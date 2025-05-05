import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./UserHeader";
import Sider from "./UserSider";
import { useState } from "react";


function UserLayout() {
    const [isSiderCollapsed, setIsSiderCollapsed] = useState(true);

    return (
        <Layout className='fixed top-0 bottom-0 left-0 right-0'>
            <div>
                <style>
                    {`
                        .ant-layout-sider-trigger {
                            background-color: #1b212e !important;
                        }
                    `}
                </style>
                <Layout.Sider 
                    collapsible={true}
                    collapsed={isSiderCollapsed} 
                    onCollapse={() => setIsSiderCollapsed(!isSiderCollapsed)}
                    className='!bg-[#1F2937] h-full w-full'
                >
                    <Sider isSiderCollapsed={isSiderCollapsed}/>
                </Layout.Sider>
            </div>

  
            <Layout>
                <Layout.Header className="!p-0 w-full">
                    <Header />
                </Layout.Header>

                <Layout.Content 
                    className="bg-[#20262E]"
                    >
                    <Outlet />
                </Layout.Content>
            </Layout>
        </Layout>
    )
}


export default UserLayout;