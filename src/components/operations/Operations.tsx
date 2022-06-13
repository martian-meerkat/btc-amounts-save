import React from 'react';
import PageLayout from '../../layout/PageLayout';
import { Tabs } from 'antd';
import Deposit from './Deposit';
import Widthdrawal from './Widthdrawal';

import './Operations.css';

const { TabPane } = Tabs;

const Operations = () => {
  return (
    <PageLayout title="Operations">
      <Tabs className="tabs_operations">
        <TabPane tab="Deposit" key="tab_deposit">
          <Deposit />
        </TabPane>
        <TabPane tab="Widthdrawal" key="tab_widthdrawal">
          <Widthdrawal />
        </TabPane>
      </Tabs>
    </PageLayout>
  );
};

export default Operations;
