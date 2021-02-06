const apiUrl = 'http://localhost:3001/api'; //TODO: get from config
const entityName = 'user'

const createUser = (body) => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/${entityName}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Content-Type': 'application/json'
            }
        }).then(response => resolve(response.json()))
        .catch(err => {console.error(err); reject(err)});
    });  
};

const login = (body) => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/${entityName}/login`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Content-Type': 'application/json',
            }
        }).then(response => resolve(response.json()))
        .catch(err => {console.error(err); reject(err)});
    });  
};

export {createUser, login};