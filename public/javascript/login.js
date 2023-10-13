/* eslint-disable */

import axios from "axios";
import { showAlert } from "./alerts";

export const signup = async (AuthorName, Email, PhoneNumber, Password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "https://akpofures-library-gdql.onrender.com/authors/",
      data: {
        AuthorName,
        Email,
        PhoneNumber,
        Password,
      },
    });
    if (res.statusText === "Created") {
      showAlert("success", "Signed up successfully");
      window.setTimeout(() => {
        location.assign("/api");
      }, 1500);
    }
  } catch (error) {
    showAlert("error", error.response.data.message);
  }
};

export const login = async (Email, Password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "https://akpofures-library-gdql.onrender.com/authors/login",
      data: {
        Email,
        Password,
      },
    });
    if (res.status === 200) {
      showAlert("success", "Logged in successfully");
      window.setTimeout(() => {
        location.assign("/api");
      }, 1500);
    }
  } catch (error) {
    showAlert("error", error.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "POST",
      url: "https://akpofures-library-gdql.onrender.com/authors/logout",
    });
    if (res.status === 200) {
      showAlert("success", "Logged out successfully");
      window.setTimeout(() => {
        window.location.assign("/api");
      }, 1500);
    }
  } catch (error) {
    showAlert("error", "Failed to log out! Try again.");
  }
};
