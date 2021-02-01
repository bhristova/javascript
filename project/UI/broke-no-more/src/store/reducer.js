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
    let newData = [];
    switch (action.type) {
        case actionTypes.AUTH: 
            return {
                ...state,
                allPeriods: [...state.allPeriods.map(elem => ({...elem}))],
                periodData: [...state.periodData.map(elem => [...elem])],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
                isAuthenticated: action.isAuthenticated,
                authToken: action.authToken
            }
        case actionTypes.GET_ALL_PERIODS:
            return {
                ...state,
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
                allPeriods: action.allPeriods,
                periodData: [],
                periodId: ''
            }
        case actionTypes.ADD_PERIOD:
            return {
                ...state,
                periodData: [...state.periodData.map(elem => [...elem])],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
                allPeriods: [...state.allPeriods.map(elem => ({...elem})), action.newPeriod]
            }
        case actionTypes.REMOVE_PERIOD:
            const newPeriods = [...state.allPeriods.map(elem => ({...elem}))];
            return {
                ...state,
                periodData: [...state.periodData.map(elem => [...elem])],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
                allPeriods: newPeriods.filter(period => period.id !== action.periodId)
            }
        case actionTypes.GET_AMOUNT_LOG:
            return {
                ...state,
                allPeriods: [...state.allPeriods.map(elem => ({...elem}))],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
                periodId: action.periodId,
                periodData: [...state.periodData.map(elem => [...elem]), ...action.periodData],
                startDate: action.startDate,
                endDate: action.endDate
            }
        case actionTypes.ADD_AMOUNT_LOG:
            newData = [...state.periodData.map(elem => [...elem])];
            const dataIndex = newData.findIndex(elem => areDatesEqual(elem[0].date, action.fields.date));
            if(dataIndex < 0) {
                const newLogData = [action.fields];
                newData = [...newData, newLogData];
            } else {
                newData[dataIndex] = [...newData[dataIndex], action.fields];
            }
            return {
                ...state,
                allPeriods: [...state.allPeriods.map(elem => ({...elem}))],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
                periodData: newData
            }
        case actionTypes.EDIT_AMOUNT_LOG:
            newData = [...state.periodData.map(elem => [...elem])];
            const elementIndex = newData.findIndex(elem => areDatesEqual(elem[0].date, action.date));
            const newElement = newData[elementIndex];

            const editElementIndex = newElement.findIndex(elem => elem.id === action.id);
            const editElement = newElement[editElementIndex];

            Object.keys(action.fields).forEach(key => editElement[key] = action.fields[key]);

            newElement[editElementIndex] = editElement;
            newData[elementIndex] = newElement;

            return {
                ...state,
                allPeriods: [...state.allPeriods.map(elem => ({...elem}))],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
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
                allPeriods: [...state.allPeriods.map(elem => ({...elem}))],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
                periodData: periodData
            }
        
        case actionTypes.SHOW_NEW_PERIOD_FORM:
            return {
                ...state,
                allPeriods: [...state.allPeriods.map(elem => ({...elem}))],
                periodData: [...state.periodData.map(elem => [...elem])],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {
                    ...state.uiState,
                    showNewPeriodForm: action.showForm
                }
            }
        case actionTypes.SHOW_NEW_AMOUNT_LOG_FORM:
            return {
                ...state,
                allPeriods: [...state.allPeriods.map(elem => ({...elem}))],
                periodData: [...state.periodData.map(elem => [...elem])],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {
                    ...state.uiState,
                    showNewAmountLogForm: action.showForm
                }
            }
        case actionTypes.SHOW_EDIT_AMOUNT_LOG_FORM:
            return {
                ...state,
                allPeriods: [...state.allPeriods.map(elem => ({...elem}))],
                periodData: [...state.periodData.map(elem => [...elem])],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {
                    ...state.uiState,
                    showEditAmountLogForm: action.showForm
                }
            }
        case actionTypes.SHOW_DELETE_AMOUNT_LOG_FORM:
            return {
                ...state,
                allPeriods: [...state.allPeriods.map(elem => ({...elem}))],
                periodData: [...state.periodData.map(elem => [...elem])],
                chartData: [...state.chartData.map(elem => ({...elem}))],
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
                allPeriods: [...state.allPeriods.map(elem => ({...elem}))],
                periodData: [...state.periodData.map(elem => [...elem])],
                uiState: {...state.uiState},
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