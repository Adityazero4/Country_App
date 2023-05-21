import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useFavContext } from "../Context/favContext";

const Country = () => {
  const [countryInfo, setCountryInfo] = React.useState([]);
  const { name } = useParams();
  const { favorites, addToFavorites, removeFromFavorites } = useFavContext();
  console.log("Favorites are:", favorites);
  const handleFavorites = () => {
    addToFavorites(countryInfo);
    alert("Added to Favorites");
  };
  const handleRemoveFavorites = () => {
    removeFromFavorites(name);
    alert("Removed from Favorites");
  };
  const favChecker = (name) => {
    const fav = favorites.find((country) => country.name.common === name);
    if (fav) {
      return true;
    } else {
      return false;
    }
  };
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (name) {
          const lowercaseName = name.toLowerCase();
          console.log(lowercaseName);
          const response = await axios.get(
            `https://restcountries.com/v3.1/name/${lowercaseName}`
          );
          console.log(response.data);
          setCountryInfo(response.data);
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchData();
  }, [name]);
  return (
    <div>
      <Box sx={{ margin: "10px" }}>
        <Link to="/">
          <Button variant="outlined" startIcon={<KeyboardBackspaceSharpIcon />}>
            Back
          </Button>
        </Link>
      </Box>
      {countryInfo.map((country) => {
        const {
          population,
          area,
          subregion,
          languages,
          borders,
          fifa,
          status,
          capital,
          name,
        } = country;
        const languageCode = Object.keys(languages)[0]; // Assuming there is only one language in the object
        const language = languages[languageCode];
        const officialName = name.official;

        const border = borders;

        return (
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: 600,
              margin: "auto",
            }}
            key={country.name.common}
          >
            <Grid container>
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  image={country.flags.png}
                  alt={country.name.common}
                  sx={{ height: "100%", margin: "0 25%", objectFit: "contain" }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <CardContent>
                  <Typography variant="h5" component="div">
                    {country.name.common}
                  </Typography>
                  <Typography variant="body2" component="div">
                    {`${officialName}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Capital: ${capital}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Population: ${population.toLocaleString()}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Area: ${area.toLocaleString()} km²`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Subregion: ${subregion} `}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {`FIFA: ${fifa} `}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Borders: ${border} `}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Language: ${language} `}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Status: ${status} `}
                  </Typography>
                </CardContent>
                {favChecker(country.name.common) ? (
                  <CardActions>
                    <Button
                      size="medium"
                      sx={{ width: "200px", margin: "auto" }}
                      variant="contained"
                      onClick={handleRemoveFavorites}
                    >
                      Remove From Favourites
                    </Button>
                  </CardActions>
                ) : (
                  <CardActions>
                    <Button
                      size="medium"
                      sx={{ width: "200px", margin: "auto" }}
                      variant="contained"
                      onClick={handleFavorites}
                    >
                      Add to Favourites
                    </Button>
                  </CardActions>
                )}
              </Grid>
            </Grid>
          </Card>
        );
      })}
    </div>
  );
};

export default Country;
