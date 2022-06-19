import React from 'react';
import PageLayout from '../../layout/PageLayout';
import { Tabs } from 'antd';
import Deposit from './Deposit';
import Withdrawal from './Withdrawal';

import './Operations.css';

const { TabPane } = Tabs;

const Operations = () => {
  return (
    <PageLayout title="Operations">
      <Tabs className="tabs_operations">
        <TabPane tab="Deposit" key="tab_deposit">
          <Deposit />
        </TabPane>
        <TabPane tab="Withdrawal" key="tab_widthdrawal">
          <Withdrawal />
        </TabPane>
      </Tabs>
    </PageLayout>
  );
};

export default Operations;
