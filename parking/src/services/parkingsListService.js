// import suburbs from 'json!../static/cities.json';
const jsonDump = require('../static/carparks.json');

export const parkingsListService = {
    getAll,
    
};

function getAll() {
    const requestOptions = {
        method: 'GET',
    };
    return new Promise(resolve => {
        // console.log(jsonDump);
        // Resolve after a timeout so we can see the loading indicator
        // const apiUrl = 'http://ec2-35-175-244-104.compute-1.amazonaws.com:8080/api/carparks/';
        // resolve({ parkings: jsonDump });
        fetch('https://backend.emparkservice.com/api/carparks', requestOptions).then(
            // handleResponse);
            (response) => {
                console.log('response ok -->', response.ok);
                if (!response.ok) {
                    const error = response.statusText;
                    return Promise.reject(error);
                }
                return response.json()
            }).then((data) => {
                resolve({
                    parkings: data
                });
        });
    });
    // return fetch(`${config.apiUrl}/parkings`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}