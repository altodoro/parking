const jsonDump = require('../static/rates.json');

export const parkingFaresService = {
    getAll,
    createFare,
};

function getAll(parkZoneID) {
    const requestOptions = {
        method: 'GET',
    };
    return new Promise(resolve => {
        const apiUrl = `https://backend.emparkservice.com/api/carparks/${parkZoneID}/fares`
        fetch(apiUrl, requestOptions).then(
            (response) => {
                if (!response.ok) {
                    const error = response.statusText;
                    return Promise.reject(error);
                }
                return response.json()
            }).then((data) => {
                resolve({
                    fares: data
                });
        });
    });
}

function createFare(parkZoneID, fareObj) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(fareObj),
    };
    const apiUrl = `https://backend.emparkservice.com/api/carparks/${parkZoneID}/fares`;
    return new Promise(resolve => {
        fetch(apiUrl, requestOptions).then((response) => {
            console.log(response);
            if (!response.ok) {
                const error = response.statusText;
                return Promise.reject(error);
            }
            resolve(true);
        })
    })
}