import basicRequestActionTypes from "./basicRequestActionTypes";
import basicRequestReducer from "./basicRequestReducer";
import basicRequestActions from "./basicRequestActions";
import basicRequestSelectors from "./basicRequestSelectors";

const basicRequestSlice = id => {
    const actionTypes = basicRequestActionTypes(id);
    const actions = basicRequestActions(actionTypes);
    const reducer = basicRequestReducer(actionTypes);
    const selectors = basicRequestSelectors(id);

    return {
        reducer,
        actionTypes,
        actions,
        selectors
    }
}

export default basicRequestSlice;