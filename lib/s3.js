import { v4 } from "uuid";

const uploadProfileImage = async (fileName, file) => {
  const filename = encodeURIComponent(fileName);
  const res = await fetch(`/api/upload-url?file=${filename}`);
  const { url, fields } = await res.json();
  const formData = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const upload = await fetch(url, {
    method: "POST",
    body: formData,
  }).catch((err) => {
    console.log("ERR: ", err);
  });

  if (upload.ok) {
    console.log("Uploaded successfully!");
  } else {
    console.error("Upload failed.");
  }
};

export const uploadFile = (fileName, file) => {
  const extension = file.name.split(".").pop();
  const final_name = `${fileName}_${v4()}_${v4()}.${extension}`;
  const url = `https://recoverly-images.s3.ap-southeast-1.amazonaws.com/${final_name}`;
  return uploadProfileImage(final_name, file)
    .then((_) => url)
    .catch((err) => console.log("err : ", err));
};

export const updateImage = (imageFile, fallbackUrl, file_slug) => {
  if (imageFile) {
    const extension = imageFile.name.split(".").pop();
    const fileName = `category-image-${file_slug}.${extension}`;
    const url = `https://recoverly-images.s3.ap-southeast-1.amazonaws.com/${fileName}`;
    return uploadProfileImage(fileName, imageFile).then((_) => url);
  }

  return new Promise((resolve, reject) => {
    resolve(fallbackUrl);
  });
};
