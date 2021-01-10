import {baseUrl} from "../../misc/api";

export const forgotPassConfirmUrl = `${baseUrl}/api/auth/password/reset/confirm`

export const getForgotPassConfirmFetchArgs = payload => [
    forgotPassConfirmUrl,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
]