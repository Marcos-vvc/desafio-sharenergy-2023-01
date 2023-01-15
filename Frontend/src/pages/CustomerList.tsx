import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Url } from "../constants/Url";
import CardInfo from "../component/CardInfo";

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { goToListUsers, goToRegister } from "../router/coordinator";
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from '@mui/material/styles';
import Button from "@mui/material/Button";
import { AppContext } from "../contexts/AppContext";


type Customers = {
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
            main: '#26a69a',
            light: '#f4ff81v'
        }
    }
});

const CustomerList = () => {
    const [customers, setCustomers] = useState<Customers[]>([]);
    const { customerUpdated } = useContext(AppContext);
    const navigate = useNavigate();

    const getCustomers = () => {
        axios.get(`${Url}/customers`)
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((err) => {
                console.log("Deu erro", err.response)
            })
    }

    useEffect(() => {
        getCustomers()
    }, [])

    useEffect(() => {
        if (customerUpdated) getCustomers()
    }, [customerUpdated])

    const render = customers.map((customer) => {
        return (
            <div key={customer.id}>
                <CardInfo
                    customer={customer}
                />
            </div>
        )
    });
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Box className="flex justify-between" sx={{ '& > :not(style)': { m: 2 } }}>
                    <Fab sx={{ bgcolor: "primary.main" }} variant="extended"
                        onClick={() => goToRegister(navigate)}
                    >
                        <AddIcon sx={{ mr: 1 }} />
                        Cadastrar Cliente
                    </Fab>
                    <Button variant="outlined">
                        <button onClick={() => goToListUsers(navigate)}>Voltar p/ Página 1</button>
                    </Button>
                </Box>
                {render}
            </div>
        </ThemeProvider>
    )
}

export default CustomerList;

















