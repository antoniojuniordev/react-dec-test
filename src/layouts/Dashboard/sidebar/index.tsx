import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Layout, Menu, Modal, Row } from 'antd';
import {
  HomeOutlined,
  InfoCircleOutlined,
  CopyOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import logo from 'assets/images/logo.png';

import '../style.css';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [pathname, setPathname] = useState('/dashboard');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setPathname(location.pathname);
  }, []);

  function selectRouter(event: MenuInfo) {
    setPathname(event.key);
  }

  function changeToggle() {
    if (!props.isMobile && !props.collapsed) {
      props.toggle();
    }
  }

  return (
    <Layout.Sider
      className={
        props.isMobile ? 'menu-sidebar' : 'menu-sidebar sidebar-mobile'
      }
      collapsible
      collapsed={props.collapsed}
      onCollapse={props.toggle}
      breakpoint='sm'
      width='256px'
      theme='light'
      onBreakpoint={(broken: boolean) => {
        props.setMobile(!broken);
      }}
      trigger={null}
      collapsedWidth={props.isMobile ? '80' : '0'}
    >
      <div className='sidebar-logo'>
        <img src={logo} alt='logo' className='logo' height='50' width='45' />
        {!props.collapsed && (
          <h3 className='logo-name'>
            Doc<strong className='text-red'>Spider</strong>
          </h3>
        )}
        {!props.isMobile && (
          <MenuFoldOutlined className='trigger ml-4' onClick={props.toggle} />
        )}
      </div>
      <Menu
        theme='light'
        mode='inline'
        selectedKeys={[pathname]}
        defaultOpenKeys={[pathname]}
        onClick={selectRouter}
      >
        <Menu.Item
          key='/dashboard'
          icon={<HomeOutlined />}
          onClick={changeToggle}
        >
          <Link to='/dashboard'>
            <span>{t('Home')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item
          key='/my-docs'
          icon={<CopyOutlined />}
          onClick={changeToggle}
        >
          <Link to='/my-docs'>
            <span>{t('My Documents')}</span>
          </Link>
        </Menu.Item>
        <Menu.Item
          key='/infor'
          icon={<InfoCircleOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          <span>{t('About')}</span>
        </Menu.Item>
      </Menu>
      <Modal
        title={t('About our company')}
        visible={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <Row justify='center' gutter={[0, 12]}>
          <img src={logo} alt='Logo' height='70' />
          <Col span={24}>
            <h4>Doc LTC</h4>
            <p>
              {t('We work with blockchain for versioning all your documents.')}
            </p>
            <p>CEP: 02910-040</p>
            <p>Endereço: Rua Jorge Saraiva N: 935</p>
            <p>Bairro: Freguesia do Ó Cidade: São Paulo</p>
          </Col>
        </Row>
      </Modal>
    </Layout.Sider>
  );
}
