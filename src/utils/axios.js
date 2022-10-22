import localToken from "./token";
import axios from "axios";
import {
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_REFRESHTOKEN,
  LOGIN_ROUTE,
} from "../constants";

const baseURL = "/api/v1";

const refreshAPI = "/refresh_token";

const instance = axios.create({
  baseURL,
});

/**
 * Custom request.
 */

instance.interceptors.request.use(
  (config) => {
    const token = localToken.get(LOCAL_STORAGE_TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => err
);
/**
 * Call api reset token.
 */

const refreshToken = async (config, token) => {
  try {
    const res = await axios.post(
      `${baseURL + refreshAPI}`,
      {
        refresh_token: localToken.get(LOCAL_STORAGE_REFRESHTOKEN),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { access_token, refresh_token } = res.data;
    localToken.set(LOCAL_STORAGE_TOKEN, access_token);
    localToken.set(LOCAL_STORAGE_REFRESHTOKEN, refresh_token);
    config.headers["Authorization"] = `Bearer ${access_token}`;
    return await axios(config);
  } catch (err) {
    localToken.reset(LOCAL_STORAGE_TOKEN);
    localToken.reset(LOCAL_STORAGE_REFRESHTOKEN);
    window.location.href = LOGIN_ROUTE;
    return Promise.reject(err);
  }
};

/**
 * Custom response.
 */
instance.interceptors.response.use(
  (res) => {
    if (res?.config?.url === LOGIN_ROUTE) {
      localToken.set(LOCAL_STORAGE_TOKEN, res.data.access_token || "");
      localToken.set(LOCAL_STORAGE_REFRESHTOKEN, res.data.refresh_token || "");
    }
    // TODO Fix JWT in php laravel
    if (res?.data?.exception && res?.data?.message) {
      window.location.href = LOGIN_ROUTE;
    }
    return res;
  },
  (error) => {
    const {
      config,
      config: { validateStatus },
      response: { status },
    } = error;
    if (validateStatus()) return Promise.reject(error);
    if (status === 401 && config.url !== LOGIN_ROUTE) {
      const token = localToken.get(LOCAL_STORAGE_REFRESHTOKEN);
      if (token) {
        return refreshToken(config, token);
      } else {
        window.location.href = LOGIN_ROUTE;
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
