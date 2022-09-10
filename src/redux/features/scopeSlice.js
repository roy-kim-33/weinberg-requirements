import { createSlice } from '@reduxjs/toolkit'

export const scopeSlice = createSlice({
  name: 'scope',
  initialState: {
    subject: null,
    search: null,
  },
  reducers: {
    emptyScope: (state) => {
        // used to backtrack on both subject and search text
        state.subject = ''
        state.search = ''
    },
    setSubject: (state, action) => {
        state.subject = action.payload
    },
    setSearch: (state, action) => {
        state.search = state.search.concat(action.payload)
        // add feature to wait for user to finish typing before filtering
    },
    emptySearch: (state) => {
        // used to empty search text only
        state.search = ''
    }
  },
})

export const { emptyScope, setSubject, setSearch, emptySearch } = scopeSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const setSearchAsync = (text) => (dispatch) => {
  setTimeout(() => {
    dispatch(setSearch(text))
  }, 1000)
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectScopeSubject = (state) => state.scope.subject
export const selectScopeSearch = (state) => state.scope.search

export default scopeSlice.reducer
