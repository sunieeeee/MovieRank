import React, {memo, useEffect, useState, useCallback} from 'react';

//상태값을 로드하기 위한 hook과 action함수를 dispatch할 hook참조
import {useSelector, useDispatch} from 'react-redux';
//Slice에 정의된 액션함수 참조
import {getList} from '../slices/MovieRankSlice';

//로딩바 컴포넌트
import Spinner from '../components/Spinner';
//에러바 컴포넌트
import ErrorView from '../components/ErrorView';
//테이블 컴포넌트
import Table from '../components/Table';
//컨테이너 컴포넌트
import MovieContainer from './MovieContainer';

//날짜 처리 라이브러리
import dayjs from 'dayjs';

const MovieRank = memo(() => {
  //hook을 통해 slice가 관리하는 상태값 가져오기
  const {data, loading, error} = useSelector((state) => state.MovieRankSlice);
  
  //dispatch함수 생성
  const dispatch = useDispatch();

  //검색을 위해 OpenAPI에 파라미터로 전달할 날짜값을 상태값으로 관리
  // -초기값은 어제 날짜로 설정(형식은 input[type=data]에 맞춤)
  const [targetDt,setTargetDt] = useState(dayjs().add(-1, 'd').format('YYYY-MM-DD'));

  //컴포넌트가 마운트되면 데이터 조회를 위한 액션함수를 디스패치 함
  // - targetDt 값이 변경될 때마다 다시 조회
  useEffect(()=>{
    //slice안에 정의된 액션함수에 파라미터를 전달해야 할 경우
    //JSON 구조로 묶어서 전달한다.
    //{'targetDt': targetDt.replaceAll('-', '')} 이 부분이 
    //MovieRankSlice.js의 async(payload, ...어쩌구)의 payload로 들어온다. 그래서 params {targetDt: payload.targetDt} -> 이렇게 쓸 수 있다.
    //replace하는 이유 : open api로 보낼때는 - 기호를 빼고 보내야 한다.
    dispatch(getList({'targetDt': targetDt.replaceAll('-', '')}));
  }, [targetDt]);

  //드롭다운 값 변경 이벤트 처리 함수
  const handleChange = useCallback((e) => {
    setTargetDt(e.currentTarget.value);
  }, []);

  return (
    <MovieContainer>
      <div className='inner'>
      <h1>MovieRank</h1>
      
      <Spinner loading={loading} />

      <div className='formContent'>
        <form>
          {/* submit 이벤트를 통해 값을 전달할 경우 defaultValue 속성 사용 */}
          {/* onChange 이벤트를 통해 입력값을 상태값에 복사할 경우 value 속성을 사용 */}
          <input type="date" value={targetDt} onChange={handleChange} />
        </form>
        <span>※ 오늘을 포함하여 이후의 데이터는 조회할 수 없습니다.</span>
      </div>

      {error ? (
        <ErrorView error={error} />
      ) : (
        <Table>
          <thead>
            <tr>
              <th>순위</th>
              <th>제목</th>
              <th>관람객 수</th>
              <th>매출액</th>
              <th>누적 관람객 수</th>
              <th>누적 매출액</th>
            </tr>
          </thead>
          <tbody>
            {data && data.boxOfficeResult.dailyBoxOfficeList.map((v, i) => (
              <tr key={i}>
                <td>{v.rank}</td>
                <td>{v.movieNm}</td>
                <td>{Number(v.audiCnt).toLocaleString()}명</td>
                <td>{Number(v.salesAmt).toLocaleString()}</td>
                <td>{Number(v.audiAcc).toLocaleString()}</td>
                <td>{Number(v.salesAcc).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      </div>
    </MovieContainer>
  )
});

export default MovieRank;