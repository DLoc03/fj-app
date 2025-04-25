export const QuestionResponse = {
  Create: ({ _id, jobId, question }) => ({
    id: _id,
    jobId,
    question,
  }),
};
