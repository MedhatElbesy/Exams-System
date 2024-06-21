const Exam = require("../models/Exam");
const Question = require("../models/Question");
const errorHandler = require("../utils/errorHandler");

const createExam = async (req, res) => {
  const { title, description, duration } = req.body;
  try {
    const exam = new Exam({ title, description, duration });
    await exam.save();
    res.status(201).json({ id: exam._id });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate({
      path: "questions",
      select: "-answer",
    });
    res.json(exams);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getExamById = async (req, res) => {
  const { id } = req.params;

  try {
    const exam = await Exam.findById(id, {
      "questions": 0,
    });
    if (!exam) {
      return res.status(404).json({ message: "exam not found" });
    }
    res.json(exam);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateExam = async (req, res) => {
  const { id } = req.params;
  const { title, description, questions } = req.body;

  try {
    const updatedExam = await Exam.findByIdAndUpdate(
      id,
      { title, description, questions },
      { new: true }
    );
    if (!updatedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json({message: "exam updated successfully"});
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteExam = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExam = await Exam.findByIdAndDelete(id);
    if (!deletedExam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    await Question.deleteMany({ examId: id });

    res.json({ message: "Exam and associated questions deleted successfully" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
};
