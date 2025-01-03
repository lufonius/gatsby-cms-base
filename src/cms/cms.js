const CMS = require("decap-cms-app");

/**
 * Let's say you've created widget and preview components for a custom image
 * gallery widget in separate files:
 */
const { DecapCmsMediaLibraryCloudinary } = require("decap-cms-media-library-cloudinary");

console.log(DecapCmsMediaLibraryCloudinary, CMS);

CMS.registerMediaLibrary(DecapCmsMediaLibraryCloudinary);