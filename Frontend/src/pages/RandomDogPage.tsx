import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToCustomerList, goToStatusCode } from "../router/coordinator";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from "@mui/material/styles";



const theme = createTheme({
    palette: {
        primary: {
            main: '#26a69a'
        }
    }
});

const RandomDogPage = () => {
    const [dogs, setDogs] = useState([]);
    const [dogImage, setDogImage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('https://random.dog/doggos')
            .then((response) => {
                setDogs(response.data);
            })
            .catch((err) => {
                console.log("Deu erro", err.response)
            })
    }, []);


    const seletctRandomImage = () => {
        const item = dogs[Math.floor(Math.random() * dogs.length)];
        setDogImage(`https://random.dog/${item}`)
    };

    useEffect(() => {
        if (dogs && dogs.length > 0) {
            seletctRandomImage()
        }
    }, [dogs]);


    return (
        <ThemeProvider theme={theme}>
            <div className="flex flex-col m-auto items-center w-2/4 h-3/6 gap-3 mt-4 " >
                <ButtonGroup size="small" aria-label="small button group">
                    <Button onClick={() => goToStatusCode(navigate)}>Voltar</Button>
                    <Button onClick={seletctRandomImage}>Refresh</Button>
                    <Button onClick={() => goToCustomerList(navigate)}>Próxima</Button>
                </ButtonGroup>
                <div className="">
                    <img src={dogImage} />
                </div>
            </div>
        </ThemeProvider>
    )
}

export default RandomDogPage