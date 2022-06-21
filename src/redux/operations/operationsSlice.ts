import { AnyAction, createSelector, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit'
import { IOperationData } from '../../interfaces/IOperation'
import { RootState } from '../store'
import { btcDeposit, btcWithdrawal, getAllOperations } from '../../services/operations.service'
import { OperationTypes } from '../../constants/operationTypes';
import { loadingData, dataLoaded } from '../statistics/statisticsSlice';
import { string } from 'prop-types';

export type OperationsState = {
    data: IOperationData[]
};

const initialState: OperationsState = {data: null};

export const operationsSlice = createSlice({
    name: 'operations',
    initialState: initialState,
    reducers: {
        // fetch all operations data
        fetchOperations: (_state, action: PayloadAction<IOperationData[]>) => {
            return {loadingData: false, data: action.payload};
        },
        deposit: (state, action: PayloadAction<IOperationData>) => {
            return {...state, data: [...state.data, action.payload]};
        },
        withdrawal: (state, action: PayloadAction<IOperationData>) => {
            return {...state, data: [...state.data, action.payload]};
        }
    }
})

const { fetchOperations, deposit, withdrawal } = operationsSlice.actions

export const fetchOperationsData = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    dispatch(loadingData()); // to show loading status
    const response = await getAllOperations();
    dispatch(fetchOperations(response.data.operations));
    dispatch(dataLoaded()); // loading has finished
}

export const depositRequest = (amount: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    const response = await btcDeposit(amount, getState);
    dispatch(deposit(response.data.operation));
}

export const withdrawalRequest = (amount: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    const response = await btcWithdrawal(amount, getState);
    dispatch(withdrawal(response.data.operation));
}

// Get all user group id's involved in operations
const selectAllGroupIds = (state: RootState) => {
    if (!state.operations.data) {
        return null;
    }
    const groupIds = new Set<string>();
    state.operations.data.forEach((operation) => {
        groupIds.add(operation.user.groupId)
    })
    return groupIds;
}

// The selector to get BTC amount dynamics by groups for chartlines
export const selectOperationsByDateAndGroup = createSelector(
    (state: RootState) => {
        // get all data for user selected time range
        return {
            data: state.operations.data,
            fromDate: state.statistics.fromDate,
            toDate: state.statistics.toDate,
            groupIds: selectAllGroupIds(state)
        } 
    },
    ({data, fromDate, toDate, groupIds}) => {
        if (!data) {
            return null;
        }
        let amountsByDateAndGroup: {date: string, amount: number, groupId: string}[] = [];
        groupIds.forEach((group) => {
            // get all operations in time range for a particular group
            const operationsByGroup = data.filter((operation: IOperationData) => operation.user.groupId === group);
            // array of amounts change by day from summary of operations in a day
            const amountChangesByDate: {date: Date, change: number}[] = []
            // convert date strings to Date objects for comparisons
            const dateRange = [new Date(fromDate), new Date(toDate)];

            // calculate change of group's BTC amounts for every day of operations data
            operationsByGroup.forEach((operation: IOperationData) => {
                // cast date & time to just date
                const operationDay = new Date(new Date(operation.date).setHours(0,0,0,0));
                // check if it is data for the day already...
                const found = amountChangesByDate.some(amountChange => amountChange.date === operationDay);
                // ...and push new day amount change info if it's not
                if (!found && operationDay >= dateRange[0] && operationDay <= dateRange[1]) {
                    amountChangesByDate.push({date: operationDay, change: 0});
                }
                // get the amount change object for the operation's day
                const amountChange = amountChangesByDate.find((amountChange) => {
                    return amountChange.date === operationDay
                });
                // add or substract the amount for day's change depending on operation type
                if (operation.type === OperationTypes.DEPOSIT && amountChange) {
                    amountChange.change += operation.amount;
                }
                if (operation.type === OperationTypes.WITHDRAWAL && amountChange) {
                    amountChange.change -= operation.amount;
                }
            });

            // sort group BTC amount changes by date
            amountChangesByDate.sort((change1, change2) => {
                return change1.date < change2.date ? -1 : change1.date > change2.date ? 1 : 0;
            });

            // initially, every user group has 0 BTC
            let groupAmount: number = 0;

            // calculate group's BTC amount for every day from operations data...
            const amountsByDate: {date: string, amount: number, groupId: string}[] = [];
            // ...using BTC amount change data
            amountChangesByDate.forEach((changeByDate) => {
                // add or substract BTC from group summary with it's change
                groupAmount += changeByDate.change;
                // get date string from day amount change data
                const localeDateString = changeByDate.date.toLocaleDateString();
                // check if it is data for the day already...
                const found = amountsByDate.some(amount => amount.date === localeDateString);
                // ...and push new day group BTC amount info if it's not...
                if (!found) {
                    amountsByDate.push({date: localeDateString, amount: groupAmount, groupId: group});
                } else {
                    // ...otherwise, append the change value to the amount
                    amountsByDate[amountsByDate.length - 1].amount += changeByDate.change;
                }
            })
            // push the group's BTC amount data for a particular day
            amountsByDateAndGroup.push(...amountsByDate);
        })
        return amountsByDateAndGroup;
    }
)

export default operationsSlice.reducer
