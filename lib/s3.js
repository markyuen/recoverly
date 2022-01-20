export const uploadProfileImage = async (fileName, file) => {
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

  console.log(upload);

  if (upload.ok) {
    console.log("Uploaded successfully!");
  } else {
    console.error("Upload failed.");
  }
};
