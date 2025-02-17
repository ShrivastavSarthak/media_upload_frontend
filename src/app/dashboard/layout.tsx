

"use client";

import { Box } from "@mui/material";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      {children}
    </Box>
  );
}
