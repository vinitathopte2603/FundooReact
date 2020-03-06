
const postReducer = (state = [], action) => {
    switch (action.type) {
        case 'SEARCH':
            return state = action.data;
        default:
            return state;
    }
}
export default postReducer