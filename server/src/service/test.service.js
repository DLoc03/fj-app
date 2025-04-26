import Company from "../model/company.js";
import Job from "../model/job.js";
import Question from "../model/question.js";
import Test from "../model/test.js";
import User from "../model/user.js";
import { MasterResponse } from "../response/master.response.js";
import { QuestionResponse } from "../response/question.response.js";
import { TestResponse } from "../response/test.response.js";
import { ERROR_CODE, STATUS } from "../utils/enum.js";
export const testService = {
  createTest: async (userId, jobId, data) => {
    const { title, description } = data;
    const user = await User.findOne({ _id: userId, isDestroy: false }).lean();
    const company = await Company.findOne({
      recruiterId: user._id,
      isDestroy: false,
      status: "Authenticated",
    });
    const job = await Job.findOne({
      _id: jobId,
      companyId: company._id,
      isDestroy: false,
    }).lean();
    if (!job)
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Job not found",
      });

    const existingTest = await Test.findOne({
      jobId: jobId,
      isDestroy: false,
    }).lean();

    if (!existingTest) {
      const newTest = new Test({
        jobId: job._id,
        title: title,
        description: description,
      });
      await newTest.save();
      return MasterResponse({
        status: STATUS.CREATED,
        errCode: ERROR_CODE.DONE,
        message: "Test was created",
        data: TestResponse.Client(newTest),
      });
    }
    return MasterResponse({
      status: STATUS.FAILED,
      errCode: ERROR_CODE.BAD_REQUEST,
      message: "Test was existed",
    });
  },

  getTest: async (testId) => {
    const test = await Test.findOne({ _id: testId, isDestroy: false }).lean();
    if (!test)
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Test not found",
      });

    const questions = await Question.find({
      testId: test._id,
      isDestroy: false,
    }).lean();

    const validTest = TestResponse.Client(test);
    const validQuestions = questions.map((q) => QuestionResponse.Create(q));
    return MasterResponse({
      data: {
        ...validTest,
        questions: validQuestions || [],
      },
    });
  },

  updateTest: async (userId, testId, data) => {
    const { title, description } = data;
    const company = await Company.findOne({
      recruiterId: userId,
      isDestroy: false,
    }).lean();
    if (!company)
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Company not found. You need to create company first",
      });
    const job = await Job.findOne({ companyId: company._id, isDestroy: false });
    if (!job)
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Job not found",
      });
    const test = await Test.findOne({
      _id: testId,
      isDestroy: false,
      jobId: job._id,
    }).lean();
    if (!test)
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Test not found",
      });
    const newData = await Test.findByIdAndUpdate(
      test._id,
      { title: title, description: description },
      { new: true }
    );
    return MasterResponse({
      status: STATUS.DONE,
      data: newData,
    });
  },

  deleteTest: async (userId, testId) => {
    const user = await User.findOne({ _id: userId, isDestroy: false }).lean();
    if (user.role === "admin") {
      const test = await Test.findById(testId).lean();
      if (test) {
        await Test.updateOne({ _id: test._id }, { isDestroy: true });
        await Question.updateMany({ jobId: test.jobId }, { isDestroy: true });
        return MasterResponse({
          message: "Test deleted success",
        });
      }
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Test not found",
      });
    }
    const company = await Company.findOne({
      recruiterId: user._id,
      isDestroy: false,
    }).lean();
    if (!company) {
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Company not found",
      });
    }
    const job = await Job.findOne({ companyId: company._id, isDestroy: false });
    if (!job)
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Job not found",
      });
    const test = await Test.findOne({
      _id: testId,
      jobId: job._id,
      isDestroy: false,
    }).lean();
    if (!test)
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Test not found",
      });
    await Test.updateOne({ _id: test._id }, { isDestroy: true });
    return MasterResponse({
      message: "Test deleted success",
    });
  },

  recoveryTest: async (userId, testId) => {
    const user = await User.findOne({ _id: userId, isDestroy: false }).lean();
    if (user.role === "admin") {
      const test = await Test.findOne({ _id: testId, isDestroy: true }).lean();
      if (test) {
        await Test.updateOne({ _id: test._id }, { isDestroy: false });
        return MasterResponse({
          message: "Test deleted success",
        });
      }
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Test not found",
      });
    }
    const company = await Company.findOne({
      recruiterId: user._id,
      isDestroy: false,
    }).lean();
    if (!company) {
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Company not found",
      });
    }
    const job = await Job.findOne({ companyId: company._id, isDestroy: false });
    if (!job)
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Job not found",
      });
    const test = await Test.findOne({
      jobId: job._id,
      _id: testId,
      isDestroy: true,
    }).lean();
    if (!test)
      return MasterResponse({
        status: STATUS.NOT_FOUND,
        errCode: ERROR_CODE.BAD_REQUEST,
        message: "Test not found",
      });
    await Test.findByIdAndUpdate(test._id, { isDestroy: false });
    return MasterResponse({
      message: `The test ${testId} was recovery successfully`,
      data: TestResponse.Client(test),
    });
  },
};
