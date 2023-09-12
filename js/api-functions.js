// 반복되는 함수를 저장하는 곳
import { baseUrl, apiKey, ko, en, options, imgPaths, gradeColors, genreList } from "./api-data.js";
import { qySel, qySelAll, setPersonModal, showModal, sortArray, videoResize } from "./functions.js";

export const getMovies = (option, lang = ko, page = 1) => { //pending 함수
  return new Promise(async resolve => {
    let result = await fetch(`${baseUrl}${option}${apiKey}${lang}&page=${page}`)
    let data = await result.json() /* api 호출 후 데이터 받아오는 작업 */
    resolve(data)

  })//Promise
}//getMovies

export const getMovie = (movieId, lang = ko) => {
  return new Promise(async resolve => {
    let result = await fetch(`${baseUrl}/movie/${movieId}${apiKey}${lang}&include_adult=false`) // 주소 구조 파악 중요! 오늘 이해해야됨
    let data = await result.json()
    resolve(data)
  })//Promise
}//getMovie

export const getVideos = (movieId, lang = ko) => {
  return new Promise(async resolve => {
    let result = await fetch(`${baseUrl}/movie/${movieId}/videos${apiKey}${lang}&include_adult=false`)
    let data = await result.json()
    resolve(data)
  })//Promise
}//getVideos

export const getimages = (movieId) => {
  return new Promise(async resolve => {
    let result = await fetch(`${baseUrl}/movie/${movieId}/images${apiKey}&include_adult=false`)
    let data = await result.json()
    resolve(data)
  })//Promise
}//getimages

export const getSimilarMovies = (movieId, lang = ko) => {
  return new Promise(async resolve => {
    let result = await fetch(`${baseUrl}/movie/${movieId}/similar${apiKey}${lang}&include_adult=false`)
    let data = await result.json()
    resolve(data)
  })
}//getSimilarMovies

export const displayMovies = (data, container, gridlassName = '') => {
  if (data.length === 0) {
    qySel(container).innerHTML = '<p class="no-data">관련 영화목록이 존재하지 않습니다</p>'
    return false
  }//if

  return new Promise(resolve => {
    data.forEach(movie => {
      let { id, poster_path, vote_average, title, genre_ids, release_date } = movie
      let imgPath = (poster_path) ? `${imgPaths.w500}${poster_path}` : './img/no-image.jpg'
      vote_average = vote_average.toFixed(1)
      let gradeLevel = Math.floor(vote_average - 5)
      if (gradeLevel > 4) gradeLevel = 4
      if (gradeLevel < 0) gradeLevel = 0
      let gradeColor = gradeColors[gradeLevel]
      let genres = genre_ids.map(num => genreList[num]).join('/')



      qySel(container).insertAdjacentHTML('beforeend', `
    <figure class="${gridlassName}">
      <a href="./detail.php?id=${id}">
        <div class="imgbox">
          <img src="${imgPath}" alt="">
          <span style="background:${gradeColor}"></span>
          <small>${vote_average}</small>
        </div><!-- imgbox -->
        <figcaption>
          <h3>{영화제목}</h3>
          <p>${genres}</p>
          <p>{2023-8-6}</p>
        </figcaption>
      </a>
    </figure>
      `)
    })//forEach
    resolve()
  })//Promise
}//displayMovies

export const getCredits = (movieId, lang = ko) => {
  return new Promise(async resolve => {
    const result = await fetch(`${baseUrl}/movie/${movieId}/credits${apiKey}${lang}&include_adult=false`)
    const data = await result.json()
    resolve(data)
  })//Promise
}//getCredits

export const displayVideos = (data, container) => {
  if (data.length === 0) {
    qySel(container).innerHTML = '<p class="no-data">관련 영화목록이 존재하지 않습니다</p>'
    return
  }

  data.forEach(video => {
    let { key } = video
    qySel(container).insertAdjacentHTML('beforeend', `
    <button value="${key}">
      <img src="https://img.youtube.com/vi/${key}/mqdefault.jpg" alt>
    </button>
    `)
  })//forEach


  qySelAll(`${container} button`).forEach(btn => {
    btn.addEventListener('click', e => {
      showModal('.video-modal')
      let youtubeId = e.currentTarget.value
      qySel('.video-modal iframe').src = `http://www.youtube.com/embed/${youtubeId}?playlist=${youtubeId}&autoplay=1&loop=1&mute=1&playsinline=1" allowfullscreen></iframe>`
      videoResize()
    })//click
  })//forEach
}//displayVideos

