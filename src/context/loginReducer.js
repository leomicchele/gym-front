export function loginReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        login: true,
        loading: false,
        error: false,
        success: false,
        formInputError: false,
        formInputSuccess: false
        // user: action.payload.user
      };
    case 'LOADING':
      return {
        ...state,
        login: false,
        loading: true,
        error: false,
        success: false,
        formInputError: false,
        formInputSuccess: false
      };
      case 'ERROR':
        return {
          ...state,
          login: false,
          loading: false,
          error: true,
          success: false,
          formInputError: false,
          formInputSuccess: false
        };
      case 'SUCCESS':
        return {
          ...state,
          login: false,
          loading: false,
          error: false,
          success: true,
          formInputError: false,
          formInputSuccess: false
        };
      case 'CLOSED_SESSION':
        return {
          ...state,
          login: false,
          loading: false,
          error: false,
          success: false,
          user: null,
          formInputError: false,
          formInputSuccess: false
        };
      case 'FORM_ERROR':
        return {
          ...state,
          login: false,
          loading: false,
          error: false,
          success: false,
          user: null,
          formInputError: true,
          formInputSuccess: false
        };
        case 'FORM_SUCCESS':
          return {
            ...state,
            login: false,
            loading: false,
            error: false,
            success: false,
            user: null,
            formInputError: false,
            formInputSuccess: true
          };
        case 'FORM_NEUTRAL':
          return {
            ...state,
            login: false,
            loading: false,
            error: false,
            success: false,
            user: null,
            formInputError: false,
            formInputSuccess: false
          };
    default:
      return state;
  }
}