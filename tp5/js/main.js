var app;

window.onload = function () {
  app = new Vue({
    el: "#weatherApp", // cible l'élement HTML où nous pourrons utiliser toutes les variables ci-dessous
    data: {
      // sera utilisé comme indicateur de chargement de l'application
      loaded: false,

      // cityName, variable utilisé dans le formulaire via v-model
      formCityName: "",

      message: "WebApp Loaded.",
      messageForm: "",

      // liste des villes saisies, initialiser avec Paris
      cityList: [
        {
          name: "Paris",
        },
      ],

      // cityWeather contiendra les données météo reçus par openWeatherMap
      cityWeather: null,

      // indicateur de chargement
      cityWeatherLoading: false,
    },

    // 'mounted' est exécuté une fois l'application VUE totalement disponible
    // Plus d'info. sur le cycle de vie d'une app VUE :
    // https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
    mounted: function () {
      this.loaded = true;
      this.readData();
    },

    data: {
      formCityName: "",
      messageForm: "",
      cityList: [
        {
          name: "Paris",
        },
      ],
      cityWeather: null,
      cityWeatherLoading: false,
      LATITTUDE: "", // Ajoutez cette ligne
      LONGITUDE: "", // Ajoutez cette ligne
    },

    // ici, on définit les methodes qui vont traiter les données décrites dans DATA
    methods: {
      readData: function (event) {
        console.log(
          "JSON.stringify(this.cityList)",
          JSON.stringify(this.cityList)
        ); // va afficher la liste des villes
        // JSON.stringify permet transformer une liste en chaîne de caractères

        console.log("this.loaded:", this.loaded); // va afficher 'this.loaded: true'
      },
      addCity: function (event) {
        event.preventDefault(); // pour ne pas recharger la page à la soumission du formulaire

        if (this.isCityExist(this.formCityName)) {
          this.messageForm = "existe déjà";
        } else {
          this.cityList.push({ name: this.formCityName });

          // remise à zéro du message affiché sous le formulaire
          this.messageForm = "";

          // remise à zéro du champ de saisie
          this.formCityName = "";
        }
      },

      remove: function (_city) {
        this.cityList = this.cityList.filter((item) => item.name != _city.name);
      },
      meteo: function (_city) {
        this.cityWeatherLoading = true;

        // appel AJAX avec fetch
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
            _city.name +
            "&units=metric&lang=fr&apikey=507bba8cc760c0f0731ebbb83e79063f"
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (json) {
            app.cityWeatherLoading = false;

            // test du code retour
            // 200 = OK
            // 404 = city not found
            if (json.cod == 200) {
              // on met la réponse du webservice dans la variable cityWeather
              app.cityWeather = json;
              app.message = null;
              app.LATITTUDE = json.coord.lat;
              app.LONGITUDE = json.coord.lon;
            } else {
              app.cityWeather = null;
              app.message =
                "Météo introuvable pour " +
                _city.name +
                " (" +
                json.message +
                ")";
            }
          });
      },

      isCityExist: function (cityName) {
        // Fonction pour vérifier si la ville existe déjà dans la liste
        return this.cityList.some(
          (city) => city.name.toLowerCase() === cityName.toLowerCase()
        );
      },
    },
  });
};
