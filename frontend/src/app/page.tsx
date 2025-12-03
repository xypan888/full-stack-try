'use client';
import React from 'react';
import {Box, Typography} from '@mui/material';

export default function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        gap: 3,
        marginTop: 8,
        minHeight: '60vh'
      }}>
      <Typography variant="h3" component="h2">
        Welcome to HomePage!
      </Typography>
      <Typography variant="h5" component="h2" color="textSecondary">
        This is the home page of app built with Next.js and Material-UI.
      </Typography>
    </Box>
  );
}