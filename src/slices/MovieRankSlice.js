import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = ' http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json';
const API_KEY = 'b9e38bc24e8273daba4aeb76ae5c17c8';

/** Ajax처리를 위한 미들웨어 함수 정의 */
export const getList = createAsyncThunk('MovieRankSlice/getList', async(payload, {rejectWithValue}) => {
  let result = null;

  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        targetDt: payload.targetDt
      }
    });
    result = response.data;

  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

const MovieRankSlice = createSlice({
  name: 'MovieRankSlice',

  //이 모듈이 관리하고자 하는 상태값들을 명시
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  extraReducers: (builder) => {
    //로딩중임을 표시
    builder.addCase(getList.pending, (state, {payload}) => {
      return {...state, loading: true}
    });

    //처리가 완료된 경우 - 미들웨어 함수가 정상적으로 리턴한 경우
    builder.addCase(getList.fulfilled, (state, {payload}) => {
      return {
        data: payload,
        loading: false,
        error: null
      }
    });

    //처리에 실패한 경우 - 미들웨어 함수 안에서 예외가 발생하여 catch블록이 실행된 경우
    builder.addCase(getList.rejected, (state, {payload}) => {
      return {
        data: payload,
        loading: false,
        error: {
          code: payload.status ? payload.status : 500,
          message: payload.statusText ? payload.statusText : 'Server Error'
        }
      }
    });
  }
});

export default MovieRankSlice.reducer;