import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sider from './AdminSider';
import Header from './AdminHeader';


function AdminLayout() {
    const [isSiderCollapsed, setIsSiderCollapsed] = useState(false);
  
  return (
    <Layout className='fixed top-0 bottom-0 left-0 right-0'>
        <>
            <style>
                {`
                    .ant-layout-sider-trigger {
                        background-color: #f0f2f5 !important;
                        color: black !important;
                    }
                `}
            </style>    
            <Layout.Sider 
                collapsible={true}
                collapsed={isSiderCollapsed} 
                onCollapse={() => setIsSiderCollapsed(!isSiderCollapsed)}
                style={{ 
                  background: '#F3F4F6', 
                }}
            >
              <Sider isSiderCollapsed={isSiderCollapsed}/>
            </Layout.Sider>
        </>
      
      <Layout>
        <Layout.Header className='!p-0 w-full !bg-[#F3F4F6]'>
          <Header/>
        </Layout.Header>
        
        <Layout.Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff',
          }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;