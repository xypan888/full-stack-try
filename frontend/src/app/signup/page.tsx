"user client";
import React from 'react';
import {Box, Typography, TextField, Button} from '@mui/material';

export default function SignUpPage() {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState(''); 


  const ChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const ChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  const Register = () => {
    console.log('Register clicked');
    console.log('Name:', name);
    console.log('Password:', password);
  };

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
      }}
    >
      <Typography variant="h4" component="h1">
        Sign Up
      </Typography>
      <TextField 
        label="Email" 
        variant="outlined"
        value={name}
        onChange={ChangeName}
      />
      <TextField 
        label="Password" 
        type="password" 
        variant="outlined"
        value={password}
        onChange={ChangePassword}
      />
      <Button 
        variant="contained" 
        color="primary"
        onClick={Register}
      >
        Sign Up
      </Button>
    </Box>
  );  
}