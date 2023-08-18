class House {
  image;
  address;
  price;
  postcode;
  city;
  nrRooms;
  nrBathrooms;
  size;

  constructor(image, address, price, postcode, city, nrRooms, nrBathrooms, size) {
    this.image = image;
    this.address = address;
    this.price = price;
    this.postcode = postcode;
    this.city = city;
    this.nrRooms = nrRooms;
    this.nrBathrooms = nrBathrooms;
    this.size = size;
  }
}

export default House;