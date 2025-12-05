"use client";
import { signIn } from "@/actions/auth-actions";
import { Button, Box, TextField, Typography} from "@mui/material";
import { useActionState } from "react";

export default function LoginForm(){
  const [state, action, pending] = useActionState(signIn,undefined);
  
  return(
    <form action={action} >
      <Box
        sx={{
          display: 'flex',
          width:'400px',
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
          Sign In
        </Typography>
        <TextField 
          id="email"
          name="email"
          label="Email" 
          type="email"
          variant="outlined"
          fullWidth
          required
          />
        <TextField 
          id="password"
          name="password"
          label="Password" 
          type="password" 
          variant="outlined"
          fullWidth
          required
          />
        {state?.errors &&
          state?.errors.length > 0 &&
            state.errors.map((error:string, index:number) => (
              <div key={index} style={{ color: "red", marginTop: "8px" }}>
                {error}
              </div>
            ))
        }
        <Button 
          fullWidth
          type="submit" 
          disabled={pending}
          variant="contained" 
          color="primary"
        >
          {pending ? 'Signing In...' : 'Sign In'}
        </Button>
      </Box>
    </form>
  )

}