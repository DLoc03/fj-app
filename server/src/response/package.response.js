import { DateFormat } from "../utils/validation.js";

export const PackageResponse = {
  Client: ({ _id, name, price, code, description, createdAt, updatedAt }) => ({
    id: _id,
    name,
    price: `${price} VND`,
    code,
    description,
    createdAt: DateFormat(createdAt),
    updatedAt: DateFormat(updatedAt),
  }),
};
