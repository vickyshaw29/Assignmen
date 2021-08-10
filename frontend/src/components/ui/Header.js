import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    marginTop: "3.3em",
  },
  appbar: {
    boxShadow: " 0px 0.7px 0px #E5E9F0",
    backgroundColor: theme.palette.primary.main,
  },
}));
const Header = ({ history }) => {
  const classes = useStyles();
  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        className={classes.appbar}
      >
        <Toolbar disableGutters style={{ minHeight: 52.5 }}>
          <Typography
            style={{ marginLeft: 10, color: "#fff" }}
            component={Link}
            to="/"
            style={{textDecoration:'none',color:'#fff',marginLeft:16}}
          >
            Assignment
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
