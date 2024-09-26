import { configureStore } from '@reduxjs/toolkit'
import addProductSlice from './slice/addProductSlice'
import storesSlice from './slice/storesSlice'
import containerSlice from './slice/containerSlice'
import userSlice from './slice/userSlice'
import cartSlice from './slice/cartSlice'
import listProduct from './slice/listProduct'
import infoSlice from './slice/infoSlice'

export const store = configureStore({
	reducer: {
		addProductSlice: addProductSlice,
		user: userSlice,
		stores: storesSlice,
		container: containerSlice,
		cart: cartSlice,
		listProduct: listProduct,
		info: infoSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
