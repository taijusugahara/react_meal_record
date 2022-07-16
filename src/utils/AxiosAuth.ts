import axios from "axios";

const AxiosAuth = () => {
  const apiUrl = process.env.REACT_APP_DEV_API_URL;
  const get_token_by_refresh_token_url = `${apiUrl}v2/get_token_by_refresh_token`
  const instance = axios.create({
  });

  instance.interceptors.response.use(
    (res) => {
      console.log('axios success')
      return res;
    },
    async (err) => {
      console.log('axios error')
      const originalRequest = err.config
      console.log(originalRequest)
      if (err.response.status === 401) {
        console.log("Authorization errorです。")
        const again_response = await axios.post(get_token_by_refresh_token_url,{},{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${localStorage.jwt_refresh_token}`,
          }
        })
        .then(res => {
          localStorage.setItem("jwt_access_token", res.data.access_token);
          localStorage.setItem("jwt_refresh_token", res.data.refresh_token);
          originalRequest.headers.Authorization = res.data.access_token
          originalRequest._retry = true
          originalRequest.headers.Authorization = `JWT ${localStorage.jwt_access_token}`
          return axios.request(originalRequest)//先ほどのrequest again
        })
        .catch((err) => {
          console.log(err)
          window.location.href = '/login';
        });

        return again_response
      }
    }
  );

  return instance

};

export default AxiosAuth