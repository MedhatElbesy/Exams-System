import React from "react";
import { Button, Box } from "@mui/material";
import QuestionCard from "./QuestionCard";

const AnswerForm = ({ exam, answers, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      {exam.questions.map((question, index) => (
        <QuestionCard
          key={question._id}
          question={question}
          index={index}
          selectedOption={
            answers.find((ans) => ans.questionId === question._id)
              ?.selectedOption || ""
          }
          handleChange={handleChange}
        />
      ))}
      <Box sx={{ textAlign: "center" }}>
        <Button
          type="submit"
          variant="outlined"
          className="main-borderColor sec-textColor"
          sx={{ mt: 3, fontWeight: "bold" }}
        >
          Submit Exam
        </Button>
      </Box>
    </form>
  );
};

export default AnswerForm;
