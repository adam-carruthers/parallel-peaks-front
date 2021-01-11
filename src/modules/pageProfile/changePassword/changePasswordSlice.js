import basicRequestSlice from "../../../shared/basicRequest/basicRequestSlice";

export const changePasswordId = 'changePasswordRequest';

export const {
    reducer: changePasswordReducer,
    actions: changePasswordActions,
    actionTypes: changePasswordActionTypes,
    selectors: changePasswordSelectors
} = basicRequestSlice(changePasswordId);