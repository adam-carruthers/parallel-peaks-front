import basicRequestSlice from "../../../shared/basicRequest/basicRequestSlice";

export const forgotModuleId = 'forgotPasswordRequest';

export const {
    reducer: forgotPasswordReducer,
    actions: forgotPasswordActions,
    actionTypes: forgotPasswordActionTypes,
    selectors: forgotPasswordSelectors
} = basicRequestSlice(forgotModuleId)