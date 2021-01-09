const basicRequestActions = actionTypes => ({
    setIdle: () => ({type: actionTypes.setIdle}),
    start: payload => ({type: actionTypes.start, payload}),
    success: payload => ({type: actionTypes.success, payload}),
    error: error => ({type: actionTypes.error, error})
})

export default basicRequestActions;