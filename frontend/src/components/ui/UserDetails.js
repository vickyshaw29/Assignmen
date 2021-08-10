import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../stuff/Loader";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const UserDetails = ({ history }) => {
  const classes = useStyles();
  const [userData, setuserData] = useState(null);
  const [quotes, setQuotes] = useState(null);
  const [season, setSeason] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const getDetail = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `https://www.breakingbadapi.com/api/characters/${id}`
      );
      setuserData(data[0]);
      setLoading(false);
    };
    getDetail();
  }, [id]);
  useEffect(() => {
    if (userData !== null) {
      const getQuotes = async () => {
        setLoading(true);
        const { data } = await axios.get(
          `https://www.breakingbadapi.com/api/quote?author=${userData.name}`
        );
        setQuotes(data[0]);
      };
      getQuotes();
    }
  }, [id, userData]);
  useEffect(() => {
    if (userData !== null) {
      const getSeason = async () => {
        const { data } = await axios.get(
          `https://www.breakingbadapi.com/api/episodes/${id}`
        );
        setSeason(data[0].season);
        console.log(data[0], "season");
      };
      getSeason();
    }
  }, [id, userData]);
  return (
    userData && (
      <Grid
        container
        direction="column"
        justify="center"
        style={{ marginTop: "5em" }}
      >
        {loading && <Loader />}
        <Grid item container sm direction="column" alignItems="center">
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src={userData.img}
              className={classes.large}
            />
          </Grid>
          <Grid item lg={12} style={{ marginTop: "2em" }}>
            <Paper elevation={2} style={{ padding: 20 }}>
              <Grid container direction="column" justify="center">
                <Grid item container lg={12}>
                  <Grid item>
                    <Typography variant="h6">Name -</Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: 32 }}>
                    <Typography variant="h6">{userData.name}</Typography>
                  </Grid>
                </Grid>
                <Grid item container lg={12}>
                  <Grid item>
                    <Typography variant="h6">DOB -</Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: 32 }}>
                    <Typography variant="h6">{userData.birthday}</Typography>
                  </Grid>
                </Grid>
                <Grid item container lg={12}>
                  <Grid item>
                    <Typography variant="h6">Occupation -</Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: 32 }}>
                    <Typography variant="h6">
                      {userData.occupation[0]}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container lg={12}>
                  <Grid item>
                    <Typography variant="h6">Status -</Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: 32 }}>
                    <Typography variant="h6">{userData.status}</Typography>
                  </Grid>
                </Grid>
                <Grid item container lg={12}>
                  <Grid item>
                    <Typography variant="h6">Nick Name -</Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: 32 }}>
                    <Typography variant="h6">{userData.nickname}</Typography>
                  </Grid>
                </Grid>
                <Grid item container lg={12}>
                  <Grid item>
                    <Typography variant="h6">Portrayed -</Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: 32 }}>
                    <Typography variant="h6">{userData.portrayed}</Typography>
                  </Grid>
                </Grid>
                <Grid item container lg={12}>
                  <Grid item>
                    <Typography variant="h6">Famous Quote -</Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: 32 }}>
                    <Typography variant="h6">
                      {quotes && quotes.quote}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container lg={12}>
                  <Grid item>
                    <Typography variant="h6">Season-</Typography>
                  </Grid>
                  <Grid item style={{ marginLeft: 32 }}>
                    <Typography variant="h6">{season && season}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    )
  );
};

export default UserDetails;
