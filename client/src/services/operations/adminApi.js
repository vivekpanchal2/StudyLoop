import { apiConnector } from "../apiconnector";
import { adminEndPoints } from "./../apis";
import toast from "react-hot-toast";
const {
  GET_ALL_STUDENTS_DATA_API,
  GET_ALL_INSTRUCTORS_DATA_API,
  DELETE_CATEGORY,
  CREATE_NEW_CATEGORY,
} = adminEndPoints;

export async function getAllStudentsData(token) {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_STUDENTS_DATA_API,
      null,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_ALL_STUDENTS_DATA_API RESPONSE............", response);
    result = response?.data;
  } catch (error) {
    console.log("GET_ALL_STUDENTS_DATA_API ERROR............", error);
  }
  return result;
}

export async function getAllInstructorDetails(token) {
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTORS_DATA_API,
      null,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_ALL_INSTRUCTORS_DATA_API RESPONSE............", response);
    result = response?.data;
  } catch (error) {
    console.log("GET_ALL_INSTRUCTORS_DATA_API ERROR............", error);
  }
  return result;
}

export const createNewCategory = async (name, description, token) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector(
      "POST",
      CREATE_NEW_CATEGORY,
      { name, description },
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CREATE_NEW_CATEGORY RESPONSE............", response);
    if (!response?.data?.success) {
      console.log("Could Not create new category");
    }

    toast.success("New Category Created !");
  } catch (error) {
    console.log("CREATE_NEW_CATEGORY API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};

export const deleteCategory = async (categoryId, token) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_CATEGORY,
      { categoryId },
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("DELETE_CATEGORY RESPONSE............", response);
    if (!response?.data?.success) {
      console.log("Could Not delete category");
    }

    toast.success("Category Deleted !");
  } catch (error) {
    console.log("DELETE_CATEGORY API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};
