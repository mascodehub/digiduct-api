const { v2: cloudinary } = require("cloudinary");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const streamifier = require("streamifier"); // ← penting!

const storage = multer.memoryStorage();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

async function uploadFile(fileBuffer) {
  return new Promise((resolve, reject) => {
    const uuid = uuidv4();

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET,
    });

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: uuid,
        resource_type: "auto", // otomatis deteksi image/video
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          const optimizeUrl = cloudinary.url(uuid, {
            fetch_format: "auto",
            quality: "auto",
          });

          const autoCropUrl = cloudinary.url(uuid, {
            crop: "auto",
            gravity: "auto",
            width: 500,
            height: 500,
          });

          resolve({
            original: result.secure_url,
            optimized: optimizeUrl,
            cropped: autoCropUrl,
          });
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
}

function uploadFileLocal() {
  const fileFilter = (req, file, cb) => {
    const extFilter = /\.(jpg|png|webp|jpeg|svg|mov|mp4)/;
    if (file.originalname.toLowerCase().match(extFilter)) {
      cb(null, true);
    } else {
      cb(new Error("Your file ext are denied ❌"));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 },
  });
}

module.exports = {
  uploadFile,
  uploadFileLocal,
};
