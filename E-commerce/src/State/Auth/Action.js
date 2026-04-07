import axios from "axios";
import { API_BASE_URL } from "../../Config/apiConfig";

// OPTIONAL: or import from your constants file
const LOGOUT = "LOGOUT";

// ---------- REGISTER ----------
export const register = (userData) => async (dispatch) => {
  const registerRequest  = () => ({ type: "REGISTER_REQUEST" });
  const registerSuccess  = (user) => ({ type: "REGISTER_SUCCESS", payload: user });
  const registerFailure  = (error) => ({ type: "REGISTER_FAILURE", payload: error });

  dispatch(registerRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }

    console.log("register user", user);
    dispatch(registerSuccess(user.jwt));

    // load profile immediately so avatar has data
    dispatch(getUserRequest());
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message;
    dispatch(registerFailure(message));
  }
};

// ---------- LOGIN ----------
export const login = (userData) => async (dispatch) => {
  const loginRequest  = () => ({ type: "LOGIN_REQUEST" });
  const loginSuccess  = (user) => ({ type: "LOGIN_SUCCESS", payload: user });
  const loginFailure  = (error) => ({ type: "LOGIN_FAILURE", payload: error });

  dispatch(loginRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }

    console.log("login user", user);
    dispatch(loginSuccess(user.jwt));

    // same behavior as register: fetch profile so avatar updates
    dispatch(getUserRequest());
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message;
    dispatch(loginFailure(message));
  }
};

// ---------- LOAD CURRENT USER ----------
export const getUserRequest = () => async (dispatch) => {
  const getUserRequestAction = () => ({ type: "GET_USER_REQUEST" });
  const getUserSuccess       = (user) => ({ type: "GET_USER_SUCCESS", payload: user });
  const getUserFailure       = (error) => ({ type: "GET_USER_FAILURE", payload: error });

  const token = localStorage.getItem("jwt");
  if (!token) return;

  dispatch(getUserRequestAction());

  try {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(`${API_BASE_URL}/users/profile`, { headers });
    const user = response.data;
    dispatch(getUserSuccess(user));
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message;
    dispatch(getUserFailure(message));
    console.error("Profile error:", error.response?.data || error.message);
  }
};

// ---------- LOGOUT ----------
export const logout = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT, payload: null });
};