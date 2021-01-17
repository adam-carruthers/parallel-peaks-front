import basicRequestSlice from "../../../shared/basicRequest/basicRequestSlice";

export const deleteAccountId = 'deleteAccountRequest';

export const {
    reducer: deleteAccountReducer,
    actions: deleteAccountActions,
    actionTypes: deleteAccountActionTypes,
    selectors: deleteAccountSelectors
} = basicRequestSlice(deleteAccountId);