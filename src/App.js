import React, {memo} from 'react';
import MovieRank from './movie_rank';

const App = memo(() => {
  return (
    <div>
      <MovieRank />
    </div>
  )
});

export default App;
