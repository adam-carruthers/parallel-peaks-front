import {baseUrl} from "../../../misc/api";
import {authenticatedHeaders} from "../../user/userApi";

export const changePasswordUrl = `${baseUrl}/api/auth/password/change`;

export const getChangePasswordFetchArgs = (payload, token) => [
    changePasswordUrl,
    {
        method: 'POST',
        headers: authenticatedHeaders(token),
        body: JSON.stringify(payload)
    }
]
