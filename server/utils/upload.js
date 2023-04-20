import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

const cloudinaryUpload = async (files) => {
  // validate profile picture have been filled in.
  if (!files.profile_picture) {
    return { message: "Please fill in profile picture" };
  } else {
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
  }
};

export { cloudinaryUpload };
