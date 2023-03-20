import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Reducers/UserSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userSlice)

export const store =  configureStore(
{reducer: persistedReducer})

export const persistor = persistStore(store)

export default (store, persistor);