import { DateFormat } from "../utils/validation.js";

export const CompanyResponse = {
    CompanyFound: ({ _id, name, description, recruiterId, dateOfEstablishment, address, status, isDestroy, createdAt, updatedAt }) => ({
        id: _id,
        name,
        description,
        recruiterId,
        DOE: DateFormat(dateOfEstablishment),
        address,
        status,
        isDestroy,
        createdAt: DateFormat(createdAt),
        updatedAt: DateFormat(updatedAt)
    }),

    Companies: ({ _id, name, description, recruiterId, status, isDestroy, createdAt, updatedAt }) => ({
        id: _id,
        name,
        description,
        recruiterId,
        status,
        isDestroy,
        createdAt: DateFormat(createdAt),
        updatedAt: DateFormat(updatedAt)
    })
}