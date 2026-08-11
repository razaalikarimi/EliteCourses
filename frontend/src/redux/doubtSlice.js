import { createSlice } from "@reduxjs/toolkit"

const doubtSlice = createSlice({
  name: "doubt",
  initialState: {
    doubts: [],
    activeDoubt: null,
  },
  reducers: {
    setDoubts: (state, action) => {
      state.doubts = action.payload
    },
    setActiveDoubt: (state, action) => {
      state.activeDoubt = action.payload
    },
    addDoubt: (state, action) => {
      state.doubts.unshift(action.payload)
    },
    updateDoubt: (state, action) => {
      const index = state.doubts.findIndex(d => d._id === action.payload._id)
      if (index !== -1) state.doubts[index] = action.payload
      if (state.activeDoubt?._id === action.payload._id) {
        state.activeDoubt = action.payload
      }
    },
    clearDoubts: (state) => {
      state.doubts = []
      state.activeDoubt = null
    },
    removeDoubt: (state, action) => {
      state.doubts = state.doubts.filter(d => d._id !== action.payload)
      if (state.activeDoubt?._id === action.payload) {
        state.activeDoubt = null
      }
    },
  },
})

export const { setDoubts, setActiveDoubt, addDoubt, updateDoubt, clearDoubts, removeDoubt } = doubtSlice.actions
export default doubtSlice.reducer
