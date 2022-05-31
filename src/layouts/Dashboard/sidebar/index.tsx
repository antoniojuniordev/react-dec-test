import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  InfoCircleOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import logo from 'assets/images/logo.png';

import '../style.css';

interface MenuInfo {
  key: string;
}
interface Props {
  isMobile: boolean;
  collapsed: boolean;
  toggle(): void;
  setMobile(value: boolean): void;
}

export function SideBar(props: Props) {
  const location = useLocation();
  const [pathname, setPathname] = useState('/dashboard');

  useEffect(() => {
    setPathname(location.pathname);
  }, []);

  function selectRouter(event: MenuInfo) {
    setPathname(event.key);
  }

  return (
    <Layout.Sider
      className='menu-sidebar'
      collapsible
      collapsed={props.collapsed}
      onCollapse={props.toggle}
      breakpoint='sm'
      width='256px'
      theme='light'
      onBreakpoint={(broken: boolean) => {
        props.setMobile(!broken);
      }}
      collapsedWidth={props.isMobile ? '80' : '0'}
    >
      <div className='sidebar-logo'>
        <img src={logo} alt='logo' className='logo' height='50' width='45' />
        {!props.collapsed && (
          <h3 className='logo-name'>
            Doc<strong className='text-red'>Spider</strong>
          </h3>
        )}
      </div>
      <Menu
        theme='light'
        mode='inline'
        selectedKeys={[pathname]}
        defaultOpenKeys={[pathname]}
        onClick={selectRouter}
      >
        <Menu.Item key='/dashboard' icon={<HomeOutlined />}>
          <Link to='/dashboard'>
            <span>Início</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='/my-docs' icon={<CopyOutlined />}>
          <Link to='/my-docs'>
            <span>Meus Documentos</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='/infor' icon={<InfoCircleOutlined />}>
          <Link to='/infor'>
            <span>Sobre</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
}
