import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import {useHistory} from 'react-router-dom';
interface TitleProps {
    children?: React.ReactNode;
    newBtn?: string;
}

export default function Title(props: TitleProps) {
    const router = useHistory();

    const navigate = (path) => {
        router.push(path);
    };
    return (
        <Typography
            component="h2"
            variant="h6"
            gutterBottom
            style={{
                color: 'white',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px black',
            }}
        >
            {props.children}
            {props.newBtn ? (
                <IconButton
                    color="primary"
                    aria-label="new"
                    onClick={() => navigate(props.newBtn)}
                >
                    <AddToPhotosIcon />
                </IconButton>
            ) : null}
        </Typography>
    );
}
