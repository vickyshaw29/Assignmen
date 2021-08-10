import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Loader() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    return (
        <Backdrop open={open} className={classes.backdrop}>
            <CircularProgress color="primary" />
        </Backdrop>
    );
}