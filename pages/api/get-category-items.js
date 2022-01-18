import axios from "axios";
import { store } from "../../data/store";

export default async function handler(req, res) {
  const data = getCategoryItems();

  res.status(200).json({
    message: "ok",
    items: data,
  });
}

export const getCategoryItems = () => {
  return { data: store };
};
