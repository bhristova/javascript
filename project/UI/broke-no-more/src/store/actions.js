import {getPeriods, createPeriod, deletePeriod, getPeriodStatistics} from '../api/Period';
import {getAmountLogs, deleteAmountLog, updateAmountLog, createNewAmountLog} from '../api/AmountLog';
import {getCategories, createNewCategory, deleteCategory} from '../api/Category';
import {createUser, login} from '../api/User';

export const LOGOUT = 'LOGOUT';
export const GET_ALL_PERIODS = 'GET_ALL_PERIODS';

export const ADD_PERIOD = 'ADD_PERIOD';
export const REMOVE_PERIOD = 'REMOVE_PERIOD';
export const EDIT_PERIOD = 'EDIT_PERIOD';

export const GET_AMOUNT_LOG = 'GET_AMOUNT_LOG';
export const ADD_AMOUNT_LOG = 'ADD_AMOUNT_LOG';
export const EDIT_AMOUNT_LOG = 'EDIT_AMOUNT_LOG';
export const REMOVE_AMOUNT_LOG = 'REMOVE_AMOUNT_LOG';

export const GET_CHART_DATA = 'GET_CHART_DATA';

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const EDIT_CATEGORY = 'EDIT_CATEGORY';

export const ERROR_GENERATED = 'ERROR_GENERATED';

export const SHOW_NEW_PERIOD_FORM = '';
export const SHOW_NEW_AMOUNT_LOG_FORM = '';
export const SHOW_EDIT_AMOUNT_LOG_FORM = '';
export const SHOW_DELETE_AMOUNT_LOG_FORM = '';

export const ADD_USER = 'ADD_USER';
export const GET_USER = 'GET_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const getAllPeriods = () => {
    return async dispatch => {
        const onSuccess = (success) => {
            dispatch({ type: GET_ALL_PERIODS, allPeriods: success });
        }  

        const onError = (error) => {
            dispatch({ type: ERROR_GENERATED, error });
        }
        
        try {
          const success = await getPeriods();
          return onSuccess(success);
        } catch (error) {
          return onError(error);
        }
    }
}

export const getPeriodAmountLogs = (periodId, endDate, startDate) => {
    return async dispatch => {
        const onSuccess = (success) => {
            dispatch({ type: GET_AMOUNT_LOG, periodId: periodId, periodData: success, startDate: startDate, endDate: endDate });
        }  

        const onError = (error) => {
            dispatch({ type: ERROR_GENERATED, error });
        }
        
        try {
            const result = await getAmountLogs(periodId, endDate, startDate);
            return onSuccess(result);
        } catch (error) {
            return onError(error);
        }
    }
}

export const createAmountLog = (fields) => {
    return async dispatch => {
        const onSuccess = (success) => {
            dispatch({ type: ADD_AMOUNT_LOG, fields: fields });
        }  

        const onError = (error) => {
            dispatch({ type: ERROR_GENERATED, error });
        }
        
        try {
            const result = await createNewAmountLog(fields);
            return onSuccess(result);
        } catch (error) {
            return onError(error);
        }
    }
}

export const editAmountLog = (fields, date, id) => {
    return async dispatch => {
        const onSuccess = (success) => {
            dispatch({ type: EDIT_AMOUNT_LOG, fields: fields, id: id, date: date});
        }  

        const onError = (error) => {
            dispatch({ type: ERROR_GENERATED, error });
        }
        
        try {
            const result = await updateAmountLog(fields, id);
            return onSuccess(result);
        } catch (error) {
            return onError(error);
        }
    }
}

export const removeAmountLog = (id) => {
    return async dispatch => {
        const onSuccess = (success) => {
            dispatch({ type: REMOVE_AMOUNT_LOG, id: id });
        }  

        const onError = (error) => {
            dispatch({ type: ERROR_GENERATED, error });
        }
        
        try {
            const result = await deleteAmountLog(id);
            return onSuccess(result);
        } catch (error) {
            return onError(error);
        }
    }
}


export const getChartData = (periodId) => {
    return async dispatch => {
        const onSuccess = (success) => {
            dispatch({ type: GET_CHART_DATA, chartData: success });
        }  

        const onError = (error) => {
            dispatch({ type: ERROR_GENERATED, error });
        }
        
        try {
            const result = await getPeriodStatistics(periodId);
            return onSuccess(result);
        } catch (error) {
            return onError(error);
        }
    }
}

export const getAllCategories = (periodId) => {
    return async dispatch => {
        const onSuccess = (success) => {
            dispatch({ type: GET_ALL_CATEGORIES, allCategories: success });
        }  

        const onError = (error) => {
            dispatch({ type: ERROR_GENERATED, error });
        }
        
        try {
          const success = await getCategories(periodId);
          return onSuccess(success);
        } catch (error) {
          return onError(error);
        }
    }
}

export const createCategory = (newCategories) => {
    return async dispatch => {
        const onSuccess = (success) => {
            dispatch({ type: ADD_CATEGORY, newCategories: newCategories });
        }  

        const onError = (error) => {
            dispatch({ type: ERROR_GENERATED, error });
        }
        
        try {
            const success = await createNewCategory(newCategories.map(cat => ({id: cat.id, name: cat.Name})));
            return onSuccess(success);
        } catch (error) {
            return onError(error);
        }
    }
}

export const newCategoryInput = (newCategory) => {
    return {
        type: ADD_CATEGORY,
        newCategories: newCategory
    };
}

export const editCategory = (updated) => {
    return {
        type: EDIT_CATEGORY,
        updated: updated
    };
}

export const removeCategory = (id) => {
    return async dispatch => {
        const onSuccess = (success) => {
            dispatch({ type: REMOVE_CATEGORY, id: id });
        }  

        const onError = (error) => {
            dispatch({ type: ERROR_GENERATED, error });
        }
        
        try {
          const success = await deleteCategory(id);
          return onSuccess(success);
        } catch (error) {
          return onError(error);
        }
    }
}

export const registerUser = (data) => {
    return async dispatch => {
        const onSuccess = (success) => {
            dispatch({ type: ADD_USER, fields: data });
        }  

        const onError = (error) => {
            dispatch({ type: ERROR_GENERATED, error });
        }
        
        try {
            const result = await createUser(data);
            return onSuccess(result);
        } catch (error) {
            return onError(error);
        }
    }
}

export const loginUser = (data) => {
    return async dispatch => {
        const onSuccess = (success) => {
            try {
                sessionStorage.setItem('isSessionStorageEnabled', 'value');
                sessionStorage.removeItem('isSessionStorageEnabled');

                sessionStorage.setItem('token', success.token);
                return success;
            } catch (err) {
                ///TODO: let user know session storage is disabled
            }
        }  

        const onError = (error) => {
            dispatch({ type: ERROR_GENERATED, error });
            return error;
        }
        
        try {
            const result = await login(data);
            return onSuccess(result);
        } catch (error) {
            return onError(error);
        }
    }
}

export const showNewPeriodForm = (showForm) => {
    return {
        type: SHOW_NEW_PERIOD_FORM,
        showForm: showForm
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    };
};