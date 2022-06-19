import React, { useState } from 'react';
import { InputNumber, Button } from 'antd';
import { useAppDispatch } from '../../hooks/useApp';
import { withdrawalRequest } from '../../redux/operations/operationsSlice';

const Deposit: React.FC = () => {
    const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);
    const dispatch = useAppDispatch();

    return (
        <div className="form-operation">
            <label>
                Withdraw BTC:{' '}
                <InputNumber
                    id="input-deposit"
                    type="number"
                    size="large"
                    className="form-operation-input"
                    defaultValue={withdrawalAmount}
                    onChange={value => setWithdrawalAmount(value)}
                />
            </label>
            <Button type="primary" size="large" className="form-operation-btn" onClick={() => dispatch(withdrawalRequest(withdrawalAmount))}>
                Transact
            </Button>
        </div>
    );
};

export default Deposit;
