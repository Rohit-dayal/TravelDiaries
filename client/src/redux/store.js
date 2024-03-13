import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import themeReducer from './theme/themeSlice'

const rootReducer = combineReducers({
    user: userReducer, // We use the userReducer because we imported it by this name
    theme: themeReducer,
})

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}
// with help of persist we are able to store the information of user in localstorage.
// So that even after reloading the page we still have the information of user
const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
    // We use the persistReduces bcoz we have more than one user to combine all of them 
  reducer: persistedReducer,
  // We use middleware to prevent the error in case if any occur
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
})

export const persistor = persistStore(store);