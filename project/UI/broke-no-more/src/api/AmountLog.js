const apiUrl = 'http://localhost:3001';

const getAmountLogs = (lastDate) => {
    const lastDateString = lastDate ? `/lastDate=${lastDate}` : '';
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/api/amountLog${lastDateString}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        }).then(response => resolve(response.json()))
        .catch(err => reject(err));
    });    
};

const deleteAmountLog = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/api/amountLog/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        }).then(response => resolve(response.json()))
        .catch(err => reject(err));
    });   
};

const updateAmountLog = (body, id) => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/api/amountLog/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Content-Type': 'application/json'
            }
        }).then(response => resolve(response.json()))
        .catch(err => reject(err));
    });   
};

const createAmountLog = (body) => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/api/amountLog`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Content-Type': 'application/json'
            }
        }).then(response => resolve(response.json()))
        .catch(err => reject(err));
    });  
}

export {getAmountLogs, deleteAmountLog, updateAmountLog, createAmountLog};