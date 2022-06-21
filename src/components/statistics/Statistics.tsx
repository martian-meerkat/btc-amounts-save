import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/plots';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { selectOperationsByDateAndGroup } from '../../redux/operations/operationsSlice';
import { DatePicker } from 'antd';
import { Moment } from 'moment';
import { setDateRange } from '../../redux/statistics/statisticsSlice';

const { RangePicker } = DatePicker;

const Statistics: React.FC = () => {
    const dispatch = useAppDispatch();
    const selectData = useAppSelector(selectOperationsByDateAndGroup);
    const [data, setData] = useState(selectData);
    
    const config = {
        data,
        width: 800,
        height: 400,
        autoFit: false,
        xField: 'date',
        yField: 'amount',
        seriesField: 'groupId',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
    };

    useEffect(() => {
        setData(selectData)
    })

    const onDateRangeChange = (dates: [Moment, Moment]) => {
        dispatch(setDateRange([dates[0].toDate().toDateString(), dates[1].toDate().toDateString()]));
    }

    return (
        <div>
            <Line {...config} />
            <RangePicker size='large' onChange={onDateRangeChange} />
        </div>
    );
};

export default Statistics;
