const multer = require("multer");
const ApiError = require("../utils/apiError");

// 1- DiskStorage engine
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "uploads/categories");
//   },
//   filename: function (req, file, callback) {
//     // category_${id}_Date.now().png
//     const ext = file.mimetype.split("/")[1];
//     const filename = `category_${uuidv4()}_${Date.now()}.${ext}`;
//     callback(null, filename);
//   },
// });
//
// 2- Memory storage engine

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, callback) {
    // image/png
    if (file.mimetype.startsWith("image")) {
      callback(null, true);
    } else {
      callback(new ApiError("Only images allowed", 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

exports.uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);
