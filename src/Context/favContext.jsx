import React, { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const useFavContext = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("FavoriteContext must be withing FavoriteProvider");
  }
  return context;
};

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (country) => {
    const oldFavorites = [...favorites];
    const newFavorites = oldFavorites.concat(country);
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (name) => {
    const oldFavorites = [...favorites];
    const newFavorites = oldFavorites.filter((c) => c.name.common !== name);
    setFavorites(newFavorites);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export { FavoriteContext, FavoriteProvider };
