import { DateFormat } from "../utils/validation.js";

export const PackageResponse = {
  Client: ({ _id, name, price, color, description, createdAt, updatedAt }) => ({
    id: _id,
    name,
    price: `${price} VND`,
    color,
    description,
    createdAt: DateFormat(createdAt),
    updatedAt: DateFormat(updatedAt),
  }),
};
