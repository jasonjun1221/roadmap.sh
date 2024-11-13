import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

type Props = {
  showAnswer: boolean;
  question: string;
  answer: string;
};

export default function FlashCard({ showAnswer, question, answer }: Props) {
  return (
    <Card variant="soft" sx={{ p: "90px", textAlign: "center", width: "400px", height: "150px", backgroundColor: "#F2F2F2" }}>
      <CardContent orientation="vertical">
        {showAnswer ? <Typography level="h4">{answer}</Typography> : <Typography level="h1">{question}</Typography>}
      </CardContent>
    </Card>
  );
}
