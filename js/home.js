
import { Details } from "./details.js";
import { Ui } from "./ui.js";

export class Games {
    constructor() {
       this.getGames("mmorpg");
 
       document.querySelectorAll(".menu a").forEach((link) => {
          link.addEventListener("click", (e) => {
             document.querySelector(".menu .active").classList.remove("active");
             e.target.classList.add("active");
             this.getGames(e.target.dataset.category);
          });
       });
 
       this.ui = new Ui();
    }
 

    async getGames(category) {
        const loading = document.querySelector(".loading");
        loading.classList.remove("d-none");
        const options = {
           method: "GET",
         headers: {
            "X-RapidAPI-Key":'1b614ac228msh07b79504a951e1ap139df1jsnaf0b9ec41112',
            "X-RapidAPI-Host": 'free-to-play-games-database.p.rapidapi.com',
            Accept: "application/json",
            "Content-Type": "application/json",
         },
      };


      const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
      const response = await api.json();

      this.ui.displayDataGame(response);
      this.startEvent();
      loading.classList.add("d-none");
   }

   startEvent() {
      document.querySelectorAll(".card").forEach((item) => {
         item.addEventListener("click", () => {
            const id = item.dataset.id;
            this.showDetails(id);
         });
      });
   }

   showDetails(idGame) {
      const details = new Details(idGame);
      document.querySelector(".games").classList.add("d-none");
      document.querySelector(".details").classList.remove("d-none");
   }
}