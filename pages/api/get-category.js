const categories = [
  "apparel",
  "consumer electronics",
  "electrical and electronics",
  "household living",
  "jewelry & watches",
  "tools & machineries",
];

const url_template =
  "https://recoverly-images.s3.ap-southeast-1.amazonaws.com/category-{}.png";

export default async function handler(req, res) {
  const category_and_link = categories.map((item) => {
    const url_slug = item.split(" ").join("-").toLowerCase();
    return {
      name: item,
      image_url: url_template.replace("{}", url_slug),
    };
  });

  res.status(200).json({
    message: "ok",
    categories: category_and_link,
  });
}
