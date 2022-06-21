import React, { useState, KeyboardEvent } from 'react';
import { InputNumber, Button } from 'antd';
import { useAppDispatch } from '../../hooks/useApp';
import { depositRequest } from '../../redux/operations/operationsSlice';

const Deposit: React.FC = () => {
    const [depositAmount, setDepositAmount] = useState<number>(null);
    const dispatch = useAppDispatch()

    const onInputChange = (value: number) => {
        if (!value || value <= 0) {
            setDepositAmount(0);
        } else {
            setDepositAmount(value);
        }
    }

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
                    min={0}
                    onChange={onInputChange}
                />
            </label>
            <Button type="primary" size="large" className="form-operation-btn" 
                onClick={() => dispatch(depositRequest(depositAmount))}>
                Transact
            </Button>
        </div>
    );
};

export default Deposit;
