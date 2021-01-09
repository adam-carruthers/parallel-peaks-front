import basicRequestSlice from "../../shared/basicRequest/basicRequestSlice";

export const loginModuleId = 'loginRequest';

export const {
    reducer: loginReducer,
    actionTypes: loginActionTypes,
    actions: loginActions,
    selectors: loginSelectors
} = basicRequestSlice(loginModuleId)