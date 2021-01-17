import {authenticatedHeaders} from "../../user/userApi";
import {baseUrl} from "../../../misc/api";

export const deleteAccountUrl = `${baseUrl}/api/auth/user/delete`

export const getDeletePasswordFetchArgs = (password, token) => [
    deleteAccountUrl,
    {
        method: 'DELETE',
        headers: authenticatedHeaders(token),
        body: JSON.stringify({
            old_password: password
        })
    }
]