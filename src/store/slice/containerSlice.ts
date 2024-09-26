import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICategory, IProductCard, IProductsCat, ISellerProductsByName, IStoreInfo, ProfileCardModules } from "../modules";
import { storesApi } from "../../axios";


type ProductState = {
    error: null | string | undefined
    loading: boolean
    allInfoStore: IStoreInfo | null
    product: IProductCard[]
    profile_categories: ICategory[]
    detail_product: IProductCard | null
}

const initialState: ProductState = {
    error: null,
    loading: false,
    allInfoStore: null,
    product: [],
    profile_categories: [],
    detail_product: null
}

export const fetchByGetStore = createAsyncThunk<IStoreInfo, number, { rejectValue: string }>(
    'container/fetchByGetStore',
    async (id, { rejectWithValue }) => {
        const res = await storesApi.getInfoStore(id)
        // console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data as IStoreInfo
    })



export const fetchByProduct = createAsyncThunk<IProductCard[], number, { rejectValue: string }>(
    'container/fetchByProduct',
    async (id, { rejectWithValue }) => {
        const res = await storesApi.getProduct(id)
        // console.log(res);

        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data
    })

export const fetchByProfileCategories = createAsyncThunk<ICategory[], number, { rejectValue: string }>(
    'container/fetchByProfileCategories',
    async (id, { rejectWithValue }) => {
        const res = await storesApi.getStoreCategories(id)
        // console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data as ICategory[]
    }
)

export const fetchByCardsByCategories = createAsyncThunk<IProductCard[], IProductsCat, { rejectValue: string }>(
    'container/fetchByCardsByCategories',
    async (data, { rejectWithValue }) => {
        const res = await storesApi.getProductsByCategory(data)
        // console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data as IProductCard[]
    }
)

export const fetchBySellerProductsByName = createAsyncThunk<IProductCard[], ISellerProductsByName, { rejectValue: string }>(
    'container/fetchBySellerProductsByName',
    async (data, { rejectWithValue }) => {
        const res = await storesApi.getSellerProductsByName(data)
        // console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data as IProductCard[]
    }
)

export const fetchByDetailInfo = createAsyncThunk<IProductCard, number, { rejectValue: string }>(
    'container/fetchByDetailInfo',
    async (id, { rejectWithValue }) => {
        const res = await storesApi.getDetailView(id)
        // console.log(res);

        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data as IProductCard
    })


const containerSlice = createSlice({
    name: 'container',
    initialState,
    reducers: {
        clearStore(state) {
            state.allInfoStore = null
            state.product = []
        },
        clearProduct(state) {
            state.detail_product = null
        }
    },
    extraReducers: ({ addCase }) => {
        addCase(fetchByGetStore.pending, state => {
            state.loading = true
            state.error = null
        })
        addCase(fetchByGetStore.fulfilled, (state, action) => {
            state.allInfoStore = action.payload
            state.loading = false
        })
        addCase(fetchByGetStore.rejected, (state, action) => {
            state.loading = false
            if (action.error.message?.includes('404')) {
                state.error = 'Упс что то пошло не так!'
            }
        })
        // ============================================
        addCase(fetchByProduct.pending, state => {
            state.loading = true
            state.error = null
        })
        addCase(fetchByProduct.fulfilled, (state, action) => {
            state.product = action.payload
            state.loading = false
        })
        addCase(fetchByProduct.rejected, (state, action) => {
            state.loading = false
            if (action.error.message?.includes('404')) {
                state.error = 'Упс что то пошло не так!'
            }
        })
        // =============================================================
        addCase(fetchByProfileCategories.pending, (state) => {
            state.loading = true
            state.error = null
        })

        addCase(fetchByProfileCategories.fulfilled, (state, action) => {
            state.profile_categories = action.payload
            state.loading = false
        })

        addCase(fetchByProfileCategories.rejected, (state, action) => {
            state.loading = false
            if (action.payload && action.payload?.includes('404')) {
                state.error = 'Упс что-то пошло не так попробуйте снова!'
            } else {
                state.error = action.payload
            }
        })
        // =============================================================
        addCase(fetchByCardsByCategories.pending, (state) => {
            state.loading = true
            state.error = null
        })

        addCase(fetchByCardsByCategories.fulfilled, (state, action) => {
            state.product = action.payload
            state.loading = false
        })

        addCase(fetchByCardsByCategories.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = 'Упс что-то пошло не так попробуйте снова!'
            } else {
                state.error = action.payload
            }
        })
        // =============================================================
        // =============================================================
        addCase(fetchBySellerProductsByName.pending, (state) => {
            state.loading = true
            state.error = null
        })

        addCase(fetchBySellerProductsByName.fulfilled, (state, action) => {
            state.product = action.payload
            state.loading = false
        })

        addCase(fetchBySellerProductsByName.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = 'Упс что-то пошло не так попробуйте снова!'
            } else {
                state.error = action.payload
            }
        })
        // =============================================================
        addCase(fetchByDetailInfo.pending, state => {
            state.loading = true
            state.error = null
        })
        addCase(fetchByDetailInfo.fulfilled, (state, action) => {
            state.detail_product = action.payload
            state.loading = false
        })
        addCase(fetchByDetailInfo.rejected, (state, action) => {
            state.loading = false
            if (action.error.message?.includes('404')) {
                state.error = 'Упс что то пошло не так!'
            }
        })
    }
})

export const { clearStore, clearProduct } = containerSlice.actions

export default containerSlice.reducer