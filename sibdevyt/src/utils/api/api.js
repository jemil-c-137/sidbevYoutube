import axios from 'axios';


export const sortByAPIparamsType = {
  date: 'date',
  rating: 'rating',
  relevance: 'relevance',
  title: 'title',
  videoCount: 'videoCount',
  viewCount: 'viewCount',
};

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
});

const authApi = axios.create({
  baseURL: 'http://localhost:5000/',
});

export const loginApi = (username, password) => {
  return authApi.post('login', {username, password}).then(response => {
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  })
} 

export const logOutApi = () => {
  localStorage.removeItem('user');
}

export const addRequestToLocalStorage = (favRequest) => {
  const userLocalStorage = JSON.parse(localStorage.getItem('user'));
  if(!userLocalStorage.favRequests) {
    userLocalStorage.favRequests = []
  }
  userLocalStorage.favRequests.push(favRequest);
  console.log(userLocalStorage);
  localStorage.setItem('user', JSON.stringify(userLocalStorage))
}


export const youtubeAPI = {
  search(requestWords) {
    return instance.get(
      `search?key=AIzaSyAharFeVQQ75_2r_ZSE28HByQlYlm2HWS8&q=${requestWords}&part=snippet&maxResults=12`
    );
  },
  customSearch(requestWords, sortBy = sortByAPIparamsType.relevance, maxResults = 12) {
    return instance.get(
      `search?key=AIzaSyAharFeVQQ75_2r_ZSE28HByQlYlm2HWS8&q=${requestWords}&part=snippet&maxResults=${maxResults}&order=${sortBy}`
    );
  },
};
