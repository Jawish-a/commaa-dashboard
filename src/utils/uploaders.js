import AxiosInstance from "./axios-instance";

export async function uploadImage({
  event: e,
  beforeUploading = () => {},
  maxSizeInKB = 5120,
  onMaxSizeExcceded = () => {},
  allowedExtensions = ["png", "jpg", "jpeg", "svg"],
  onAllowedExtensionsError = () => {},
  onUploadProgress = () => {},
  onSuccess = () => {},
  whenFinish = () => {},
}) {
  beforeUploading();
  const file = e.target.files?.[0];
  if (!file) return;
  const isAllowedSize = file.size / 1000 < maxSizeInKB;
  if (!isAllowedSize) return onMaxSizeExcceded(file.size / 1000);

  const extension = file.name.split(".")?.pop().toLowerCase();

  if (!allowedExtensions.includes(extension))
    return onAllowedExtensionsError(allowedExtensions);

  try {
    const form = new FormData();
    form.append("file", file, file.name);
    const { data } = await AxiosInstance.post("/upload/upload", form, {
      onUploadProgress,
    });

    onSuccess(data);
    whenFinish(true);
  } catch (error) {
    whenFinish(false);
  }
}

// const onThumbnailChange = async (e) => {
//   setThumbnailError(null);
//   const file = e.target.files?.[0];
//   if (!file) return;
//   const isAllowedSize = file.size / 1000 < 5120;
// if (!isAllowedSize)
//   return setThumbnailError(
//     <FormattedMessage id="image max size" values={{ limit: "5MB" }} />
//   );

//   const extension = file.name.split(".")?.pop().toLowerCase();
//   const allowed_extensions = ["png", "jpg", "jpeg", "svg"];

//   if (!allowed_extensions.includes(extension)) {
//     return setThumbnailError(
//       <FormattedMessage
//         id="only these file types"
//         values={{ type: allowed_extensions.join(", ") }}
//       />
//     );
//   }

//   try {
//     const form = new FormData();
//     form.append("file", file, file.name);
//     const { data } = await AxiosInstance.post("/upload/upload", form, {
//       onUploadProgress(progress) {
//         setThumbnailUploading(
//           Math.round((progress.loaded * 100) / progress.total)
//         );
//       },
//     });

//     const obj = {
//       key: data.Key,
//       path: data.Location,
//     };

//     if (imgRef.current) {
//       imgRef.current.src = data.Location;
//     }
//     setValue("thumbnail", obj, true);
//   } catch (error) {}
//   setThumbnailUploading(0);
// };
