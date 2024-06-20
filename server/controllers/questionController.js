const Exam = require("../models/Exam");
const Question = require("../models/Question");
const errorHandler = require("../utils/errorHandler");

const addQuestion = async (req, res) => {
  // const { id } = req.params;
  const { examId, question, options, answer } = req.body;

  try {
    const newQuestion = new Question({ examId, question, options, answer });
    await newQuestion.save();

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    exam.questions.push(newQuestion._id);
    await exam.save();

    res.status(201).json({ message: "question created successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateQuestion = async (req, res) => {
  const { examId, questionId } = req.params;
  const { question, options, answer } = req.body;

  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const existingQuestion = exam.questions.id(questionId);
    if (!existingQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    existingQuestion.question = question;
    existingQuestion.options = options;
    existingQuestion.answer = answer;

    await exam.save();

    res.json(exam.questions);
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteQuestion = async (req, res) => {
  const { examId, questionId } = req.params;

  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    exam.questions.pull({ _id: questionId });
    await exam.save();

    res.json(exam.questions);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addQuestion,
  updateQuestion,
  deleteQuestion,
};
