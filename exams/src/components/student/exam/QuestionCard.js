import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const QuestionCard = ({ question, index, selectedOption, handleChange }) => {
  return (
    <Card
      key={question._id}
      sx={{
        mb: 2,
        boxShadow: 3,
        borderRadius: 8,
        p: 2,
      }}
    >
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar
              sx={{
                bgcolor: "#3f51b5",
                width: 30,
                height: 30,
                fontSize: "1rem",
              }}
            >
              {index + 1}
            </Avatar>
          </Grid>
          <Grid item xs={11}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ fontWeight: "bold", fontSize: "1.2rem", my: 0 }}
            >
              {question.question}
            </Typography>
          </Grid>
        </Grid>
        <FormControl component="fieldset" sx={{ mx: 3, mt: 2, width: "100%" }}>
          <RadioGroup
            aria-label={`question_${question._id}`}
            name={`question_${question._id}`}
            value={selectedOption}
            onChange={(e) => handleChange(e, question._id)}
          >
            {question.options.map((option, idx) => (
              <FormControlLabel
                key={idx}
                value={option}
                control={<Radio sx={{ color: "#3f51b5" }} />}
                label={
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      color: "#333", // Darker text color
                    }}
                  >
                    {option}
                  </Typography>
                }
                sx={{
                  width: "100%",
                  mb: 1,
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
