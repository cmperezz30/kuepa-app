import { defineStore } from "pinia";



export const userStore = defineStore('user', {

    state: () => {
        return {

            user: JSON.parse(localStorage.getItem('user')) || null

        }
    },

    getters: {

        getUser: (state) => state.user

    },

    actions: {

        saveUser(user){
            localStorage.setItem('user', JSON.stringify(user));
            this.user = JSON.parse(localStorage.getItem('user'))
        },
        
        clearUser(){
            this.user = null;
           localStorage.removeItem('user');
        }
        
    }

});
