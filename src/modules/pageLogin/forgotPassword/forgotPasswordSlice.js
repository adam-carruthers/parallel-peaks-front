import basicRequestSlice from "../../../shared/basicRequest/basicRequestSlice";

export const forgotPasswordId = 'forgotPasswordRequest';

export const {
    reducer: forgotPasswordReducer,
    actions: forgotPasswordActions,
    actionTypes: forgotPasswordActionTypes,
    selectors: forgotPasswordSelectors
} = basicRequestSlice(forgotPasswordId);