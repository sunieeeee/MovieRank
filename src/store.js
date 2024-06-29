import {configureStore} from '@reduxjs/toolkit';
import MovieRankSlice from './slices/MovieRankSlice';

const store = configureStore({
  reducer: {
    MovieRankSlice: MovieRankSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export default store;