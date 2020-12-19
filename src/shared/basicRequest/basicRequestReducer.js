const initialState = {
    status: 'idle'
}

const basicRequestReducer = actionTypes => (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.setIdle:
            return {status: 'idle'};
        case actionTypes.start:
            return {status: 'loading'};
        case actionTypes.success:
            return {status: 'success'};
        case actionTypes.error:
            return {
                status: 'error',
                error: action.error
            };
        default:
            return state;
    }
}

export default basicRequestReducer;