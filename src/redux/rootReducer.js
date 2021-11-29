export function rootReducer(state, action) {
    switch(action.type) {
    
        case 'TABLE_RESIZE':
            debugger
            const prevState = state.colState || {}
            prevState[action.data.id] = action.data.value
            return {...state, colState: prevState}
        default: return state
    }

    return state
}