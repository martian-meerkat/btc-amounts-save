import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/plots';
import { useAppDispatch, useAppSelector } from '../../hooks/useApp';
import { selectOperationsByDateAndGroup } from '../../redux/operations/operationsSlice';
import { DatePicker } from 'antd';
import { Moment } from 'moment';
import { setDateRange } from '../../redux/statistics/statisticsSlice';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import PageLayout from '../../layout/PageLayout';

const { RangePicker } = DatePicker;

type StatisticsProps = {
    loadingData: boolean; // is data fetching from REST?
    hasData: boolean // has chart got statistics data?
}

const Statistics: React.FC<StatisticsProps> = ({loadingData, hasData}: StatisticsProps) => {
    const dispatch = useAppDispatch();
    const selectData = useAppSelector(selectOperationsByDateAndGroup);
    const [data, setData] = useState(selectData);
    
    const config = {
        data,
        autoFit: false,
        height: 600,
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
        setData(selectData);
    });

    const onDateRangeChange = (dates: [Moment, Moment]) => {
        dispatch(setDateRange([dates[0].toDate().toDateString(), dates[1].toDate().toDateString()]));
    };

    // should set chart's data if data is in store, but chart still has not got it
    if (!data && hasData) {
        setData(selectData)
    };

    return (
        loadingData ?
        <div className="lazy-loading">
            <span>Loading...</span>
        </div>
        :
        <PageLayout title='Statistics by groups in time' extra={[<RangePicker key='statistics_date_range' size='large' onChange={onDateRangeChange} />]}>
            <div>
                <div>
                    <Line {...config} />
                </div>
            </div>
        </PageLayout>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        loadingData: state.statistics.loadingData,
        hasData: state.statistics.hasData
    }
}

export default connect(mapStateToProps)(Statistics);
