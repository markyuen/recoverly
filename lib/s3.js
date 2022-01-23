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
  });

  if (upload.ok) {
    console.log("Uploaded successfully!");
  } else {
    console.error("Upload failed.");
  }
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
