export type FavoriteItem = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export function getFavorites(): FavoriteItem[] {
  const fav = localStorage.getItem("favorites");
  try {
    return fav && fav !== "" ? JSON.parse(fav) : [];
  } catch (error) {
    console.error("Erreur lors du parsing des favoris :", error);
    localStorage.removeItem("favorites");
    return [];
  }
}

export function saveFavorites(favorites: FavoriteItem[]) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function toggleFavorite(item: FavoriteItem) {
  const favorites = getFavorites();
  const exists = favorites.find(f => f.id === item.id);

  let updatedFavorites;
  if (exists) {
    updatedFavorites = favorites.filter(f => f.id !== item.id);
  } else {
    updatedFavorites = [...favorites, item];
  }

  saveFavorites(updatedFavorites);
}

export function isFavorite(id: number): boolean {
  return getFavorites().some(f => f.id === id);
}
