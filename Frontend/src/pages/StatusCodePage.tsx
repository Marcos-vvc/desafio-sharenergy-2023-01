import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToListUsers, goToRandomDog } from "../router/coordinator";
import { getStatusCode } from "../constants/StatusCode";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";



const theme = createTheme({
    palette: {
        primary: {
            main: '#26a69a'
        }
    }
});

const StatusCodePage = () => {
    const statusCode = getStatusCode();
    const [statusSelected, setStatusSelected] = useState(404);

    const navigate = useNavigate();

    const handleChange = (event: SelectChangeEvent) => {
        setStatusSelected(Number(event.target.value));
    };


    return (
        <ThemeProvider theme={theme}>
            <div className="flex flex-col items-center mt-5 gap-5 ">
                <div className="flex justify-between w-full px-5">
                    <Button variant="outlined" onClick={() => goToListUsers(navigate)}> Voltar Página 2
                    </Button>
                    <Button variant="outlined" onClick={() => goToRandomDog(navigate)}> Página 3
                    </Button>
                </div>
                <Box sx={{ minWidth: 300 }}>
                    <FormControl fullWidth>
                        <InputLabel id="Status">Status</InputLabel>
                        <Select
                            labelId="Status"
                            id="Status"
                            value={statusSelected.toString()}
                            label="Status"
                            onChange={handleChange}
                        >
                            {statusCode.map((status) => (
                                <MenuItem value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <img className=" w-auto h-auto gap-4"
                    src={`https://http.cat/${statusSelected}.jpg`}
                />
            </div>
        </ThemeProvider>
    )
}

export default StatusCodePage;


