
export const login = async (username, password) => {
    return await sendRequest('/login', 'POST', JSON.stringify({ username, password }));
}

export const logout = async () => {
    return await sendRequest('/logout', 'POST');
}

export const getUser = async () => {
    return await sendRequest('/getUser', 'GET');
}

export const sendRequest = async (endpoint, method, body = '', additionalHeaders = {}) => {
    const request = { method: method, headers: { 'Content-Type': 'application/json', ...additionalHeaders }};
    if(body) {
        request.body = body;
    }
    try {
        let rawResponse = await fetch(endpoint, request);
        if (rawResponse.status === 401) {
            return {data: null, msg: null, error: 'unauthorized'}
        }
        return await rawResponse.json();
    } catch (ex) {
        console.log('error here ');
        return {data: null, msg: null, error: ex}
    }
}


