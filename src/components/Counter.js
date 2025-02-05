import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";

const Counter = () => {
  const [count, setCount] = useState(0);

  const backgroundSpring = useSpring({
    backgroundColor: `rgba(0, 150, 255, ${count / 100})`,
    config: { tension: 200, friction: 20 }
  });

  return (
    <animated.div style={{ ...backgroundSpring, padding: "20px", borderRadius: "10px" }}>
      <Typography variant="h4">Counter: {count}</Typography>
      <Box mt={2}>
        <Button 
          onClick={() => setCount(count + 1)} 
          variant="contained" 
          color="primary"
        >
          Increment
        </Button>
        <Button 
          onClick={() => setCount(prevCount => Math.max(0, prevCount - 1))} 
          variant="contained" 
          color="secondary" 
          sx={{ mx: 2 }}
        >
          Decrement
        </Button>
        <Button 
          onClick={() => setCount(0)} 
          variant="contained"
        >
          Reset
        </Button>
      </Box>
    </animated.div>
  );
};

export default Counter;
