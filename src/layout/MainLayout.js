import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './MainLayout.less';

const { Footer, Sider } = Layout;

const menuItems = [
  {
    key: 'menu_item_operations',
    icon: <HomeOutlined />,
    label: 'Operations',
    className: 'menu-item-link',
  },
  {
    key: 'menu_item_statistics',
    icon: <QuestionCircleOutlined />,
    label: 'Statistics',
    className: 'menu-item-link',
  },
];

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, handleMenuClick } = this.props;
    return (
      <Layout>
        <Sider>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['menu_item_operations']}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout>
          {children}
          <Footer>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/martian-meerkat">
              GitHub
            </a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
