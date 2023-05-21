import React from "react";
import { FavoriteContext } from "../Context/favContext";
import { useContext } from "react";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { Link } from "react-router-dom";
import { CardActions } from "@mui/material";
import { useFavContext } from "../Context/favContext";

const FavCountry = () => {
  const { favorites } = useFavContext();
  console.log(favorites);

  return (
    <div>
      <Typography variant="h5">Favorite Countries</Typography>
      <Box sx={{ margin: "10px" }}>
        <Link to="/">
          <Button variant="outlined" startIcon={<KeyboardBackspaceSharpIcon />}>
            Back
          </Button>
        </Link>
      </Box>
      {favorites.length === 0 ? (
        <Typography variant="h6">No Favorites Selected</Typography>
      ) : (
        <Grid container spacing={3} columns={12} sx={{ margin: "20px 0" }}>
          {favorites.map((country) => {
            return (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                key={country.name.common}
              >
                <Card sx={{ maxWidth: "500px" }} elevation={6}>
                  <CardMedia
                    component="img"
                    image={country.flags.png}
                    alt={country.name.common}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {country.name.common}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Capital: ${country.capital}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Currency: ${Object.values(country.currencies).map(
                        (currency) => currency.name
                      )} `}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default FavCountry;
