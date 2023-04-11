import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

const cloudinaryUpload = async (files) => {
  const fileUrl = [];

  for (let file of files.profile_picture) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "neatly/profile-picture-uploading",
      type: "private",
    });
    fileUrl.push({
      url: result.secure_url,
      publicId: result.public_id,
    });
    await fs.unlink(file.path);
  }

  return fileUrl;
};

export { cloudinaryUpload };
