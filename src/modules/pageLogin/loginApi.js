import {baseUrl} from "../../misc/api";

export const loginUrl = `${baseUrl}/login`;

export const getLoginFetchArgs = (username, password) => [
    loginUrl,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }
]