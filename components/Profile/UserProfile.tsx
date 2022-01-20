import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import React, { useState } from "react";
import FormInput from "../Form/FormInput";
import { uploadProfileImage } from "../../lib/s3";

const UserProfile = () => {
  const { user } = useUser();

  const { email, nickname, picture } = user;

  const [userData, setUserData] = useState({
    email,
    username: nickname,
    picture,
  });
  const [profileImage, setProfileImage] = useState(null);

  const updateKeyValue = (key, value) => {
    const newUserData = { ...userData };
    newUserData[key] = value;
    setUserData(newUserData);
  };

  const updateImage = (e) => {
    const filename = URL.createObjectURL(e.target.files[0]);
    setUserData({ ...userData, picture: filename });
    setProfileImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    const extension = profileImage.name.split(".").pop();
    const fileName = `profile-image-${nickname}.${extension}`;
    uploadProfileImage(fileName, profileImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profileImage) {
      uploadImage();
    }
    console.log("----Submitting Information Of ----- ");
    console.log(userData);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-8  sm:space-y-5">
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <FormInput
              type="email"
              value={userData.email}
              onChange={(e) => updateKeyValue("email", e.target.value)}
              label="Email"
            />
            <FormInput
              type="text"
              value={userData.username}
              onChange={(e) => updateKeyValue("username", e.target.value)}
              label="Username"
            />

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <Image
                      src={userData.picture}
                      height={100}
                      width={100}
                      alt="profile"
                    />
                  </span>
                  <input
                    className="ml-5 bg-white py-2 px-3  text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onChange={updateImage}
                    type="file"
                    accept="image/png, image/jpeg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
