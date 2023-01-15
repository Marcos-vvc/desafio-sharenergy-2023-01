import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useForm } from '../hooks/useForm';
import { Url } from '../constants/Url';
import axios from 'axios';

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
import { AppContext } from '../contexts/AppContext';

interface Props {
    setModal: Dispatch<SetStateAction<boolean>>
    customer: Partial<Customer>
};
type Customer = {    
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    cpf: string;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#26a69a'
        }
    }
});

const Modal = (props: Props) => {
    const { form, onChange } = useForm({ name: undefined, email: undefined, phone: undefined, address: undefined, cpf: undefined });
    const { setCustomerUpdated } = useContext(AppContext);    

    const clickOut = (event: any) => {
        let Modal = document.getElementById('Modal');

        if (!Modal?.contains(event.target)) {
            props.setModal(false)
        }
    }

    const onSubmitRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        axios.put(`${Url}/customers/${props.customer.id}`, form)
            .then((response) => {
                setCustomerUpdated(true);
                props.setModal(false)
            })
            .catch((err) => {
                alert("Erro")
            })
    };

    return (
        <div onClick={clickOut} className="flex fixed w-full h-full z-20 top-0 ">
            <div id='Modal' className="flex w-4/5 h-4/5 bg-white m-auto border border-cyan-400">
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
                                Editar Cliente
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
                                            onChange={onChange}
                                            inputProps={{
                                                maxLength: 11,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Salvar
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>

        </div>
    )
}

export default Modal;