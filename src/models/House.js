class House {
  id;
  image;
  street;
  houseNr;
  houseNrAdt;
  price;
  postcode;
  city;
  nrRooms;
  nrBathrooms;
  size;
  constructionYear;
  hasGarage;
  description;

  constructor(id, image, street, houseNr, houseNrAdt, price, postcode, city, nrRooms, nrBathrooms, size, constructionYear = null, hasGarage = false, description = null) {
    this.id = id;
    this.image = image;
    this.street = street;
    this.houseNr = houseNr;
    this.houseNrAdt = houseNrAdt;
    this.price = price;
    this.postcode = postcode;
    this.city = city;
    this.nrRooms = nrRooms;
    this.nrBathrooms = nrBathrooms;
    this.size = size;
    this.constructionYear = constructionYear;
    this.hasGarage = hasGarage;
    this.description = description;
  }
}

export default House;