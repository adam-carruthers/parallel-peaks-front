import {useDispatch, useSelector} from "react-redux";
import {userId, userUsername} from "../user/userSelectors";
import MyDetails from "./myDetailsComponent";
import {useEffect} from "react";
import {userActions} from "../user/userActions";
import MyEntry from "./myEntryComponent";

const PageProfile = () => {
    const username = useSelector(userUsername);
    const usrId = useSelector(userId);

    // On page mount reload the user
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userActions.refresh());
    }, [dispatch])

    return (
        <div className="pp-first-section bg-blue-waves">
            <div className="container pt-3 pb-3">
                <div className="make-children-blocky">
                    <h1 className="pp-box-shadow bg-pastel-yellow p-2 mb-0">
                        <i className="fas fa-user ml-1 mr-2" />
                        User Profile
                    </h1>
                    <span className="bg-pastel-blue ml-3 mt-2">
                        You are logged in as user {username}#{usrId}.
                    </span>
                    <MyDetails/>
                    <MyEntry/>
                </div>
            </div>
        </div>
    );
}

export default PageProfile;