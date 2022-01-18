import axios from "axios";

export default async function handler(req, res) {
  const data = getCategoryItems();

  res.status(200).json({
    message: "ok",
    items: data,
  });
}

export const getCategoryItems = () => {
  return axios.get(process.env.NEXT_PUBLIC_DB_PRODUCTS_API);
};
