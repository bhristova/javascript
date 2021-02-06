const apiUrl = 'http://localhost:3001/api'; //TODO: get from config
const entityName = 'period'

const getPeriods = () => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/${entityName}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
            }
        }).then(response => resolve(response.json()))
        .catch(err => reject(err));
    });    
};

const createPeriod = (body) => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/${entityName}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
            }
        }).then(response => resolve(response.json()))
        .catch(err => {console.error(err); reject(err)});
    });  
};

const deletePeriod = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/${entityName}/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
            }
        }).then(response => resolve(response.json()))
        .catch(err => reject(err));
    });   
};

const getPeriodStatistics = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/${entityName}/statistics/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`, 
            }
        }).then(response => resolve(response.json()))
        .catch(err => reject(err));
    });   
};

export {getPeriods, createPeriod, deletePeriod, getPeriodStatistics};