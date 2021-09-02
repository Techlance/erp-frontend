const dataToForm = (data) => {
  const form = new FormData();

  for (let each in data) {
    if (data.hasOwnProperty(each)) {
      if (data[each] !== null) {
        form.append([each], data[each]);
      }
    }
  }

  return form;
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default formatDate;

export { dataToForm, formatDate };
