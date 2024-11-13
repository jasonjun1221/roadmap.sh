import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";

type Props = {
  index: number;
  data: { question: string; answer: string }[];
};

export default function ProgressBar({ index, data }: Props) {
  const progress = ((index + 1) / data.length) * 100;

  return (
    <Box sx={{ bgcolor: "white", width: "100%", display: "flex" }}>
      <LinearProgress
        determinate
        variant="outlined"
        color="neutral"
        size="sm"
        thickness={40}
        value={progress}
        sx={{
          "--LinearProgress-radius": "10px",
          "--LinearProgress-progressThickness": "32px",
          boxShadow: "sm",
          borderColor: "lightgrey",
        }}
      >
        <Typography level="body-xs" textColor="common.white" sx={{ fontSize: "medium", mixBlendMode: "difference" }}>
          {`${progress.toFixed()}%`}
        </Typography>

        <Typography
          level="body-xs"
          textColor="common.white"
          sx={{ fontSize: "medium", mixBlendMode: "difference", position: "absolute", right: "15px" }}
        >
          {`${index + 1} of ${data.length}`}
        </Typography>
      </LinearProgress>
    </Box>
  );
}
