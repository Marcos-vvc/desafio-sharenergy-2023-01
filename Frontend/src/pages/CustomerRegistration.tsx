import axios from "axios";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { Url } from "../constants/Url";
import { useForm } from "../hooks/useForm";
import { goToCustomerList } from "../router/coordinator";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const CustomerRegistration = () => {
    const { form, onChange, cleanFields } = useForm({ name: "", email: "", phone: "", address: "", cpf: "" });

    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            primary: {
                main: '#26a69a'
            }
        }
    });

    const onSubmitRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        axios.post(`${Url}/customers`, form)
            .then((response) => {
                navigate('/customerList')
                cleanFields()
            })
            .catch((err) => {
                alert("Faltam Informações!!!")
            })
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="flex justify-end pr-4 mt-3">
                <Button variant="outlined" >
                    <button onClick={() => goToCustomerList(navigate)}>SAIR</button>
                </Button>
            </div>
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
                        Cadastro de Cliente
                    </Typography>
                    <Box component="form" noValidate onSubmit={onSubmitRegister} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nome"
                                    autoFocus
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Telefone"
                                    name="phone"
                                    autoComplete="phone"
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="address"
                                    label="Endereço"
                                    type="address"
                                    id="address"
                                    autoComplete="address"
                                    onChange={onChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="cpf"
                                    required
                                    fullWidth
                                    id="cpf"
                                    label="CPF"
                                    autoFocus
                                    inputProps={{
                                        maxLength: 11,
                                    }}
                                    onChange={onChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Cadastrar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default CustomerRegistration
