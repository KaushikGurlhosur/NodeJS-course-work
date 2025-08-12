// export const generateBase64FromImage = (imageFile) => {
//   const reader = new FileReader();
//   const promise = new Promise((resolve, reject) => {
//     reader.onload = (e) => resolve(e.target.result);
//     reader.onerror = (err) => reject(err);
//   });

//   reader.readAsDataURL(imageFile);
//   return promise;
// };
export const generateBase64FromImage = (imageFile) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
  }).finally(() => reader.readAsDataURL(imageFile));
};
