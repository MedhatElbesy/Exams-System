const Exam = require("../models/Exam");
const ExamResult = require("../models/ExamResult");
const Question = require("../models/Question"); // Import Question model

const clacScore = async (exam, answers) => {
  // Initialize score
  let score = 0;

  // Fetch all questions for the exam
  const examQuestions = await Question.find({ _id: { $in: exam.questions } });

  // Compare user's answers with correct answers
  for (const answer of answers) {
    const question = examQuestions.find(
      (q) => q._id.toString() === answer.questionId
    );

    if (question && question.answer === answer.selectedOption) {
      score += 1;
    }
  }
  return score;
};

const submitExamResult = async (req, res) => {
  const { examId } = req.params;
  const { answers } = req.body;

  try {
    // Fetch the exam with question IDs
    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Check if there's an existing result for this exam and student
    let result = await ExamResult.findOne({
      exam: examId,
      student: req.user.id,
    });

    if (result) {
      // Update existing result
      result.answers = answers;
      result.score = await clacScore(exam, answers);
    } else {
      // Create new result
      result = new ExamResult({
        exam: examId,
        student: req.user.id,
        answers,
        score: await clacScore(exam, answers),
      });
    }

    await result.save();

    res.status(201).json({ message: "Exam answers submitted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to submit exam results " + error.message });
  }
};

// Controller function to fetch all exam results
const getExamResults = async (req, res) => {
  const { examId } = req.params;

  try {
    const result = await ExamResult.find({
      exam: examId,
      student: req.user.id,
    })
      .populate("exam", "title")
      .select("_id score")
      .exec();
      console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch exam results" });
  }
};

module.exports = {
  submitExamResult,
  getExamResults,
};
