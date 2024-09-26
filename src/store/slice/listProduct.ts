import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IListProduct } from '../modules'
import { storesApi } from '../../axios'

type ProductState = {
	loading: boolean
	error: null | string
	product: IListProduct[]
}

const initialState: ProductState = {
	error: null,
	loading: false,
	product: [],
}

export const fetchByGetProductList = createAsyncThunk<IListProduct[], number, { rejectValue: string }>(
	'listProduct/fetchByGetProductList',
	async (id, { rejectWithValue }) => {
		const res = await storesApi.getListProduct(id)
		// console.log(res)

		if (res.status !== 200) {
			return rejectWithValue('Server Error')
		}
		return res.data as IListProduct[]
	})

export const getchByDeleteProduct = createAsyncThunk<number, { id: number, token: string }, { rejectValue: string }>(
	'listProduct/getchByDeleteProduct',
	async (data, { rejectWithValue }) => {
		const res = await storesApi.deleteProduct(data)
		// console.log(res);
		if (res.status !== 204) {
			return rejectWithValue('Server Error')
		}
		return data.id
	}
)

const listProduct = createSlice({
	name: 'listProduct',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(fetchByGetProductList.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchByGetProductList.fulfilled, (state, action) => {
			state.product = action.payload
			state.loading = false
		})
		addCase(fetchByGetProductList.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('400')) {
				state.error = 'Упс что то пошло не так!'
			}
		})
		// ===========================================================
		addCase(getchByDeleteProduct.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(getchByDeleteProduct.fulfilled, (state, action) => {
			state.loading = false
			if (action.payload) {
				state.product = state.product.filter(item => item.id !== action.payload)
			}
		})
		addCase(getchByDeleteProduct.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('400')) {
				state.error = 'Упс что то пошло не так!'
			}
		})
	},
})

export default listProduct.reducer
