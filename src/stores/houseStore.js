import { defineStore } from 'pinia'
import House from '../models/House'
import { GetError, QueryUndefinedError, PostError, DeleteError } from '@/common/errors';

export const houseStore = defineStore('houseStore', {
  state: () => ({
    responseData: [], // data gotten by fetching all the existing listings in the database
    queriedData: [], // queried data from a user search
    myListings: [], // listings that were created by the user
    favoritesMap: new Map(), // favorited listings
    dataWasFetched: false // checks if data was fetched once at the start of the application
  }),
  getters: {
    getNrOfResults: (state) => state.queriedData.length // used in the main page, as a shorthand for displaying the number of results
  },
  actions: {
    /**
     * Gets all the house lisings from the database. A House object is used as a model for the data. 
     */
    async getHouseListings() {
      this.responseData = [];
      this.queriedData = [];
      this.myListings = [];

      const apikey = process.env.VUE_APP_API_KEY;
      const rootApi = process.env.VUE_APP_ROOT_API;

      try {
        const response = await fetch(`${rootApi}/api/houses`, {
          headers: {
            'X-Api-Key': apikey
          }
        });
        
        if (response.ok) {
          const data = await response.json();
       
          for(const el of data) {
            // Process the data into separate house objects
            const house = new House(
              el.id, 
              el.image, 
              el.location.street, 
              el.location.houseNumber,
              el.location.houseNumberAddition,
              el.price, 
              el.location.zip, 
              el.location.city, 
              el.rooms.bedrooms, 
              el.rooms.bathrooms, 
              el.size,
              el.madeByMe
            );

            this.responseData.push(house);

            if(el.madeByMe) {
              this.myListings.push(house);
            }
          }

          this.queriedData = this.responseData;
          this.dataWasFetched = true;
        } 
        else {
          throw new GetError(response.statusText);
        }
      }
      catch (error) {
        throw new GetError(error.message);
      }
    },
    /**
     * Gets a specific listing based on its id.
     */
    async getHouseByID(id) {
      const apikey = process.env.VUE_APP_API_KEY;
      const rootApi = process.env.VUE_APP_ROOT_API;

      try {
        const response = await fetch(`${rootApi}/api/houses/${id}`, {
          headers: {
            'X-Api-Key': apikey
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          const el = data[0];
            
          const house = new House(
            el.id, 
            el.image, 
            el.location.street, 
            el.location.houseNumber, 
            el.location.houseNumberAddition, 
            el.price, 
            el.location.zip, 
            el.location.city, 
            el.rooms.bedrooms, 
            el.rooms.bathrooms, 
            el.size,
            el.madeByMe,
            el.constructionYear,
            el.hasGarage,
            el.description
          );
        
          return house;
        } 
        else {
          throw new GetError(response.statusText);
        }
      }
      catch (error) {
        throw new GetError(error.message);
      }
    },
    /**
     * Handles a user search query, updates queryData which is used on the main page to display the listing data.
     * 
     * @param {*} query 
     */
    handleSearch(query) {
      this.queriedData = [];
    
      if(query === '') {
        this.queriedData = this.responseData;
      }
      else if(query === undefined) {
        throw new QueryUndefinedError("Cannot perform search, query is undefined. ");
      }
      else {
        this.queriedData = this.responseData.filter(house => {
          return (
            house.street.toLowerCase().includes(query.toLowerCase()) ||
            house.houseNr.toString().includes(query.toLowerCase()) || 
            house.price.toString().includes(query.toLowerCase()) || 
            house.postcode.toLowerCase().includes(query.toLowerCase()) || 
            house.city.toLowerCase().includes(query.toLowerCase()) ||
            house.size.toString().includes(query.toLowerCase()) 
          );
        });
      }
    },
    /**
     * Handles sorting the listings by a selected option and in the selected order.
     */
    sortByOption({option, order}) {
      if(option === 'price') {
        this.queriedData.sort((a, b) => (a.price - b.price) * order);
      }
      else {
        this.queriedData.sort((a, b) => (a.size - b.size) * order);
      }
    },
    /**
     * Adds a new listing to the database. The image is uploaded separately.
     * 
     * @param {*} listingData 
     * @param {*} imageData 
     * @returns the id of the newly created listing
     */
    async createNewListing(listingData, imageData) {
      const apikey = process.env.VUE_APP_API_KEY;
      const rootApi = process.env.VUE_APP_ROOT_API;

      try {
        const response = await fetch(`${rootApi}/api/houses/`, {
          method: 'POST',
          headers: {
            'X-Api-Key': apikey
          },
          body: listingData
        });
        
        if (response.ok) {
          const data = await response.json();

          await this.uploadImage(imageData, data.id);
          
          this.getHouseListings();
          
          return data.id;
        } 
        else {
          throw new PostError(response.statusText);
        }
      }
      catch (error) {
        throw new PostError(error.message);
      }
    },
    /**
     * Uploads the listing image to the database. 
     * 
     * @param {*} imageData 
     * @param {*} houseId 
     * @returns true if the image was uploaded successfully
     */
    async uploadImage(imageData, houseId) {
      const apikey = process.env.VUE_APP_API_KEY;
      const rootApi = process.env.VUE_APP_ROOT_API;

      try {
        const response = await fetch(`${rootApi}/api/houses/${houseId}/upload`, {
          method: 'POST',
          headers: {
            'X-Api-Key': apikey,
          },
          body: imageData,
          redirect: 'follow',
          mode: 'cors'
        });
        
        if (response.ok) {
          return true;
        }
        else {
          throw new PostError(response.statusText);
        }
      }
      catch (error) {
        throw new PostError(error.message);
      }
    },
    /**
     * Deletes a listing from the database, based on its id.
     * 
     * @param {*} houseId 
     * @returns true if the listing was removed 
     */
    async deleteListing(houseId) {
      const apikey = process.env.VUE_APP_API_KEY;
      const rootApi = process.env.VUE_APP_ROOT_API;

      try {
        const response = await fetch(`${rootApi}/api/houses/${houseId}`, {
          method: 'DELETE',
          headers: {
            'X-Api-Key': apikey,
          }
        });
        
        if (response.ok) {
          this.getHouseListings();
          return true;
        }
        else {
          throw new DeleteError(response.statusText);
        }
      }
      catch (error) {
        throw new DeleteError(error.message);
      }
    },
    /**
     * Edits an existing listing with the given id, using the provided listing data.
     * 
     * @param {*} houseId 
     * @returns the id of the corresponding listing
     */
    async editListing(houseId, listingData, imageData) {
      const apikey = process.env.VUE_APP_API_KEY;
      const rootApi = process.env.VUE_APP_ROOT_API;

      try {
        const response = await fetch(`${rootApi}/api/houses/${houseId}`, {
          method: 'POST',
          headers: {
            'X-Api-Key': apikey
          },
          body: listingData
        });
        
        if (response.ok) {
          if(imageData !== null) {
            await this.uploadImage(imageData, houseId);
          }
          
          this.getHouseListings();
          
          return houseId;
        } 
        else {
          throw new PostError(response.statusText);
        }
      }
      catch (error) {
        throw new PostError(error.message);
      }
    },
    /**
     * Returns an array of the favorited houses.
     */
    getFavorites() {
      return Array.from(this.favoritesMap.values());
    },
    /**
     * Adds a new favorite.
     */
    addFavorite(houseId) {
      const house = this.responseData.find(house => house.id === houseId);
      this.favoritesMap.set(houseId, house);
    },
    /**
     * Removes an existing favorite.
     */
    removeFavorite(houseId) {
      this.favoritesMap.delete(houseId);
    },
    /**
     * Checks whether given house is in the list of favorites.
     */
    isLiked(houseId) {
      return this.favoritesMap.has(houseId);
    }
  }
})