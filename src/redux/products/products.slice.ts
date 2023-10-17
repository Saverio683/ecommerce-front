import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export type Review = {
    title: String
    rating: Number 
    user: String
    message?: String
}

export type Product = {
    _id: String
    name: string
    category: 'SNEAKERS' | 'SHOES' | 'BOOTS' | 'SLIPPERS'
    sizes: number[]
    price: number
    discount?: number
    quantity: number
    color: 'RED' | 'YELLOW' | 'BLUE' | 'GREEN' | 'ORANGE' | 'PURPLE' | 'BLACK' | 'WHITE' | 'GREY' | 'BROWN' | 'PINK'
    images: string[]
    created_at: Date
    updated_at?: Date
    reviews?: Review[]
}
// Define the initial state using that type
const initialState: {
    products: Product[]
    loading: boolean
    error?: any 
    selectedProduct?: Product
} = {
    products: [],
    loading: false
}

export const getAllProducts = createAsyncThunk(
    'products/getAll',
    async () => {
        try {
            const response = await axios.get(`http://localhost:4000/products/getAll`)
            return (response.data) as any
        } catch(err: any) {
            return err
        }
    }
)

export const productsSlice = createSlice({
    name: 'products',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        removeError: state => {
            state.error = null
        },
        setSelectedProduct: {
            reducer: (state, action: PayloadAction<Product>) => {
                state.selectedProduct = action.payload
            },
            prepare: (product: Product) => {
                return { payload: product }
            },
        }
    },
    extraReducers: builder => {
        builder.addCase(getAllProducts.pending, (state, _) => {
            state.loading = true
            state.error = undefined
        })
        builder.addCase(getAllProducts.rejected, state => {
            state.loading = false
            state.error = true
        })
        builder.addCase(getAllProducts.fulfilled, (state, { payload: { data } }) => {
            state.loading = false
            state.error = undefined
            state.products = data
        })
    }
})

export const { removeError, setSelectedProduct } = productsSlice.actions

export default productsSlice.reducer
