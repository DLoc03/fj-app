import { DateFormat } from "../utils/validation.js";

export const CompanyResponse = {
  CompanyFound: ({
    _id,
    name,
    avatar,
    description,
    recruiterId,
    dateOfEstablishment,
    address,
    status,
    isDestroy,
    createdAt,
    updatedAt,
  }) => ({
    id: _id,
    name,
    avatar,
    description,
    recruiterId,
    DOE: DateFormat(dateOfEstablishment),
    address,
    status,
    isDestroy,
    createdAt: DateFormat(createdAt),
    updatedAt: DateFormat(updatedAt),
  }),

  Companies: ({
    _id,
    name,
    avatar,
    description,
    recruiterId,
    status,
    isDestroy,
    createdAt,
    updatedAt,
  }) => ({
    id: _id,
    name,
    avatar,
    description,
    recruiterId,
    status,
    isDestroy,
    createdAt: DateFormat(createdAt),
    updatedAt: DateFormat(updatedAt),
  }),

  Item: ({ _id, name, avatar }) => ({
    id: _id,
    name,
    avatar,
  }),
};
