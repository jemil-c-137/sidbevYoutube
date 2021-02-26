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
  headers: {
    
  }
});

const authApi = axios.create({
  baseURL: 'http://localhost:5000/',
});

export const loginApi = (username, password) => {
  return authApi.post('login', { username, password }).then((response) => {
    console.log(response);
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response;
  });
};

export const logOutApi = () => {
  localStorage.removeItem('user');
};

export const getLocalStorage = () => {
  const getUser = JSON.parse(localStorage.getItem('user'));
  return getUser && getUser.accessToken ? getUser : null;
}

export const addRequestToLocalStorage = (favRequest) => {
  const userLocalStorage = JSON.parse(localStorage.getItem('user'));
  if (!userLocalStorage.favRequests) {
    userLocalStorage.favRequests = [];
  }
  userLocalStorage.favRequests.push(favRequest);
  localStorage.setItem('user', JSON.stringify(userLocalStorage));
};

export const changeLocalStorageFavs = (favorites) => {
  const userLocalStorage = JSON.parse(localStorage.getItem('user'));
  if (!userLocalStorage.favRequests) {
    userLocalStorage.favRequests = [];
  }
  userLocalStorage.favRequests = favorites;
  localStorage.setItem('user', JSON.stringify(userLocalStorage));
};

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
