import React, { useContext, useState } from 'react'
import Modal from './Modal';
import axios from 'axios';
import { Url } from '../constants/Url';

import { Card, CardActions, CardContent, Collapse, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IconButtonProps } from '@mui/material/IconButton';
import { createTheme, styled } from '@mui/material/styles';
import { AppContext } from '../contexts/AppContext';


type Customers = {
    customer: {
        id: string;
        name: string;
        email: string;
        phone: string;
        address: string;
        cpf: string;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#80cbc4',
            light: '#f4ff81v'

        }
    }
});

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const CardInfo = (props: Customers) => {
    const [expanded, setExpanded] = React.useState(false);
    const [modal, setModal] = useState(false);
    const { setCustomerUpdated } = useContext(AppContext);



    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleEditModal = () => {
        setModal(!modal)
    }

    const delCustomer = (id: string) => {
        if (window.confirm("Tem certeza que deseja deletar?")) {
            axios.delete(`${Url}/customers/${props.customer.id}`)
                .then((response) => {
                    setCustomerUpdated(true)
                    alert("Usuário deletado com sucesso!")
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    }

    return (
        <div>
            {modal === false ? null : <Modal setModal={setModal} customer={props.customer} />}
            <Card className="m-auto mt-4" sx={{ maxWidth: 1 / 2}}>
                <CardContent>
                    <Typography variant="h6">
                        <div key={props.customer.id}>
                            <p> {props.customer.name} </p>
                        </div>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <EditIcon
                            onClick={handleEditModal}
                        />
                    </IconButton>
                    <IconButton aria-label="share">
                        <DeleteIcon
                            onClick={() => delCustomer(props.customer.id)}
                        />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Informações:</Typography>
                        <Typography paragraph>
                            <div key={props.customer.id}>
                                <p>Cliente: {props.customer.name}</p>
                                <p>Telefone: {props.customer.phone}</p>
                                <p>Email: {props.customer.email}</p>
                                <p>Endereço: {props.customer.address}</p>
                                <p>CPF: {props.customer.cpf}</p>
                            </div>
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    )
}

export default CardInfo;












