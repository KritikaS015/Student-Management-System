import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  stuffDone,
} from "./studentSlice";

export const getAllStudents = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/Students/${id}`
    );
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError({ message: error.message }));
  }
};

export const updateStudentFields =
  (id, fields, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
      const result = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/${address}/${id}`,
        fields,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data.message) {
        dispatch(getFailed(result.data.message));
      } else {
        dispatch(stuffDone());
      }
    } catch (error) {
      dispatch(getError({ message: error.message }));
    }
  };

export const removeStuff = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/${address}/${id}`
    );
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(stuffDone());
    }
  } catch (error) {
    dispatch(getError({ message: error.message }));
  }
};