import { DateFormat } from "../utils/validation.js";

export const PackageResponse = {
  Client: ({ _id, name, price, description, createdAt, updatedAt }) => ({
    id: _id,
    name,
    price: price,
    description,
    createdAt: DateFormat(createdAt),
    updatedAt: DateFormat(updatedAt),
  }),
};