export const displayImages = (data, container) => {
  if (data.length === 0) {
    qySel(container).innerHTML = '<p class="no-data">관련 이미지가 존재하지 않습니다</p>'
    return
  }//if

  data.forEach(img => {
    let { file_path } = img
    let imgPathOriginal = `${imgPaths.original}${file_path}`
    let imgPathW500 = `${imgPaths.w500}${file_path}`
    qySel(container).insertAdjacentHTML('beforeend', `
      <a class="viewbox-btn" href="${imgPathOriginal}">
        <img src="${imgPathW500}" alt>
      </a>
    `)//insertAdjacentHTML
  })//forEach

  $('.viewbox-btn').viewbox()
}//displayImages

export const displayPeople = (data, container) => {
  if (data.length === 0) {
    qySel(container).innerHTML = '<p class="no-data">관련 이미지가 존재하지 않습니다</p>'
    return
  }//if
  data.forEach(person => {
    let { id, profile_path, name, character } = person
    let photo = profile_path ? `${imgPaths.w500}${profile_path}` : './img/no-image.jpg'
    qySel(container).insertAdjacentHTML('beforeend', `
    <figure>
      <a href="${id}">
        <img src="${photo}" alt>
        <figcaption>
          <em>${name}</em>
          <b>${character}역</b>
        </figcaption>
      </a>
    </figure>
    `)//insertAdjacentHTML
  })//forEach

  qySelAll(`${container} a`).forEach(anchor => {
    anchor.addEventListener('click', async e => {
      e.preventDefault()
      let id = e.currentTarget.getAttribute('href')
      let profile = await getProfile(id, en)
      let filmography = await getFilmography(id)
      displayProfile(profile)
      displayFilmography(filmography)
      showModal('.person-modal')
      setPersonModal()
    })//click
  })//forEach
}//displayPeople

export const displayFilmography = (filmographyData) => {
  let { cast, crew } = filmographyData
  let filmography = [...cast, ...crew]
  sortArray(filmography, 'popularity', -1)
  filmography = filmography.slice(0, 20)
  sortArray(filmography, 'release_date', 1)

  qySel('ul.filmography').innerHTML = ''
  filmography.forEach(movie => {
    let { id, release_date, title, job } = movie
    job = (job) ? job : 'acting'
    qySel('ul.filmography').insertAdjacentHTML('beforeend', `
      <li>
        <time>${release_date}</time>
        <a href="./detail.php?id=${id}">
          <em>${title}</em>
          <small>(${job})</small>
        </a>
      </li>
    `)//insertAdjacentHTML
  })//forEach

}//displayFilmography

export const getProfile = (personId, lang = en) => {
  return new Promise(async resolve => {
    let result = await fetch(`${baseUrl}/person/${personId}${apiKey}${lang}`)
    let data = await result.json()
    resolve(data)
  })//Promise
}//getProfile

export const displayProfile = (profileData) => {
  let { profile_path, name, birthday, deathday, known_for_department, place_of_birth, biography } = profileData
  let photoPath = (profile_path) ? `${imgPaths.w500}${profile_path}` : './img/no-image.jpg'


  name = (name) ? name : '관련 정보가 없습니다'
  known_for_department = (known_for_department) ? known_for_department : '관련 정보가 없습니다'
  place_of_birth = (place_of_birth) ? place_of_birth : '관련 정보가 없습니다'
  biography = (biography) ? biography : '관련 정보가 없습니다'
  deathday = (deathday) ? deathday : ''
  birthday = (birthday) ? `${birthday} ~ ${deathday}` : '관련 정보가 없습니다'

  qySel('.person-photo').src = photoPath
  qySel('.person-name').innerText = name
  qySel('.person-job').innerText = known_for_department
  qySel('.person-life').innerText = birthday
  qySel('.person-place').innerText = place_of_birth
  qySel('.person-biography').innerText = biography
}//displayPerson

export const getFilmography = (personId, lang = ko) => {
  return new Promise(async resolve => {
    const result = await fetch(`${baseUrl}/person/${personId}/movie_credits${apiKey}${lang}`)
    const data = result.json()
    resolve(data)
  })//Promise
}//getFilmography

export let controller = new AbortController()
let signal = controller.signal

export const searchByKeyword = async (keyword, lang=ko) => {
  return new Promise(async resolve => {
    controller = new AbortController()
    signal = controller.signal
    try {
      const result = await fetch(
        `${baseUrl}/search/movie${apiKey}${lang}&query=${keyword}`,
        { signal }
      )//fetch
      const data = await result.json()
      resolve(data)
    } catch { }//try catch
  })//Promise
}//searchByKeywords

export const searchByGenres = (genreNumbers, page = '1') => {
  return new Promise(async resolve => {
    controller = new AbortController()
    signal = controller.signal
    const result = await fetch(
      `${baseUrl}/discover/movie${apiKey}&with_genres=${genreNumbers}&page=${page}`,
      {signal}
      )

    const data = await result.json()
    resolve(data)
  })//Promise
}//searchByGenres