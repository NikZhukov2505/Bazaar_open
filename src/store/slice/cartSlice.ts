import { createSlice } from "@reduxjs/toolkit"
import { reduceCount } from "../../reused"
import { IProductInCart } from "../modules"
import { removeLS, setLS } from "../../LS"

type CartState = {
    cartArr: IProductInCart[],
    countInCart: number,
    status: boolean,
    name: string,
    surname: string,
    loading: boolean,
    error: string | undefined | null,
}

const initialState: CartState = {
    cartArr: [],
    countInCart: 0,
    status: false,
    name: '',
    surname: '',
    loading: false,
    error: null,
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartArr(state, action) {
            state.cartArr = action.payload
            state.countInCart = reduceCount(action?.payload)
        },
        filterCart(state, action) {
            state.cartArr = state.cartArr.filter(item => item.id !== action.payload.id)
            setLS('cart', state.cartArr)
            state.countInCart = reduceCount(state.cartArr)
        },
        // plusCount(state, action) {
        //     const data = state.cartArr.find(el => el.id_item === action.payload.id)
        //     if (data) {
        //         data.count = data.count + 1
        //         setLS('cart', state?.cartArr)
        //         state.countInCart = reduceCount(state?.cartArr)
        //     }
        // },
        // minusCount(state, action) {
        //     const data = state.cartArr.find(el => el.id_item === action.payload.id)
        //     if (data) {
        //         data.count = data.count - 1
        //         setLS('cart', state?.cartArr)
        //         state.countInCart = reduceCount(state?.cartArr)
        //     }
        // },
        allClearInCart(state) {
            state.cartArr = []
            state.countInCart = 0
            removeLS('cart')
            state.status = false
        }
    },
    extraReducers: ({ addCase }) => {
        // addCase(fetchBySendProducts.pending, setLoading)
        // addCase(fetchBySendProducts.fulfilled, (state, action) => {
        //     state.status = action.payload.status
        //     state.name = action.payload.name
        //     state.surname = action.payload.surname
        //     state.loading = false
        // })
        // addCase(fetchBySendProducts.rejected, setError)
    }
})

export const { setCartArr, filterCart, allClearInCart } = cartSlice.actions

export default cartSlice.reducer