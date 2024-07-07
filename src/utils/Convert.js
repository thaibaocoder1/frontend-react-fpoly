export const convertBase64 = (file) => {
  const reader = new FileReader();
  reader.onload = () => {
    return reader.result.toString();
  };
  reader.readAsDataURL(file);
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
          if (file instanceof File) {
            formData.append(key, file);
          }
        });
      } else {
        formData.append(key, data[key][0]);
      }
    } else {
      formData.append(key, data[key]);
    }
  }
  return formData;
};
