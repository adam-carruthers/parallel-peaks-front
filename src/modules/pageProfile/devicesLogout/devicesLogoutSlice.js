import basicRequestSlice from "../../../shared/basicRequest/basicRequestSlice";

export const devicesLogoutId = 'devicesLogoutRequest';

export const {
    reducer: devicesLogoutReducer,
    actions: devicesLogoutActions,
    actionTypes: devicesLogoutActionTypes,
    selectors: devicesLogoutSelectors
} = basicRequestSlice(devicesLogoutId)