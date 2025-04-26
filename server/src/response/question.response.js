export const QuestionResponse = {
  Create: ({ _id, testId, question, isDestroy }) => ({
    id: _id,
    testId,
    question,
    isDestroy,
  }),
};
