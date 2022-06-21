import { AnyAction, createSelector, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit'
import { IOperationData } from '../../interfaces/IOperation'
import { RootState } from '../store'
import { btcDeposit, btcWithdrawal, getAllOperations } from '../../services/operations.service'
import { OperationTypes } from '../../constants/operationTypes';

export type OperationsState = {
    data: IOperationData[]
};

const initialState: OperationsState = {data: null};

export const operationsSlice = createSlice({
    name: 'operations',
    initialState: initialState,
    reducers: {
        fetchOperations: (_state, action: PayloadAction<IOperationData[]>) => {
            return {data: action.payload};
        },
        deposit: (state, action: PayloadAction<IOperationData>) => {
            return {data: [...state.data, action.payload]};
        },
        withdrawal: (state, action: PayloadAction<IOperationData>) => {
            return {data: [...state.data, action.payload]};
        }
    }
})

const { fetchOperations, deposit, withdrawal } = operationsSlice.actions

export const fetchOperationsIfNeeded = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    const response = await getAllOperations();
    dispatch(fetchOperations(response.data.operations));
}

export const depositRequest = (amount: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    const response = await btcDeposit(amount, getState);
    dispatch(deposit(response.data.operation));
}

export const withdrawalRequest = (amount: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    const response = await btcWithdrawal(amount, getState);
    dispatch(withdrawal(response.data.operation));
}

const selectAllGroupIds = (state: RootState) => {
    const groupIds = new Set<string>;
    state.operations.data.forEach((operation) => {
        groupIds.add(operation.user.groupId)
    })
    return groupIds;
}
export const selectOperationsByDateAndGroup = createSelector(
    (state: RootState) => {
        return {
            data: state.operations.data,
            fromDate: state.statistics.fromDate,
            toDate: state.statistics.toDate,
            groupIds: selectAllGroupIds(state)
        } 
    },
    ({data, fromDate, toDate, groupIds}) => {
        console.log('the selector');
        console.log(fromDate);
        console.log(toDate);
        let amountsByDateAndGroup: {date: string, amount: number, groupId: string}[] = [];
        groupIds.forEach((group) => {
            const operationsByGroup = data.filter((operation: IOperationData) => operation.user.groupId === group); 
            const amountChangesByDate: {date: Date, change: number}[] = []
            const dateRange = [new Date(fromDate), new Date(toDate)];
            operationsByGroup.forEach((operation: IOperationData) => {
                const operationDay = new Date(new Date(operation.date).setHours(0,0,0,0));
                const found = amountChangesByDate.some(amountChange => amountChange.date === operationDay);
                if (!found && operationDay >= dateRange[0] && operationDay <= dateRange[1]) {
                    amountChangesByDate.push({date: operationDay, change: 0});
                }
                const amountChange = amountChangesByDate.find((amountChange) => {
                    return amountChange.date === operationDay
                });
                if (operation.type === OperationTypes.DEPOSIT && amountChange) {
                    amountChange.change += operation.amount;
                }
                if (operation.type === OperationTypes.WITHDRAWAL && amountChange) {
                    amountChange.change -= operation.amount;
                }
            });
            amountChangesByDate.sort((change1, change2) => {
                return change1.date < change2.date ? -1 : change1.date > change2.date ? 1 : 0;
            });
            let groupAmount: number = 0;
            const amountsByDate: {date: string, amount: number, groupId: string}[] = [];
            amountChangesByDate.forEach((changeByDate) => {
                groupAmount += changeByDate.change;
                const localeDateString = changeByDate.date.toLocaleDateString();
                const found = amountsByDate.some(amount => amount.date === localeDateString);
                if (!found) {
                    amountsByDate.push({date: localeDateString, amount: groupAmount, groupId: group});
                } else {
                    amountsByDate[amountsByDate.length - 1].amount += changeByDate.change;
                }
            })
            amountsByDateAndGroup.push(...amountsByDate);
        })
        return amountsByDateAndGroup;
    }
)

export default operationsSlice.reducer
