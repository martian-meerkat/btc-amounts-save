import { AnyAction, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit'
import { IOperationData } from '../../interfaces/IOperation'
import { RootState } from '../store'
import { btcDeposit, btcWithdrawal, getAllOperations } from '../../services/operations.service'

export type OperationsState = {
    loading: boolean,
    data: IOperationData[]
};

const initialState: OperationsState = {loading: false, data: []};

export const operationsSlice = createSlice({
    name: 'operations',
    initialState: initialState,
    reducers: {
        loading: (state) => {
            return {...state, loading: true}
        },
        fetchOperations: (_state, action: PayloadAction<IOperationData[]>) => {
            return {loading: false, data: action.payload};
        },
        deposit: (state, action: PayloadAction<IOperationData>) => {
            return {loading: false, data: [...state.data, action.payload]};
        },
        withdrawal: (state, action: PayloadAction<IOperationData>) => {
            return {loading: false, data: [...state.data, action.payload]};
        }
    }
})

const { loading, fetchOperations, deposit, withdrawal } = operationsSlice.actions

export const fetchOperationsIfNeeded = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    console.log('fetchOperationsIfNeeded');
    dispatch(loading);
    const response = await getAllOperations();
    dispatch(fetchOperations(response.data));
}

export const depositRequest = (amount: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    const response = await btcDeposit(amount, getState);
    dispatch(deposit(response.data));
}

export const withdrawalRequest = (amount: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    const response = await btcWithdrawal(amount, getState);
    dispatch(withdrawal(response.data));
}

export const selectAllOperations = (state: RootState) => state.operations

export default operationsSlice.reducer
