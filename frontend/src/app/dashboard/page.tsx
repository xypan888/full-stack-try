'use client';
import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import { signOut } from '@/actions/auth-actions';
import { useActionState } from 'react';
import { useSession } from 'next-auth/react';


export default function HomePage() {
  const [state, action, pending] = useActionState(signOut, undefined);
  const {data: session, status, update} = useSession();
  const user = session?.user.email;
  console.log("Session Data:", session);

  React.useEffect(() => {
    update();
  }, []);

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
        Email: {user}
      </Typography>
      <form action={action}>
        <Button 
          type="submit" 
          disabled={pending}
          variant="contained" 
          color="primary"
        >
          {pending ? 'Signing Out...' : 'Sign Out'}
        </Button>
      </form>
    </Box>
  );
}