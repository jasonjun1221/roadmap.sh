import { useState } from "react";
import Box from "@mui/joy/Box";
import FlashCard from "./FlashCard";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";

type Props = {
  index: number;
  setIndex: (index: number) => void;
  data: { question: string; answer: string }[];
};

export default function Container({ index, setIndex, data }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
      setShowAnswer(false);
    }
  };

  const handleNext = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setShowAnswer(false);
    }
  };

  return (
    <Box sx={{ p: 0.5, border: "1px solid lightgrey", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
      <FlashCard showAnswer={showAnswer} question={data[index].question} answer={data[index].answer} />

      <Card variant="soft" sx={{ p: 0.5, backgroundColor: "#F2F2F2" }}>
        <CardContent orientation="horizontal" sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="plain" color="neutral" startDecorator={"<"} onClick={handlePrevious}>
            Previous
          </Button>

          <Button variant="plain" color="neutral" onClick={() => setShowAnswer(!showAnswer)}>
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </Button>

          <Button variant="plain" color="neutral" endDecorator={">"} onClick={handleNext}>
            Next
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
