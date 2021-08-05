import { dataToForm } from "../utils";

const createCompanyAsync = async (instance, data) => {
  const form = dataToForm(data);
  const response = await instance.post("/company/create-company", form);

  return { ...response.data };
};

export { createCompanyAsync };
