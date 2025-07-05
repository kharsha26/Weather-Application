export const getFavorites = () => {
  const favorites = localStorage.getItem('weatherFavorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (location) => {
  const favorites = getFavorites();
  if (!favorites.some(fav => fav.id === location.id)) {
    favorites.push(location);
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  }
};

export const removeFavorite = (id) => {
  const favorites = getFavorites().filter(fav => fav.id !== id);
  localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
};

export const isFavorite = (id) => {
  return getFavorites().some(fav => fav.id === id);
};