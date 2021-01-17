import {baseUrl} from "../../misc/api";

export const confirmEmailUrl = `${baseUrl}/api/auth/verify-email`

export const getConfirmEmailFetchArgs = token => [
    confirmEmailUrl,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "key": token
        })
    }
]