import React from 'react';
import { Layout, Menu } from 'antd';
import { BankOutlined, LineChartOutlined } from '@ant-design/icons';
import './MainLayout.less';

const { Footer, Sider } = Layout;

const menuItems = [
  {
    key: 'menu_item_statistics',
    icon: <LineChartOutlined />,
    label: 'Statistics',
    className: 'menu-item-link',
  },
  {
    key: 'menu_item_operations',
    icon: <BankOutlined />,
    label: 'Operations',
    className: 'menu-item-link',
  }
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
            defaultSelectedKeys={['menu_item_statistics']}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout>
          {children}
          <Footer>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/martian-meerkat">
              My GitHub
            </a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
