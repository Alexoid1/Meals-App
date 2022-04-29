import { createContext, useState } from "react";

export const FavoritesContext = createContext({
    ids: [],
    addFavorite: (id) => {},
    revomeFavorite: (id) =>{}
});

function FavoritesContextProvider({children}){
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  function addFavorite (id){
    setFavoriteMealIds((currentState) => [...currentState, id])
  }

  function revomeFavorite (id) {
    setFavoriteMealIds((currentState) => currentState.filter((mealId) => mealId !== id))
  }

  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    revomeFavorite: revomeFavorite
  }
  return <FavoritesContext.Provider value={value} >{children}</FavoritesContext.Provider>
}

export default FavoritesContextProvider;