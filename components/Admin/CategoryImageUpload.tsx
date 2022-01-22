import React from "react";
import Image from "next/image";

type CategoryImageUploadProps = {
  image_url: string;
  onChange: (any) => void;
};

const CategoryImageUpload = ({ image_url, onChange }) => {
  const [tempImageUrl, setImageUrl] = React.useState(image_url);

  const updateTempImage = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const tempUrl = URL.createObjectURL(e.target.files[0]);
    setImageUrl(tempUrl);
    onChange(e.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center ">
      {tempImageUrl ? (
        <div className="mb-4">
          <Image alt="item_image" src={tempImageUrl} width={100} height={100} />
        </div>
      ) : (
        <p>No Uploaded Image </p>
      )}
      <div>
        <p>Upload a .png or .jpg image (max 4MB).</p>
        <input
          onChange={updateTempImage}
          type="file"
          accept="image/png, image/jpeg"
        />
      </div>
    </div>
  );
};

export default CategoryImageUpload;
