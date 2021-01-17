import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import Noty from "noty";
import {getConfirmEmailFetchArgs} from "./confirmEmailApi";
import {useSelector} from "react-redux";

const PageConfirmEmail = () => {
    const history = useHistory();
    const pathname = useSelector(state => state.router.location.pathname)
    const token = useSelector(state => state.router.location.query?.token);

    useEffect(() => {
        if(pathname !== "/confirm-email") {
            // The user has changed page and the token will be gone which will cause an error.
            // We don't want an error we just want to wait until the next render where this page will unmount.
            return;
        }

        if(!token){
            new Noty({
                type: 'error',
                text: "You don't have the needed details to confirm the email. Did you make sure to access that page by a link?",
                layout: 'bottomRight',
                timeout: 3000
            }).show();
            history.push('/')
            return;
        }

        (async () => {
            try {
                const response = await fetch(...getConfirmEmailFetchArgs(token));
                const json = await response.json();

                if(response.status !== 200) {
                    console.error(json);
                    let notyErrorText;
                    if(response.status === 404) {
                        notyErrorText = "The token you used was incorrect, looks like it might have been used already or have expired? Please try logging in to get a new token."
                    } else {
                        notyErrorText = "An unexpected error occurred, please try again later."
                    }
                    new Noty({
                        type: 'error',
                        text: notyErrorText,
                        layout: 'bottomRight',
                        timeout: 6000
                    }).show();
                } else {
                    new Noty({
                        type: 'success',
                        text: "Success! The email has been verified, you can now login.",
                        layout: 'bottomRight',
                        timeout: 4000
                    }).show();
                }
            } catch (e) {
                console.error(e);
                new Noty({
                    type: 'error',
                    text: "An unexpected error occurred, is your internet okay? Please try clicking the link again later.",
                    layout: 'bottomRight',
                    timeout: 4000
                }).show();
            }
            history.push('/');
        })()
    }, [token, history])

    return (
        <div className="pp-first-section bg-blue-waves d-flex flex-column align-items-center">
            <div className="flex-grow-1 p-3"/>
            <div className="bg-white pp-box-shadow p-4">
                <h1 className="font-weight-bolder">Verifying your email now... <i className="fas fa-sync fa-spin ml-2"/></h1>
            </div>
            <div className="flex-grow-1 p-3"/>
        </div>
    )
}

export default PageConfirmEmail;