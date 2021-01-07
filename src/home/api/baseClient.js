import axios from 'axios';
const cillApi = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
// Interceptors used to send the SSO Token in every request.
// cillApi.interceptors.request.use(
//   (config) => {
//     const token = getSSOToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   });
// TO DO: Implement interceptors in the response in order to check if the token still active.
// cillApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response &&
//       error.response.status === 400 &&
//       originalRequest.url === `${process.env.REACT_APP_CILL_API_BASE_URL}/oauth/token`
//     ) {
//       // Here you should log out the user and clear all the SSO information if it's stored.
//       return Promise.reject(error);
//     };
//     if(
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest.retry
//     ) {
//       originalRequest.retry = true;
//       const refresh_token = getRefreshToken();
//       return cillApi.post('/oauth/token', { grant_type: 'refresh_token'}).then((reponse) => {
//         if (response.status === 200) {
//           // Replace the old token with the new one.
//           cillApi.defaults.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
//           return cillApi(originalRequest);
//         }
//       });
//     }
//     // Check if this should be in the else.
//     return Promise.reject(error);
//   }
// );
// Here will be defined the base request methods.
/* getData() could receive params as an object in order to send the data in the body, instead of query params
but it can change*/
export const getData = (endPoint, params) => {
  const response = cillApi.get(endPoint);
  return response;
};
export const postData = (endPoint, data) => {
  const response = cillApi.post(endPoint, data);
  return response;
};
export const putData = (endPoint, data) => {
  const response = cillApi.put(endPoint, data);
  return response;
};
export const patchData = (endPoint, data) => {
  const response = cillApi.patch(endPoint, data);
  return response;
};
