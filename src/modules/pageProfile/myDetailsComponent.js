import {useSelector} from "react-redux";
import {getUser} from "../user/userSelectors";
import ChangePassword from "./changePassword/changePasswordComponent";
import DeleteAccount from "./deleteAccount/deleteAccountComponent";
import DevicesLogout from "./devicesLogout/devicesLogoutComponent";

const ADetail = ({name, value, colBreakpoint="col-12 col-md"}) => (
    <div className={colBreakpoint}>
        <b>{name}:</b> <span className="font-sans-serif d-block d-md-inline-block">{value || "Not Given"}</span>
    </div>
)

const MyDetails = () => {
    const {username, email, first_name, last_name, is_staff, is_matcher, is_moderator} = useSelector(getUser);

    const permissions = []
    if(is_staff) permissions.push("Staff");
    if(is_matcher) permissions.push("Moderator");
    if(is_moderator) permissions.push("Moderator")

    const permissionString = permissions.join(", ")

    return (
        <div className="pp-dashed-border mt-3 p-2 bg-white">
            <h5>
                <span className="mr-2">Your Details</span>
                <small className="font-sans-serif font-italic d-inline-block">
                    To edit this information please <a href="mailto:needTODO">email us</a>.
                    All information here will only be shared with your match and site staff, if they need to email you.
                </small>
            </h5>
            <div className="row">
                <ADetail name="Username" value={username}/>
                <ADetail name="Email" value={email}/>
            </div>
            <div className="row">
                <ADetail name="First name" value={first_name} colBreakpoint={"col-6"}/>
                <ADetail name="Last name" value={last_name} colBreakpoint={"col-6"}/>
            </div>
            {permissionString && (
                <div className="row">
                    <ADetail name="You have permissions" value={permissionString}/>
                </div>
            )}

            <div role="group" className="btn-group pp-box-shadow-small mt-2">
                <ChangePassword/>
                <DeleteAccount/>
                <DevicesLogout/>
            </div>
        </div>
    )
}
// TODO: Add email information

export default MyDetails;