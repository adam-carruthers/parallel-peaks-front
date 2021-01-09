import {baseUrl} from "../../../misc/api";

export const forgotPasswordUrl = `${baseUrl}/api/auth/password/reset`;

export const getForgotPasswordFetchArgs = email => [
    forgotPasswordUrl,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    }
]