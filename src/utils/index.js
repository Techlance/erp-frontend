const dataToForm = (data) => {
  const form = new FormData();
  for (let each in data) {
    if (data[each]) {
      form.append([each], data[each]);
    }
  }

  return form;
};

export { dataToForm };
