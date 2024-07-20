export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result.toString());
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};
export const converMutipletBase64 = (files) => {
  return new Promise((resolve, reject) => {
    if (!files) {
      reject("No files provided");
    }
    if (!Array.isArray(files)) {
      files = [files];
    }
    const promises = files.map((file) => {
      return new Promise((resolveFile, rejectFile) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolveFile(reader.result.toString());
        };
        reader.onerror = (error) => {
          rejectFile(error);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const convertObjToFormData = (data) => {
  const formData = new FormData();
  for (const key in data) {
    if (key === "imageUrl") {
      if (Array.isArray(data[key])) {
        data[key].forEach((file) => {
          if (file instanceof File && !file._id) {
            formData.append(key, file);
          } else {
            formData.append(key, file._id);
          }
        });
      } else {
        const conditon =
          data[key] instanceof FileList ? data[key][0] : data[key];
        formData.append(key, conditon);
      }
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};
export const convertPercent = (total, count) => {
  if (total === 0) return 0;
  return (count / total) * 100;
};
