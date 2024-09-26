import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { storesApi } from '../../axios'
import {
	ICategory,
	IForAddProduct,
	IForChangeProduct,
	ProfileCardModules,
} from '../modules'

type UserState = {
	loading: boolean
	reboot: boolean
	error: null | string
	category: ICategory[]
	profileCard: ProfileCardModules[]
	detail_card: ProfileCardModules | null
}

const initialState: UserState = {
	error: null,
	loading: false,
	reboot: false,
	category: [],
	profileCard: [],
	detail_card: null,
}

// Получение список категории
export const fetchByAllCategory = createAsyncThunk<
	ICategory[],
	void,
	{ rejectValue: string }
>('product/fetchByAllCategory', async (_, { rejectWithValue }) => {
	const res = await storesApi.getCategory()
	// console.log(res)
	if (res.status !== 200) {
		return rejectWithValue('Server Error')
	}
	return res.data
})

// Для добавления карточек
export const fetchByAddNewCard = createAsyncThunk<
	void,
	IForAddProduct,
	{ rejectValue: string }
>('product/fetchByAddNewCard', async (forProductCard, { rejectWithValue }) => {
	const res = await storesApi.AddNewProduct(forProductCard)
	// console.log(res)
	if (res.status !== 201) {
		return rejectWithValue('Server error')
	}
})
// Для изменение карточек
export const fetchByChangeCard = createAsyncThunk<
	void,
	IForChangeProduct,
	{ rejectValue: string }
>('product/fetchByChangeCard', async (forProductCard, { rejectWithValue }) => {
	const res = await storesApi.changeProduct(forProductCard)
	// console.log(res)
	if (res.status !== 200) {
		return rejectWithValue('Server error')
	}
})

// Для детального просмотра карточек
export const fetchByGetDetailCard = createAsyncThunk<
	ProfileCardModules,
	number,
	{ rejectValue: string }
>('profile/fetchByGetDetailCard', async (id, { rejectWithValue }) => {
	const res = await storesApi.getDetailView(id)
	// console.log(res)
	if (res.status !== 200) {
		return rejectWithValue('Server Error')
	}
	return res.data as ProfileCardModules
})

const addProductSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		toggleReboot(state, action: PayloadAction<boolean>) {
			state.reboot = action.payload
		},
		changeError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
	},
	extraReducers: ({ addCase }) => {
		addCase(fetchByAllCategory.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchByAllCategory.fulfilled, (state, action) => {
			state.category = action.payload
			state.loading = false
		})
		addCase(fetchByAllCategory.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('400')) {
				state.error = 'Упс что то пошло не так!'
			}
		})
		// =======================
		addCase(fetchByAddNewCard.pending, state => {
			state.loading = true
			state.error = null
		})

		addCase(fetchByAddNewCard.fulfilled, (state, action) => {
			state.reboot = true
			state.loading = false
		})

		addCase(fetchByAddNewCard.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('40')) {
				state.error = 'Упс что-то пошло не так!'
			}
		})

		// =======================
		addCase(fetchByGetDetailCard.pending, state => {
			state.loading = true
			state.error = null
		})

		addCase(fetchByGetDetailCard.fulfilled, (state, action) => {
			state.loading = false
			state.detail_card = action.payload
			// state.reboot = true
		})

		addCase(fetchByGetDetailCard.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('404')) {
				state.error = 'Продукт не найден!'
			}
		})
		// =======================
		addCase(fetchByChangeCard.pending, state => {
			state.loading = true
			state.error = null
		})

		addCase(fetchByChangeCard.fulfilled, (state, action) => {
			state.loading = false
			state.reboot = true
		})

		addCase(fetchByChangeCard.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('40')) {
				state.error = 'Упс что-то пошло не так!'
			}
		})
	},
})
export const { toggleReboot, changeError } = addProductSlice.actions

export default addProductSlice.reducer
