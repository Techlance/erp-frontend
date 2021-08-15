const dataToForm = (data) => {
  const form = new FormData();
  for (let each in data) {
    if (data.hasOwnProperty(each)) {
      form.append([each], data[each]);
    }
  }

  return form;
};

export { dataToForm };
