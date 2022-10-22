import { STATUS_UNAUTHORIZED } from "../constants/common";
/**
 * @param {Error} error
 * @param {Vue} context
 */
function handleError(error, context) {
  console.error(error);
  const isRouteAdmin = context?.$route?.path?.includes("admin");
  const isRouteUser = context?.$route?.path?.includes("examinees");
  const message = error?.response?.data?.errorMessage
    ? error.response.data.errorMessage
    : error?.response?.data?.error || error?.message || "An error has occurred";
  if (context) {
    context.$error({
      title: message,
    });
    if (isRouteAdmin && error?.response?.status === STATUS_UNAUTHORIZED) {
      localStorage.removeItem("adminUserID");
      localStorage.removeItem("adminSessionKey");
      context.$router.push({ name: "admin.login" });
    } else if (isRouteUser && error?.response?.status === STATUS_UNAUTHORIZED) {
      localStorage.removeItem("userID");
      localStorage.removeItem("sessionKey");
      context.$router.push({ name: "user.login" });
    } else if (error?.response?.status === STATUS_UNAUTHORIZED) {
      context.$router.push({ name: "terms" });
    }
  }
}

export default {
  install(Vue) {
    Vue.prototype.$handleError = handleError;
  },
};
