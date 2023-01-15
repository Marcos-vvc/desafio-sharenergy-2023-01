import { Card } from '@mui/material'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


const CardPerson = (props: any) => {
    return (
        <Card sx={{ maxWidth: 345, margin:4 }}>
            <Stack className='p-4' direction="row" spacing={2} >
             <Avatar alt="Remy Sharp" src={props.list.picture.thumbnail} />
             <p>{props.list.name.title}</p>
            </Stack>        
            <CardContent>              
                <Typography variant="body2" color="text.secondary">
                    <div key={props.list.login.uuid}>                     
                        <p>Email: {props.list.email}</p>
                        <p>Usuário: {props.list.login.username}</p>
                        <p>Idade: {props.list.dob.age}</p>
                    </div>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardPerson;