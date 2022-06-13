import React from 'react';
import { InputNumber, Button } from 'antd';

const Deposit = () => {
  return (
    <div className="form-operation">
      <label>
        Deposit BTC:{' '}
        <InputNumber
          id="input-deposit"
          type="number"
          size="large"
          className="form-operation-input"
          defaultValue={0}
        />
      </label>
      <Button type="primary" size="large" className="form-operation-btn">
        Transact
      </Button>
    </div>
  );
};

export default Deposit;
