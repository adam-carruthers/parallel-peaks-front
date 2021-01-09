const basicRequestSelectors = id => ({
    status: state => state[id].status,
    error: state => state[id].error
})

export default basicRequestSelectors;