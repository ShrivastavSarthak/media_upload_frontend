"use client";
import SignIn from "@/components/auth/signin";
import SignUp from "@/components/auth/signup";
import { Card, Button, Box, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card sx={{ width: {sx:"100%",sm:"100%",md:"40%",lg:"40%",xl:"40%"}, margin: '2rem auto', padding: '1rem' }}>
        
        {isSignIn ? <SignIn /> : <SignUp />}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 2  }}> 
          <Typography>{isSignIn ? "Don't have an account? " : "Already have an account? "}</Typography>
          <Button variant="text" onClick={() => setIsSignIn(!isSignIn)}>{isSignIn ? "Sign Up" : "Sign In"}</Button>
        </Box>
      </Card>
    </div>
  );
}
