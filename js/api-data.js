// 반복되는 객체, 배열, 변수를 담아두는 곳, 내보내는 곳

export let baseUrl = 'https://api.themoviedb.org/3'
export let apiKey = '?api_key=03077568d8630dbe54c253a281433020'
export let ko = '&language=ko-KR'
export let en = '&language=en-US'
export let imgPaths = {
  original : 'https://image.tmdb.org/t/p/original' ,
  w500 : 'https://image.tmdb.org/t/p/w500'
}

export let options = {
  playing : '/movie/now_playing', //현재상영작
  popular : '/movie/popular', //인기작
  trend : '/trending/movie/week', //주간트렌드
  rated : '/movie/top_rated', //평점순
  upcoming : '/movie/upcoming', //최신개봉, 개봉예정영화
}//options

export let gradeColors = ['red', 'orangered', 'orange', 'yellowgreen', 'blueviolet']

export const genreList = {
  28: "액션",
  12: "모험",
  16: "애니메이션",
  35: "코메디",
  80: "범죄",
  99: "다큐멘터리",
  18: "드라마",
  10751: "가족",
  14: "판타지",
  36: "역사",
  27: "공포",
  10402: "음악",
  9648: "미스테리",
  10749: "로맨스",
  878: "SF",
  10770: "TV영화",
  53: "스릴러",
  10752: "전쟁",
  37: "서부극",
}

