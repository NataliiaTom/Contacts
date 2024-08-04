import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const ContactDetailsCard = ({ imageSrc, firstName, lastName, email, tag }) => {
    return (
        <>
            <Card variant="outlined" sx={{ position: 'relative' }}>
                <CardHeader
                    sx={{ maxWidth: 245, textAlign: 'left' }}
                    avatar={<Avatar
                        alt="Remy Sharp"
                        src={imageSrc}
                        sx={{ width: 56, height: 56 }}
                    />}
                    title={firstName + " " + lastName}
                    subheader={email}

                />
                <IconButton sx={{ position: 'absolute', top: '0', right: '0' }}>
                    <HighlightOffIcon />
                </IconButton>

                {console.log(tag === "")}
                {tag !== "" ? <Stack direction="row" spacing={1} sx={{ maxWidth: 80, ml: 10, mb: 2 }}> <Chip label={tag} />  </Stack> : ''}


            </Card >

        </>
    )

}

export default ContactDetailsCard