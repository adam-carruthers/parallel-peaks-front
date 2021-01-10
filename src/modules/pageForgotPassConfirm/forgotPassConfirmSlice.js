import basicRequestSlice from "../../shared/basicRequest/basicRequestSlice";

export const forgotPassConfirmId = 'forgotPassConfirmRequest';

export const {
    reducer: forgotPassConfirmReducer,
    actions: forgotPassConfirmActions,
    actionTypes: forgotPassConfirmActionTypes,
    selectors: forgotPassConfirmSelectors
} = basicRequestSlice(forgotPassConfirmId);
