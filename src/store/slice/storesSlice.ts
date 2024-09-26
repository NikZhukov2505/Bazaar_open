import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ICategory, IFeatures, IStores } from '../modules'
import { storesApi } from '../../axios'

type StoreState = {
    loading: boolean
    error: null | string
    stores: IStores | null
    all_categories: ICategory[]
    empty_modal: boolean
    store_modal: boolean
    store_data: IFeatures | null
}

const initialState: StoreState = {
    error: null,
    loading: false,
    stores: null,
    all_categories: [],
    empty_modal: false,
    store_modal: false,
    store_data: null
}

export const getAllDataForCategories = createAsyncThunk<ICategory[], void, { rejectValue: string }>(
    'stores/getAllDataForCategories',
    async (_, { rejectWithValue }) => {
        const res = await storesApi.getCategory()
        // console.log(res);

        if (res.status !== 200) {
            return rejectWithValue('Error')
        }
        return res.data as ICategory[]
    }
)

export const getStoresByCategories = createAsyncThunk<IStores, { cat_id: string, sub_id: string }, { rejectValue: string }>(
    'stores/getStoresByCategories',
    async (data, { rejectWithValue }) => {
        const { cat_id, sub_id } = data
        const res = await storesApi.getStoresByCategory(cat_id, sub_id)
        // console.log(res);

        if (res.status !== 200) {
            return rejectWithValue('Error')
        }
        return res.data as IStores
    }
)

export const getStoresBySearch = createAsyncThunk<IStores, string, { rejectValue: string }>(
    'stores/getStoresBySearch',
    async (query, { rejectWithValue }) => {
        const res = await storesApi.getStoresBySearch(query)
        // console.log(res);

        if (res.status !== 200) {
            return rejectWithValue('Error')
        }
        return res.data as IStores
    }
)

export const fetchBySellersIds = createAsyncThunk<IStores, number[], { rejectValue: string }>(
    'stores/fetchBySellersIds',
    async (data, { rejectWithValue }) => {
        const res = await storesApi.getBySellersIds(data)
        // console.log(res);

        if (res.status !== 200) {
            return rejectWithValue('Error')
        }
        return res.data as IStores
    }
)


const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        closeEmptyModal(state) {
            state.empty_modal = false
        },
        toggleStoreData(state, action: PayloadAction<IFeatures | null>) {
            state.store_data = action.payload
        },
        toggleStoreModal(state, action: PayloadAction<boolean>) {
            state.store_modal = action.payload
        }
    },
    extraReducers: ({ addCase }) => {
        addCase(getAllDataForCategories.pending, (state) => {
            state.loading = true
            state.error = null
        })
        addCase(getAllDataForCategories.fulfilled, (state, action) => {
            state.all_categories = action.payload
            state.loading = false
        })
        addCase(getAllDataForCategories.rejected, (state, action) => {
            state.loading = false
            console.log(action);
            state.error = null
        })
        // ===============================================
        addCase(getStoresByCategories.pending, (state) => {
            state.loading = true
            state.error = null
        })
        addCase(getStoresByCategories.fulfilled, (state, action) => {
            if (action.payload.features.length === 0) {
                state.empty_modal = true
            }
            state.stores = action.payload
            state.loading = false
        })
        addCase(getStoresByCategories.rejected, (state, action) => {
            state.loading = false
            console.log(action);
            state.error = null
        })
        // ===============================================
        addCase(getStoresBySearch.pending, (state) => {
            state.loading = true
            state.error = null
        })
        addCase(getStoresBySearch.fulfilled, (state, action) => {
            if (action.payload.features.length === 0) {
                state.empty_modal = true
            }
            state.loading = false
            state.stores = action.payload
        })
        addCase(getStoresBySearch.rejected, (state, action) => {
            state.loading = false
            console.log(action);
            state.error = null
        })
        // ===============================================
        addCase(fetchBySellersIds.pending, (state) => {
            state.loading = true
            state.error = null
        })
        addCase(fetchBySellersIds.fulfilled, (state, action) => {
            if (action.payload.features.length === 0) {
                state.empty_modal = true
            }
            state.loading = false
            state.stores = action.payload
        })
        addCase(fetchBySellersIds.rejected, (state, action) => {
            state.loading = false
            console.log(action);
            state.error = null
        })
    },
})

export const { closeEmptyModal, toggleStoreData, toggleStoreModal } = storesSlice.actions

export default storesSlice.reducer