import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FormInput from "../Form/FormInput";
import { updateImage } from "../../lib/s3";
import SpinnerWithMessage from "../Common/SpinnerWithMessage";

const UserProfile = () => {
  const { user } = useUser();
  const [loadingData, setLoadingData] = useState(true);
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (!user) return;
    setUserData({
      email: user.email,
      nickname: user.nickname,
      picture: user.picture,
    })
    setLoadingData(false)
  }, [user]);

  const updateLocalImage = (e) => {
    const filename = URL.createObjectURL(e.target.files[0]);
    setUserData({ ...userData, picture: filename });
    setProfileImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    const extension = profileImage.name.split(".").pop();
    const fileName = `profile-image-${userData.nickname}.${extension}`;
    //TODO: Add some chained toasts for this
    updateImage(profileImage, fileName, fileName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profileImage) {
      uploadImage();
    }
  };

  if (loadingData) {
    return <SpinnerWithMessage label="Configuring Page" />;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="space-y-8  sm:space-y-5">
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <FormInput
              type="email"
              value={userData.email}
              onChange={null}
              label="Email"
              disabled={true}
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
                    onChange={updateLocalImage}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
