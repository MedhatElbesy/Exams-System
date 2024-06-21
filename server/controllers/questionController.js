const Exam = require("../models/Exam");
const Question = require("../models/Question");
const errorHandler = require("../utils/errorHandler");

const addQuestion = async (req, res) => {
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

const getQuestions = async (req, res) => {
  const { examId } = req.params;

  try {
    const questions = await Question.find({ examId });
    if (!questions) {
      return res.status(404).json({ message: "Questions not found" });
    }

    res.json(questions);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question, options, answer } = req.body;

  try {
    const updatedgQuestion = await Question.findById(id);
    if (!updatedgQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    updatedgQuestion.question = question;
    updatedgQuestion.options = options;
    updatedgQuestion.answer = answer;

    await updatedgQuestion.save();

    res.json({
      message: "Question updated successfully",
      question: updatedgQuestion,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteQuestion = async (req, res) => {
  const { examId, id } = req.params;

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await question.deleteOne();

    const exam = await Exam.findById(examId);
    if (exam) {
      exam.questions.pull({ _id: id });
      await exam.save();
    }

    res.json({ message: "question deleted successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
};
