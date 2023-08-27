import { defineStore } from 'pinia'
import House from '../models/House'
import { GetError, QueryUndefinedError, PostError } from '@/common/errors';

export const houseStore = defineStore('houseStore', {
  state: () => ({
    responseData: [],
    queriedData: [],
    dataWasFetched: false
  }),
  getters: {
    getNrOfResults: (state) => state.queriedData.length
  },
  actions: {
    async getHouseListings() {
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
            // process the data into separate house objects
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
          }

          this.queriedData = this.responseData;
          this.dataWasFetched = true;
        } else {
          throw new GetError(response.statusText);
        }
      }
      catch (error) {
        throw new GetError(error.message);
      }
    },
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
        } else {
          throw new GetError(response.statusText);
        }
      }
      catch (error) {
        throw new GetError(error.message);
      }
    },
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
    sortByOption({option, order}) {
      if(option === 'price') {
        this.queriedData.sort((a, b) => (a.price - b.price) * order);
      }
      else {
        this.queriedData.sort((a, b) => (a.size - b.size) * order);
      }
    },
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
    }
  }
})