import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IInfo, IListProduct } from '../modules'
import { storesApi } from '../../axios'

type ProductState = {
    loading: boolean
    error: null | string
    info: null | IInfo
}

const initialState: ProductState = {
    error: null,
    loading: false,
    info: null
}

export const fetchByCompanyInfo = createAsyncThunk<IInfo, void, { rejectValue: string }>(
    'info/fetchByCompanyInfo',
    async (_, { rejectWithValue }) => {
        const res = await storesApi.getCompanyInfo()
        // console.log(res)

        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data[0] as IInfo
    })

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(fetchByCompanyInfo.pending, state => {
            state.loading = true
            state.error = null
        })
        addCase(fetchByCompanyInfo.fulfilled, (state, action) => {
            state.info = action.payload
            state.loading = false
        })
        addCase(fetchByCompanyInfo.rejected, (state) => {
            state.loading = false
            state.error = 'Упс что то пошло не так!'
        })
        // ===========================================================
    },
})

export default infoSlice.reducer
