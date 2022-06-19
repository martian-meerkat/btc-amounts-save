import React, { useState } from 'react';
import { InputNumber, Button } from 'antd';
import { useAppDispatch } from '../../hooks/useApp';
import { depositRequest } from '../../redux/operations/operationsSlice';

const Deposit: React.FC = () => {
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const dispatch = useAppDispatch()

    return (
        <div className="form-operation">
            <label>
                Deposit BTC:{' '}
                <InputNumber
                    id="input-deposit"
                    type="number"
                    size="large"
                    className="form-operation-input"
                    defaultValue={depositAmount}
                    onChange={value => setDepositAmount(value)}
                />
            </label>
            <Button type="primary" size="large" className="form-operation-btn" onClick={() => dispatch(depositRequest(depositAmount))}>
                Transact
            </Button>
        </div>
    );
};

export default Deposit;
