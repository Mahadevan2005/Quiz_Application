import React from "react";
import { Box, Typography, Button, Grid, Stack } from "@mui/material";

export default function Navigator({ total, current, visited, attempted, goTo }) {
  const getButtonStyle = (index) => {
    if (index === current) {
      return { variant: "contained", color: "primary" }; // Current (Blue filled)
    } else if (attempted.has(index)) {
      return { variant: "contained", color: "success" }; // Attempted (Green filled)
    } else if (visited.has(index)) {
      return {
        variant: "contained",
        sx: { backgroundColor: "grey.500", "&:hover": { backgroundColor: "grey.600" } },
      }; // Visited but unanswered (Gray filled)
    } else {
      return { variant: "outlined", color: "inherit" }; // Not visited (Normal outline)
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Question Navigator
      </Typography>

      <Grid container spacing={1}>
        {Array.from({ length: total }).map((_, idx) => {
          const style = getButtonStyle(idx);
          return (
            <Grid item xs={3} sm={2} md={3} lg={3} key={idx}>
              <Button
                fullWidth
                {...style}
                sx={{
                  borderRadius: "50%",
                  minWidth: "40px",
                  height: "40px",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                  ...style.sx, // merge extra styles if provided
                }}
                onClick={() => goTo(idx)}
              >
                {idx + 1}
              </Button>
            </Grid>
          );
        })}
      </Grid>

      {/* Legend */}
      <Stack direction="row" spacing={2} sx={{ mt: 3, flexWrap: "wrap" }}>
        <LegendDot color="primary.main" label="Current" />
        <LegendDot color="success.main" label="Attempted" />
        <LegendDot color="grey.500" label="Visited" />
        <LegendDot border label="Not Visited" />
      </Stack>
    </Box>
  );
}

function LegendDot({ color, label, border }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box
        sx={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: border ? "transparent" : color,
          border: border ? "2px solid #999" : "none",
        }}
      />
      <Typography variant="body2">{label}</Typography>
    </Stack>
  );
}
