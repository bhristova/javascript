const apiUrl = 'http://localhost:3001';

const getCategories = () => {
    return new Promise((resolve, reject) => {
        fetch(`${apiUrl}/api/category`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        }).then(response => resolve(response.json()))
        .catch(err => reject(err));
    });    
};

export {getCategories};