import {combineReducers} from "redux";
import userReducer from "../modules/user/userReducer";
import {connectRouter} from "connected-react-router";

export default function createRootReducer(history) {
    return combineReducers({
        user: userReducer,
        router: connectRouter(history)
    })
}