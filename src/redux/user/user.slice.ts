import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Product } from '../products/products.slice'

// Define a type for the slice state
interface UserState {
    id: String | null
    name: string | null
    lastName: string | null
    email: string | null
    birthDate: Date | null
    purchases: String[] 
    cart: Product[]
    favourites: String[] 
    reviews: String[]
    createdAt: Date | null
    updatedAt?: Date
    error?: any
    loading: Boolean
}

// Define the initial state using that type
const initialState: UserState = {
    id: null,
    name: null,
    lastName: null,
    email: null,
    birthDate: null,
    purchases: [],
    cart: [],
    favourites: [],
    reviews: [],
    createdAt: null,
    loading: false
} as UserState

export interface UserData {
    name: string
    lastName: string
    email: string
    password: string
    birthDate: Date
}

export const userAuth = createAsyncThunk(
    'users/userAuth',
    async (
        data: {
            user: UserData,
            route: 'register' | 'login'
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post(`http://localhost:4000/users/${data.route}`, data.user)
            // Inferred return type: Promise<MyData>
            return (response.data) as any
        } catch(err: any) {
            if(err.response.data)
                return rejectWithValue(err.response.data)
            else 
                throw new Error(err)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        removeError: state => {
            state.error = null
        },
        addItemToCart: {
            reducer: (state, action: PayloadAction<Product>) => {
                state.cart.push(action.payload)
            },
            prepare: (product: Product) => {
                return { payload: product }
            },
        }
    },
    extraReducers: builder => {
        builder.addCase(userAuth.pending, (state, _) => {
            state.loading = true
            state.error = undefined
        })
        builder.addCase(userAuth.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })
        builder.addCase(userAuth.fulfilled, (state, { payload: { data } }) => {
            state.loading = false
            state.error = undefined
            state.id = data._id
            state.name = data.name
            state.lastName = data.last_name
            state.birthDate = data.birth_date
            state.email = data.email
            state.createdAt = data.created_at
            state.cart = data.cart
            state.favourites = data.favourites
            state.purchases = data.purchases
            state.reviews = data.reviews
            state.updatedAt = data.updated_at || undefined
        })
    }
})

export const { removeError, addItemToCart } = userSlice.actions

export default userSlice.reducer
