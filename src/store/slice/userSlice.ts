import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { storesApi } from '../../axios'
import { GetToken, IIdTokenShopUser, IStoreInfo, TokenNodules, UserLogin } from '../modules'
import { removeLSToken, setLSToken } from '../../LS'

type UserState = {
	loading: boolean
	error: null | string
	token: null | string
	redirect: boolean
	user: null | TokenNodules
	enter: boolean
	success_changedata_modal: boolean
}

const initialState: UserState = {
	error: null,
	loading: false,
	token: null,
	redirect: false,
	user: null,
	enter: false,
	success_changedata_modal: false
}
// Авторизация
export const fetchByLogin = createAsyncThunk<
	GetToken,
	UserLogin,
	{ rejectValue: string }
>('user/fetchByLogin', async (getUser, { rejectWithValue }) => {
	const res = await storesApi.addNewUser(getUser)
	// console.log(res)
	if (res.status !== 200) {
		return rejectWithValue('Server error')
	}
	return res.data as GetToken
})

// получение инфо по user
export const fetchByToken = createAsyncThunk<
	TokenNodules,
	string,
	{ rejectValue: string }
>('user/fetchByToken', async (token, { rejectWithValue }) => {
	const res = await storesApi.getTokenUser(token)
	// console.log(res)
	if (res.status !== 200) {
		return rejectWithValue('Server error')
	}
	return res.data
})

// Изменение данных по seller_user
export const fetchByChangeUserData = createAsyncThunk<
	IStoreInfo,
	IIdTokenShopUser,
	{ rejectValue: string }
>(
	'user/fetchByChangeUserData',
	async (forChangeUserData, { rejectWithValue }) => {
		const res = await storesApi.changeTokenUser(forChangeUserData)
		// console.log(res)
		if (res.status !== 200) {
			return rejectWithValue('Server error')
		}
		return res.data
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		toggleRedirect(state, action: PayloadAction<boolean>) {
			state.redirect = action.payload
		},
		setEnter(state, action: PayloadAction<boolean>) {
			state.enter = action.payload
		},
		setToken(state, action: PayloadAction<string | null>) {
			state.token = action.payload
		},
		changeError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
		logOutUser(state) {
			state.token = null
			state.user = null
			removeLSToken()
		},
		closeSuccess(state) {
			state.success_changedata_modal = false
		}
	},
	extraReducers: ({ addCase }) => {
		// ===============
		addCase(fetchByLogin.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchByLogin.fulfilled, (state, action) => {
			state.loading = false
			if (action.payload.access) {
				state.token = action.payload.access
				state.redirect = true
				setLSToken(action.payload.access)
			}
		})
		addCase(fetchByLogin.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('401')) {
				state.error = 'Логин или пароль неправильно введён!'
			} else if (action.error.message?.includes('404')) {
				state.error = 'Упс что-то пошло не так попробуйте снова!'
			}
		})
		addCase(fetchByToken.pending, state => {
			state.loading = true
			state.error = null
		})

		addCase(fetchByToken.fulfilled, (state, action) => {
			state.user = action.payload
			state.loading = false
		})

		addCase(fetchByToken.rejected, (state, action) => {
			state.loading = false
			state.error = 'Токен не правильный!'
			state.token = null
			removeLSToken()
			state.enter = true
		})

		addCase(fetchByChangeUserData.pending, state => {
			state.loading = true
			state.error = null
		})

		addCase(fetchByChangeUserData.fulfilled, (state, action) => {
			state.loading = false
			if (state.user && state.user.seller_user) {
				state.user.seller_user = action.payload
				state.success_changedata_modal = true
			}

		})

		addCase(fetchByChangeUserData.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('401')) {
				state.error = 'Не авторизован!'
			} else {
				state.error = 'Упс что-то пошло не так!'
			}
		})
	},
})
export const { toggleRedirect, setToken, logOutUser, changeError, setEnter, closeSuccess } =
	userSlice.actions
export default userSlice.reducer
