import React from 'react';
import { Layout, PageHeader } from 'antd';

import './PageLayout.less';

type PageLayoutProps = {
    title: string,
    children: JSX.Element,
    extra?: JSX.Element[]
}

const { Content } = Layout;

const PageLayout: React.FC<PageLayoutProps> = ({ title, children, extra }: PageLayoutProps) => {
  return (
    <>
      <PageHeader title={title} extra={extra}/>
      <Content className="page-content">{children}</Content>
    </>
  );
};

export default PageLayout;
