# MOVIE RANK - 일일 영화 검색

- `project duration` : 2024.6.10 ~ 2024.6.22 (약 2주)
- `Link` : https://movie-rank-three.vercel.app/
- `Stack` : React, Redux, Axios, SCSS

## 프로젝트 기능 설명
- **달력 선택을 통한 영화 순위 조회**: 초기값은 `dayjs`를 사용하여 어제 날짜로 설정되며, `YYYY-MM-DD`형식으로 포맷팅.
- **로딩 스피너**: 'react-loader-spinner'라이브러리를 사용하여 데이터를 불러오는 동안 로딩 스피너를 표시.
- **에러 처리**:  'error'상태가 true일 때 'ErrorView'컴포넌트가 표시되고, 오류가 없을 경우 데이터 테이블을 표시.

## 작업 화면
💡 날짜 선택 및 데이터 조회
![날짜 선택 및 데이터 조회](https://portfolio-iota-eosin-95.vercel.app/img/projects/movierank/MovieRank.gif)