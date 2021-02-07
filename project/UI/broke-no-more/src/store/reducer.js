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
    allCategories: [],
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
        case actionTypes.LOGOUT: 
            return initialState
        case actionTypes.GET_ALL_PERIODS:
            return {
                ...state,
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
                allPeriods: action.allPeriods,
                periodData: [],
                periodId: '',
                allCategories: [...state.allCategories.map(elem => ({...elem}))] 
            }
        case actionTypes.ADD_PERIOD:
            return {
                ...state,
                periodData: [...state.periodData.map(elem => [...elem])],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
                allPeriods: [...state.allPeriods.map(elem => ({...elem})), action.newPeriod],
                allCategories: [...state.allCategories.map(elem => ({...elem}))] 
            }
        case actionTypes.REMOVE_PERIOD:
            const newPeriods = [...state.allPeriods.map(elem => ({...elem}))];
            return {
                ...state,
                periodData: [...state.periodData.map(elem => [...elem])],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
                allPeriods: newPeriods.filter(period => period.id !== action.periodId),
                allCategories: [...state.allCategories.map(elem => ({...elem}))] 
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
                endDate: action.endDate,
                allCategories: [...state.allCategories.map(elem => ({...elem}))] 
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
                periodData: newData,
                allCategories: [...state.allCategories.map(elem => ({...elem}))] 
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
                periodData: newData,
                allCategories: [...state.allCategories.map(elem => ({...elem}))] 
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
                periodData: periodData,
                allCategories: [...state.allCategories.map(elem => ({...elem}))] 
            }
        case actionTypes.GET_ALL_CATEGORIES:
            return {
                ...state,
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
                allPeriods: [...state.allPeriods.map(elem => ({...elem}))],
                periodData: [],
                periodId: '',
                allCategories: action.allCategories
            }
        case actionTypes.ADD_CATEGORY:
            const newCategories = Array.isArray(action.newCategories) ? action.newCategories : [action.newCategories];
            newData = [...state.allCategories, ...newCategories];
            return {
                ...state,
                allPeriods: [...state.allPeriods.map(elem => ({...elem}))],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
                periodData: [...state.periodData.map(elem => ({...elem}))],
                allCategories: newData
            }
        case actionTypes.REMOVE_CATEGORY:
            newData = [...state.allCategories.filter(elem => elem.id !== action.id)];
            return {
                ...state,
                allPeriods: [...state.allPeriods.map(elem => ({...elem}))],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
                periodData: [...state.periodData.map(elem => ({...elem}))],
                allCategories: newData
            }
        case actionTypes.EDIT_CATEGORY:
            newData = [...state.allCategories.map(elem => ({...elem}))];
            const categoryIndex = newData.findIndex(cat => cat.id === action.updated.id);
            newData[categoryIndex] = {
                ...newData[categoryIndex],
                Name: action.updated.name,
                contenteditable: true
            };

            return {
                ...state,
                allPeriods: [...state.allPeriods.map(elem => ({...elem}))],
                chartData: [...state.chartData.map(elem => ({...elem}))],
                uiState: {...state.uiState},
                periodData: [...state.periodData.map(elem => ({...elem}))],
                allCategories: newData
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
                },
                allCategories: [...state.allCategories.map(elem => ({...elem}))] 
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
                },
                allCategories: [...state.allCategories.map(elem => ({...elem}))] 
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
                },
                allCategories: [...state.allCategories.map(elem => ({...elem}))] 
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
                },
                allCategories: [...state.allCategories.map(elem => ({...elem}))] 
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
                amountLeft: amountLeft,
                allCategories: [...state.allCategories.map(elem => ({...elem}))] 
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