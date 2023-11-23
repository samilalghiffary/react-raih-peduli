import axiosWithConfig from "../axiosWithConfig";

export const getFundraises = async (pageIndex, pageSize) => {
  try {
    const response = await axiosWithConfig.get(
      `/fundraises?page=${pageIndex}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFundraiseByTitle = async (title) => {
  try {
    const response = await axiosWithConfig.get(`/fundraises?title=${title}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDetailFundraise = async (id) => {
  try {
    const response = await axiosWithConfig.get(`/fundraises/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addFundraise = async ({ ...data }) => {
  try {
    const response = await axiosWithConfig.post("/fundraises", {
      ...data,
    });
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editFundraise = async (id, { ...data }) => {
  try {
    const response = await axiosWithConfig.put(`/fundraises/${id}`, {
      ...data,
    });
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFundraise = async (id) => {
  try {
    const response = await axiosWithConfig.delete(`/fundraises/${id}`);
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateStatusFundraise = async (id, status) => {
  try {
    const response = await axiosWithConfig.patch(`/fundraises/${id}`, {
      status,
    });
    return response.data.message;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
