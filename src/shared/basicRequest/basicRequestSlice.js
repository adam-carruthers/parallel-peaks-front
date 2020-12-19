import basicRequestActionTypes from "./basicRequestActionTypes";
import basicRequestReducer from "./basicRequestReducer";

const basicRequestSlice = id => {
    let actions = basicRequestActionTypes(id);
    let reducer = basicRequestReducer(actions);

    return {
        reducer,
        ...actions
    }
}

export default basicRequestSlice;