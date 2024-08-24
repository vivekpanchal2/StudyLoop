import axios from "axios";

const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, params, headers) => {
  console.log({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    params: params ? params : null,
    headers: headers ? headers : null,
  });

  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    params: params ? params : null,
    headers: headers ? headers : null,
  });
};
