import * as actionTypes from './actions';
import {areDatesEqual} from '../utils/Date';

const initialState = {
    authToken: '',
    isAuthenticated: false,
    allPeriods: [],
    periodId: '',
    startDate: '',
    endDate: '',
    periodData: [],
    chartData: [],
    amountUsed: 0,
    amountLeft: 0,
    uiState: {
        showNewPeriodForm: false,
        showNewAmountLogForm: false,
        showEditAmountLogForm: false,
        showDeleteAmountLogForm: false,
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH: 
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                authToken: action.authToken
            }
        case actionTypes.GET_ALL_PERIODS:
            return {
                ...state,
                allPeriods: action.allPeriods,
                periodData: [],
                periodId: ''
            }
        case actionTypes.ADD_PERIOD:
            return {
                ...state,
                allPeriods: [
                    ...state.allPeriods,
                    action.newPeriod
                ]
            }
        case actionTypes.REMOVE_PERIOD:
            return {
                ...state,
                allPeriods: [
                    ...state.allPeriods.filter(period => period.id !== action.periodId)
                ]
            }
        case actionTypes.GET_AMOUNT_LOG:
            return {
                ...state,
                periodId: action.periodId,
                periodData: [...state.periodData, ...action.periodData],
                startDate: action.startDate,
                endDate: action.endDate
            }
        case actionTypes.ADD_AMOUNT_LOG:
            let newData = [...state.periodData];
            let dataIndex = newData.findIndex(elem => areDatesEqual(elem[0].date, action.fields.date));
            if(dataIndex < 0) {
                const newLogData = [action.fields];
                newData = [...newData, newLogData];
            } else {
                newData[dataIndex] = [...newData[dataIndex], action.fields];
            }
            return {
                ...state,
                periodData: newData
            }
        case actionTypes.REMOVE_AMOUNT_LOG:
            const periodData = state.periodData.map(data => {
                if (areDatesEqual(data[0].date)) { 
                    return [...data.filter(elem => elem.id !== action.id)];
                }
                return [...data];
            });
            return {
                ...state,
                periodData: periodData
            }
        
        case actionTypes.SHOW_NEW_PERIOD_FORM:
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    showNewPeriodForm: action.showForm
                }
            }
        case actionTypes.SHOW_NEW_AMOUNT_LOG_FORM:
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    showNewAmountLogForm: action.showForm
                }
            }
        case actionTypes.SHOW_EDIT_AMOUNT_LOG_FORM:
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    showEditAmountLogForm: action.showForm
                }
            }
        case actionTypes.SHOW_DELETE_AMOUNT_LOG_FORM:
            return {
                ...state,
                uiState: {
                    ...state.uiState,
                    showDeleteAmountLogForm: action.showForm
                }
            }
        case actionTypes.GET_CHART_DATA:
            const amountUsed = action.chartData.reduce((acc, cur) => acc + cur.actualAmount, 0)
            const amountLeft = action.chartData.reduce((acc, cur) => acc + cur.expectedAmount, 0) - amountUsed;
            return {
                ...state,
                chartData: action.chartData,
                amountUsed: amountUsed,
                amountLeft: amountLeft
            }
        default:
            return state;
    };
        return {
            authToken: 'asd',
            isAuthenticated: true,
            periodId: 'resr'
        }
}
export default reducer;