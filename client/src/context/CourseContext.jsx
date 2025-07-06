import React, { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

const CourseContext = createContext();

const initialState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,
};

const courseReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_COURSES_START":
      return { ...state, loading: true, error: null };
    case "FETCH_COURSES_SUCCESS":
      return {
        ...state,
        courses: action.payload,
        loading: false,
        error: null,
      };
    case "FETCH_COURSES_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "FETCH_COURSE_SUCCESS":
      return {
        ...state,
        currentCourse: action.payload,
        loading: false,
        error: null,
      };
    case "CREATE_COURSE_SUCCESS":
      return {
        ...state,
        courses: [...state.courses, action.payload],
        loading: false,
        error: null,
      };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

export const CourseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(courseReducer, initialState);

  const fetchCourses = async () => {
    dispatch({ type: "FETCH_COURSES_START" });
    try {
      const response = await axios.get("http://localhost:5000/api/courses");
      dispatch({ type: "FETCH_COURSES_SUCCESS", payload: response.data });
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch courses";
      dispatch({ type: "FETCH_COURSES_FAIL", payload: message });
    }
  };

  const fetchCourseById = async (id) => {
    dispatch({ type: "FETCH_COURSES_START" });
    try {
      const response = await axios.get(
        `http://localhost:5000/api/courses/${id}`
      );
      dispatch({ type: "FETCH_COURSE_SUCCESS", payload: response.data });
    } catch (error) {
      const message = error.response?.data?.message || "Failed to fetch course";
      dispatch({ type: "FETCH_COURSES_FAIL", payload: message });
    }
  };

  const createCourse = async (courseData) => {
    dispatch({ type: "FETCH_COURSES_START" });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        "http://localhost:5000/api/courses",
        courseData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      dispatch({ type: "CREATE_COURSE_SUCCESS", payload: response.data });
      return { success: true, course: response.data };
    } catch (error) {
      let message;
      if (error.response?.status === 403) {
        message = "You are not authorized to create courses";
      } else {
        message = error.response?.data?.message || "Failed to create course";
      }
      dispatch({ type: "FETCH_COURSES_FAIL", payload: message });
      return { success: false, error: message };
    }
  };

  const uploadCourseImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        "http://localhost:5000/api/courses/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
      );
      return { success: true, imagePath: response.data.image };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to upload image";
      return { success: false, error: message };
    }
  };

  const addLessonToCourse = async (courseId, lessonData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/courses/${courseId}/lessons`,
        lessonData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return { success: true, lesson: response.data };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add lesson";
      return { success: false, error: message };
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value = {
    courses: state.courses,
    currentCourse: state.currentCourse,
    loading: state.loading,
    error: state.error,
    fetchCourses,
    fetchCourseById,
    createCourse,
    uploadCourseImage,
    addLessonToCourse,
    clearError,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
};
