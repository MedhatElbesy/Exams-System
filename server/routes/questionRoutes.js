const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  addQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

router.get("/:examId", authMiddleware, roleMiddleware, getQuestions);
router.post("/", authMiddleware, roleMiddleware, addQuestion);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware,
  updateQuestion
);

router.delete(
  "/:examId/:id",
  authMiddleware,
  roleMiddleware,
  deleteQuestion
);

module.exports = router;
