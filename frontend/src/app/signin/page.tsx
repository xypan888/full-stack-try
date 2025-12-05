import LoginForm from "@/components/LoginForm";
import { Box } from "@mui/material";


export default function SignInPage() {
  return (
    <Box
      sx={{
        width: '100%',
        display:'flex',
        justifyContent:'center',
      }}>
        <LoginForm />
    </Box>
  )

}