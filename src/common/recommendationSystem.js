/**
 * Method to get the top N recommendations for a house based on the available houses. 
 * 
 * @param {*} houses all houses
 * @param {*} houseId selected house id
 * @param {*} nrRecommendations number of recommendations to return
 * @returns an array of houses, representing the top pics
 */
export function getTopRecommendations(houses, houseId, nrRecommendations = 3) {
  // normalize data
  const minPrice = Math.min(...houses.map(house => house.price));
  const maxPrice = Math.max(...houses.map(house => house.price));
  const minSize = Math.min(...houses.map(house => house.size));
  const maxSize = Math.max(...houses.map(house => house.size));

  const normalizedHouses = houses.map(house => ({
    id: house.id,
    image: house.image,
    street: house.street,
    houseNr: house.houseNr,
    houseNrAdt: house.houseNrAdt,
    price: (house.price - minPrice) / (maxPrice - minPrice),
    postcode: house.postcode,
    city: house.city,
    nrRooms: house.nrRooms,
    nrBathrooms: house.nrBathrooms,
    size: (house.size - minSize) / (maxSize - minSize),
    constructionYear: house.constructionYear,
    hasGarage: house.hasGarage,
    description: house.description,
    madeByMe: house.madeByMe,
  }));

  // find index of item to compare in array of houses
  const comparissonIdx = normalizedHouses.findIndex(house => house.id === houseId);

  // compute euclidean distances for the two selected features: price and size 
  // for all the items in the normalized array
  const distances = normalizedHouses.map((house, index) =>
    index === comparissonIdx ? Infinity : euclideanDistance(normalizedHouses[comparissonIdx], house)
  );

  // select top N items, 3 by default
  const topItems = distances
    .map((distance, index) => ({ distance, index }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, nrRecommendations)
    .map(item => houses[item.index]);

  return topItems;
}

/**
 * Helper method to calculate the euclidean distance between two houses based on price and size.
 * 
 * @param {*} house1 First house
 * @param {*} house2 Second house
 * @returns the euclidean distance between the two items
 */
function euclideanDistance (house1, house2) {
  const priceDiff = house1.price - house2.price;
  const sizeDiff = house1.size - house2.size;
  return Math.sqrt(Math.pow(priceDiff, 2) + Math.pow(sizeDiff, 2));
}