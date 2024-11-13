import { useState } from "react";
import Typography from "@mui/joy/Typography";
import ProgressBar from "./components/ProgressBar";
import Container from "./components/Container";
import data from "./data/flash-cards.json";

export default function App() {
  const [index, setIndex] = useState(0);

  return (
    <main>
      <Typography level="h2">Flash Cards</Typography>
      <ProgressBar index={index} data={data} />
      <Container index={index} setIndex={setIndex} data={data} />
    </main>
  );
}
