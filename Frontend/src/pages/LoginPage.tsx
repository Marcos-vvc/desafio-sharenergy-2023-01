import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Url } from "../constants/Url";
import { useForm } from "../hooks/useForm";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#26a69a'
    }
  }
});

const LoginPage = () => {
  const { form, onChange } = useForm({ username: "", password: "" })
  const navigate = useNavigate()



  const onSubmitLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    axios.post(`${Url}/user/login`, form)
      .then((response) => {
        navigate('/list')
      })
      .catch((err) => {
        alert("Senha incorreta!!!")
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SHARENERGY LOGIN
          </Typography>
          <Box component="form" onSubmit={onSubmitLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nome"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={onChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              onChange={onChange}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembre-me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ENTRAR
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
