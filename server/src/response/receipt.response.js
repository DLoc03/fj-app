import { DateFormat } from "../utils/validation.js";

export const ReceiptResponse = {
  Client: ({ _id, userId, packageId, amount, createdAt }) => ({
    id: _id,
    userId,
    packageId,
    amount: `${amount} VND`,
    createdAt: DateFormat(createdAt),
  }),
};
