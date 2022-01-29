export default function Upload() {
  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    const filename = encodeURIComponent(file.name);
    const res = await fetch(`/api/upload-url?file=${filename}`);
    const { url, fields } = await res.json();
    const formData = new FormData();

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    console.log(file);

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

  return (
    <>
      <p>Upload a .png or .jpg image (max 1MB).</p>
      <input onChange={uploadPhoto} type="file" accept="image/*" />
      <img
        src="https://recoverly-images.s3.ap-southeast-1.amazonaws.com/Screenshot+2021-11-15+at+10.18.09+PM.png"
        alt="Upload an image."
      />
    </>
  );
}
