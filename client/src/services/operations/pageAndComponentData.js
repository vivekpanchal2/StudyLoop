import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";
import { setLoading } from "../../slices/authSlice";

export const getCatalogaPageData = async (categoryId, dispatch) => {
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  let result = [];
  try {
    const response = await apiConnector(
      "POST",
      catalogData.CATALOGPAGEDATA_API,
      { categoryId: categoryId }
    );

    console.log("CATALOG PAGE DATA API RESPONSE....", response);
    if (!response.data.success)
      throw new Error("Could not Fetch Category page data error", response);

    result = response?.data;
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error("No Course added to this category yet");
    result = error.response?.data;
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
  return result;
};
