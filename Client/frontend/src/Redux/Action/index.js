import {
  GET_DETAILS_FAILURE,
  GET_DETAILS_SUCCESS,
  MAIL_ALERT_FAILURE,
  MAIL_ALERT_SUCCESS,
  MAIL_ALERT_REQUEST,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPLOAD_PROJECT_REQUEST,
  UPLOAD_PROJECT_SUCCESS,
  UPLOAD_PROJECT_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAILURE,
  USER_LOGOUT_FAILURE,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS
} from "../Constants/index";
import axios from "axios";
(axios.defaults.withCredentials = true),
  (axios.defaults.baseURL = "http://localhost:8000");

const loginUser = (formdata , navigate) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const response = await axios.post("/api/admin/sign_in", formdata , config);
    if (response.data.success) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data.User });
      navigate('/admin/dashboard')
    } else {
      dispatch({ type: USER_LOGIN_FAILURE, payload: response.data.message });
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.response.data.message,
    });
  }
};

const userAuthentication = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/admin/check_auth");
    if (response.data.success) {
      dispatch({ type: USER_AUTH_SUCCESS, payload: response.data.User });
    } else {
      dispatch({ type: USER_AUTH_FAILURE, payload: response.data.message });
    }
  } catch (error) {
    dispatch({ type: USER_AUTH_FAILURE, payload: error.response.data.message });
  }
};

const logoutUser = (navigate) => async (dispatch) => {
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    const response = await axios.get("/api/admin/logout");
    if (response.data.success) {
      dispatch({ type: USER_LOGOUT_SUCCESS });
      navigate('/admin/login')
    } else {
      dispatch({ type: USER_LOGOUT_FAILURE, payload: response.data.message });
    }
  } catch (error) {
    dispatch({
      type: USER_LOGOUT_FAILURE,
      payload: error.response.data.message,
    });
  }
};

const sendMailMessage = (formdata) => async (dispatch) => {
  dispatch({ type: MAIL_ALERT_REQUEST });
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const response = await axios.post("/api/send_message", formdata, config);
    if (response.data.success) {
      dispatch({ type: MAIL_ALERT_SUCCESS, payload: response.data.message });
    }
  } catch (error) {
    dispatch({
      type: MAIL_ALERT_FAILURE,
      payload: error.response.data.message,
    });
  }
};

const getDetailsMethod = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/get_details");
    if (response.data.success) {
      dispatch({ type: GET_DETAILS_SUCCESS, payload: response.data.Details });
    } else {
      dispatch({
        type: GET_DETAILS_FAILURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: GET_DETAILS_FAILURE,
      payload: error.response.data.message,
    });
  }
};

const updatePasswordMethod = (formdata) => async (dispatch) => {
  dispatch({ type: UPDATE_PASSWORD_REQUEST });
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const response = await axios.post(
      "/api/admin/update_password",
      formdata,
      config
    );
    if (response.data.success) {
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: response.data.User });
    } else {
      dispatch({
        type: UPDATE_PASSWORD_FAILURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAILURE,
      payload: error.response.data.message,
    });
  }
};

const uploadProjectMethod = (formdata) => async (dispatch) => {
  dispatch({ type: UPLOAD_PROJECT_REQUEST });
  try {
    const config = {
      headers: { "Content-Type": "formdata" },
    };
    const response = await axios.post(
      "/api/admin/add_project",
      formdata,
      config
    );

    if (response.data.success) {
      dispatch({
        type: UPLOAD_PROJECT_SUCCESS,
        payload: response.data.message,
      });
    } else {
      dispatch({
        type: UPLOAD_PROJECT_FAILURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    dispatch({ type: UPLOAD_PROJECT_FAILURE, payload: error.response.data.message });
  }
};

export {
  sendMailMessage,
  loginUser,
  logoutUser,
  userAuthentication,
  getDetailsMethod,
  updatePasswordMethod,
  uploadProjectMethod
};
