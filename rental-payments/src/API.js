const BASED_URL = "https://hiring-task-api.herokuapp.com/v1/leases/"

export function fetchPaymentData (id) {
    const url = `${BASED_URL}${id}`;
    return fetch(url).then(response=>{return response.json()})
}