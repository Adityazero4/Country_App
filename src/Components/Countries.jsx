import React, { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import axios from "axios";
import { Link } from "react-router-dom";

const Countries = () => {
  const [continent, setContinent] = React.useState("asia");
  const handleChange = (event) => {
    setContinent(event.target.value);
  };
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios.get(
        `https://restcountries.com/v3.1/region/${continent}`
      );
      console.log(result.data);
      setData(result.data);
      setLoading(false);
    };
    fetchData();
  }, [continent]);
  return (
    <div>
      <FormControl required sx={{ m: 3, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">
          Continent
        </InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={continent}
          label="Continent"
          onChange={handleChange}
          color="primary"
        >
          <MenuItem value="asia">Asia</MenuItem>
          <MenuItem value="africa">Africa</MenuItem>
          <MenuItem value="americas">America</MenuItem>
          <MenuItem value="europe">Europe</MenuItem>
        </Select>
      </FormControl>

      <Link to="/favcountry">
        <Button size="medium" sx={{ m: 4, minWidth: 120 }} variant="contained">
          Favorites
        </Button>
      </Link>

      <Container fixed>
        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CircularProgress color="primary" sx={{ margin: "10px 50%" }} />
          </Box>
        ) : (
          <Grid container spacing={3} columns={12} sx={{ margin: "20px 0" }}>
            {data.map((country) => (
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
                  <CardActions>
                    <Link to={`/country/${country.name.common}`}>
                      {" "}
                      <Button
                        size="medium"
                        sx={{ width: "485px", margin: "auto" }}
                        variant="contained"
                      >
                        More Info
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Countries;
