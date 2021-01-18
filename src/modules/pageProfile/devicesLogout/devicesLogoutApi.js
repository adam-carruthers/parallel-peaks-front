import {baseUrl} from "../../../misc/api";
import {authenticatedHeaders} from "../../user/userApi";

export const devicesLogoutUrl = `${baseUrl}/api/auth/logout`

export const getDevicesLogoutFetchArgs = token => [
    devicesLogoutUrl,
    {
        method: 'POST',
        headers: authenticatedHeaders(token),
    }
]