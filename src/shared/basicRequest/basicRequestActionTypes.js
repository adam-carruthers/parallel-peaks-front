const basicRequestActionTypes = id => ({
    setIdle: `${id}/REQ_SET_IDLE`,
    start: `${id}/REQ_START`,
    success: `${id}/REQ_SUCCESS`,
    error: `${id}/REQ_ERROR`
})

export default basicRequestActionTypes;