import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const getCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories.php`);
  return response.data.categories;
};

export const getMealsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
  return response.data.meals;
};

export const getMealDetail = async (id) => {
  const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
  return response.data.meals[0];
};
