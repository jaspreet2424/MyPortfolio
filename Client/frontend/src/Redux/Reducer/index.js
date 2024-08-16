import {
  GET_DETAILS_FAILURE,
  GET_DETAILS_SUCCESS,
  MAIL_ALERT_FAILURE,
  MAIL_ALERT_REQUEST,
  MAIL_ALERT_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPLOAD_PROJECT_FAILURE,
  UPLOAD_PROJECT_REQUEST,
  UPLOAD_PROJECT_SUCCESS,
  USER_AUTH_FAILURE,
  USER_AUTH_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../Constants/index";

const initialState = {
  details: [],
  isLoading: false,
  success: "",
  failure: "",
};

const userInitialState = {
  User: {},
  isLoading: false,
  success: "",
  failure: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MAIL_ALERT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case MAIL_ALERT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload,
      };

    case MAIL_ALERT_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: action.payload,
      };

    case GET_DETAILS_SUCCESS:
      return {
        ...state,
        details: action.payload,
      };

    case GET_DETAILS_FAILURE:
      return {
        ...state,
        failure: action.payload,
      };

    default:
      return state;
  }
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        User: action.payload,
      };

    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: action.payload,
      };

    case USER_AUTH_SUCCESS:
      return {
        ...state,
        User: action.payload,
      };

    case USER_AUTH_FAILURE:
      return {
        ...state,
        failure: action.payload,
      };

    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: "Password Updated Successfully",
        User: action.payload,
      };

    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: action.payload,
      };

    case UPLOAD_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case UPLOAD_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload,
      };

    case UPLOAD_PROJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        failure: action.payload,
      };

    default:
      return state;
  }
};

export { reducer, userReducer };
