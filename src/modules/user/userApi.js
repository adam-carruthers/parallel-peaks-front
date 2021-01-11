import {baseUrl} from "../../misc/api";

export const userRefreshUrl = `${baseUrl}/api/auth/user`;

export const authenticatedHeaders = token => ({
    "Content-Type": "application/json",
    Authorization: `Token ${token}`
})

export const getUserRefreshFetchArgs = token => [
    userRefreshUrl,
    {
        headers: authenticatedHeaders(token)
    }
]