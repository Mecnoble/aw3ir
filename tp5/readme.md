<p align="center">
  <a href="https://master3ir2020.slack.com/messages/aw">
     <img src="https://github.com/bilelz/tpaw/blob/master/galilee.png?raw=true" alt="Logo Master" width=100/>
  </a>  
  <br/>
  Master 3IR²  

<h3 align="center">TP5 : Application Metéo ☀️
</h3>
</p>

Avec VueJS (https://vuejs.org) et openweathermap (http://openweathermap.org)

<p align="center">
<kbd><img src="img/tp.png" height="500"></kbd><br/>
TP du jour
</p>

<!-- TOC -->

- [0. Prérequis (⚠ important)](#0-prérequis--important)
- [1. OpenWeatherMap - générer votre API Key](#1-openweathermap---générer-votre-api-key)
- [2. Installer NodeJS \& un serveur web](#2-installer-nodejs--un-serveur-web)
- [2.1 Plateforme de dév](#21-plateforme-de-dév)
- [Developpement d'une application web pour connaitre la méteo des villes demandées de l'utilisateur.](#developpement-dune-application-web-pour-connaitre-la-méteo-des-villes-demandées-de-lutilisateur)
- [3. Initialisation de l'application VUEjs](#3-initialisation-de-lapplication-vuejs)
- [4. (index.html) Créer un formulaire pour saisir le nom d'une ville](#4-indexhtml-créer-un-formulaire-pour-saisir-le-nom-dune-ville)
- [5. (main.js) Ajouter une méthode ```addCity``` à l'app VueJS](#5-mainjs-ajouter-une-méthode-addcity-à-lapp-vuejs)
- [6. (main.js) Tester si la ville est déjà dans la liste](#6-mainjs-tester-si-la-ville-est-déjà-dans-la-liste)
- [7. Adapter la méthode ```addCity``` pour tester si la ville existe déjà](#7-adapter-la-méthode-addcity-pour-tester-si-la-ville-existe-déjà)
- [8 . (index.html) Affichage de la liste des villes saisies](#8--indexhtml-affichage-de-la-liste-des-villes-saisies)
- [9. (main.js) Suppression d'une ville](#9-mainjs-suppression-dune-ville)
- [10. (main.js) Demande des données météo à OpenWeatherMap](#10-mainjs-demande-des-données-météo-à-openweathermap)
- [11. (index.html) Affichage de la méteo](#11-indexhtml-affichage-de-la-méteo)
- [12. Affichage une image Google Map](#12-affichage-une-image-google-map)
- [13. Affichage des icones météo](#13-affichage-des-icones-météo)

<!-- /TOC -->

## 0. Prérequis (⚠ important)

* Lire **tout** l'énoncé avant de commencer le TP.

❓❓Si vous avez des questions ou des erreurs dans votre code : 
* formater (indenter) bien votre code (raccourci Visual Studio Code : Ctrl + K puis Ctrl + F)
* demander à Google 🔍
* demander à vos camarades 👩‍🎓👨‍🎓
* demander au professeur 🙋



## 1. OpenWeatherMap - générer votre API Key

* Créer un compte openweathermap sur https://openweathermap.org/appid et     récupérer votre API Key (onglet ```API Keys```) : https://home.openweathermap.org/api_keys 
    * Exemple de clé (Api Key/appid): 0ada432b59deb9716c357092c5f79be6
    * Exemple de réponse à l’API: https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=0ada432b59deb9716c357092c5f79be6

    * Analyser la structure de la réponse JSON https://openweathermap.org/current#current_JSON
    * Documentation sur toute l’API : https://openweathermap.org/current

## 2. Installer NodeJS & un serveur web

> Node.js nous permet d'utiliser le langage JavaScript sur le serveur... Il nous permet donc de faire du JavaScript en dehors du navigateur !

> Plus de détail : https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/node-js-mais-a-quoi-ca-sert


Dans notre TP, nous utiliserons seulement le gestionnaire de dépendance [NPM](https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/les-modules-node-js-et-npm#/id/r-1057300) (Node Package Manager).
Avec NPM nous allons charger toutes les librairies dont nous avons besoin : bootstrap, ...

* Installer Nodejs (version LTS - Long Time Support): https://nodejs.org/en/download/
    * Cliquer sur Windows Installer ou Macintosh Installer

* Vérifier si Nodejs est installé sur votre poste:
    * lancer un terminal (invite de commandes), puis lancer la commande
    ```cmd
    npm -v
    ```
    * Si nodejs est installé, le terminal vous affichera la version de celui-ci
    ```cmd
    npm -v
    3.10.10
    ```

* Serveur web
    * Pour avoir un serveur web en local, installer ce package NPM https://browsersync.io/
```cmd
npm install -g browser-sync
```

  * Pour démarrer le serveur, avec un terminal, positionnez-vous dans votre répertoire et executer la commande
  ```cmd
browser-sync
```
Browser-sync ouvrira automatiquement la page index.html dans votre nagivateur.


## 2.1 Plateforme de dév


* Dans votre répertoire, télécharger bootstrap & vuejs dans les répertoires ```libs``` et ```css``` : 
    * boostrap : https://getbootstrap.com/docs/5.1/getting-started/download/
    * vuejs : https://cdn.jsdelivr.net/npm/vue/dist/vue.js (enregistrer le fichier ```vue.js```,  Ctrl+S)
        * cette version permet le debuggage via l’extension Chrome https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd


Votre répertoire doit ressembler à ça:

```
tp5/
├── index.html
├── css/
│   ├── bootstrap.css
└── js/
    └── libs/
        ├── bootstrap.bundle.js
        └── vue.js
    └── main.js // fichier JS où sera le code de votre TP
```

* index.html à utiliser  : https://github.com/bilelz/aw3ir/blob/master/tp5/index.html
  * Y ajouter les imports de scripts JS et CSS nécessaires


##  Developpement d'une application web pour connaitre la méteo des villes demandées de l'utilisateur.

## 3. Initialisation de l'application VUEjs
* votre page HTML devra comporter une element avec un ID ```weatherApp``` utilisé par VueJS

```html
    <div id="weatherApp">
        <!-- ici votre code HTML utilisé par VUE -->
    </div>
```
* dans votre script (main.js), initialisé VueJS en pointant sur l'ID ```weatherApp```

```js
var app;
window.onload = function () {
    app = new Vue({
        el: '#weatherApp', // cible l'élement HTML où nous pourrons utiliser toutes les variables ci-dessous
        data: {
            // sera utilisé comme indicateur de chargement de l'application
            loaded: false,

            // cityName, variable utilisé dans le formulaire via v-model
            formCityName: '',

            message: 'WebApp Loaded.',
            messageForm: '',

            // liste des villes saisies, initialiser avec Paris
            cityList: [{
                name : 'Paris'
            }],

            // cityWeather contiendra les données météo reçus par openWeatherMap
            cityWeather : null,

            // indicateur de chargement
            cityWeatherLoading : false
        },

        // 'mounted' est exécuté une fois l'application VUE totalement disponible
        // Plus d'info. sur le cycle de vie d'une app VUE : 
        // https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
        mounted : function(){
            this.loaded = true;
            this.readData();
        },

        // ici, on définit les methodes qui vont traiter les données décrites dans DATA
        methods: {
            readData: function (event) {
                console.log('JSON.stringify(this.cityList)', JSON.stringify(this.cityList)); // va afficher la liste des villes
                // JSON.stringify permet transfomer une liste en chaine de caractère

                console.log('this.loaded:', this.loaded); // va afficher 'this.loaded: true'
            },
            addCity: function (event) {
                event.preventDefault(); // pour ne pas recharger la page à la soumission du formulaire

                console.log('formCityName:',this.formCityName);
                // A compléter dans la suite du TP  
            },
            remove: function (_city) {      
                // A compléter dans la suite du TP          
            }, 
            meteo: function (_city) {  
                // A compléter dans la suite du TP              
            }
        }
    });
}
```
<div align="center">main.js</div>

💡 Les variables définies dans ```data``` sont accessibles dans les méthodes VUE via le mot clé ```this``` ou l'instance ```app``` de l'application
* Exemple reprenant le code de la méthode VUE ```readDate``` : dans la console de débuggage, exécuter 
```js
console.log('JSON.stringify(app.cityList): ', JSON.stringify(app.cityList)); // va afficher la liste des villes
                // JSON.stringify permet transfomer une liste en chaine de caractère

console.log('app.loaded:', app.loaded); // va afficher 'this.loaded: true'
```

## 4. (index.html) Créer un formulaire pour saisir le nom d'une ville
* Copier le code HTML pour avoir un formulaire
* vérifier que le champ n'est pas vide (ajouter l'attribut ```required``` au champ de saisie)
* Intércepter la soumission du formulaire en ajoutant à la balise ```form``` 
    ```js
    v-on:submit="addCity"
    ```
    
```    html
<!-- formulaire de saisie de ville -->
<form v-on:submit="addCity">
    <div class="input-group">
        <input type="search" class="form-control" v-model="formCityName" placeholder="Search for..." aria-label="Search for..." autofocus required>
        <span class="input-group-btn">
            <button class="btn btn-primary" type="submit">Go!</button>
        </span>
    </div>

    <!-- affichage de nombre de caractères saisie -->
    <small class="text-muted">
        {{formCityName.length}} car.
    </small>

    <div class="alert alert-danger" role="alert" v-if='messageForm != ""'>
        {{messageForm}}
    </div>                
</form>
<!-- fin: formulaire de saisie de ville -->
```

## 5. (main.js) Ajouter une méthode ```addCity``` à l'app VueJS

* Cette méthode doit ajouter la ville saisie(variable ```formCityName```) à la liste ```cityList``` 
    * avec la méthode ```push``` 
    * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/push


```js
app = new Vue({
        el: '#weatherApp',
        data: {
            //[...]
        },

        // 💡 code à copier
        // define methods under the `methods` object
        methods: {
          addCity: function (event) {
            event.preventDefault(); // pour ne pas recharger la page à la soumission du formulaire

            // if(this.isCityExist(this.formCityName)){
            //    this.messageForm = 'existe déjà';
            //}else{
                this.cityList.push({name : this.formCityName});

                // remise à zero du message affiché sous le formulaire
                this.messageForm = '';

                // remise à zero du champ de saisie
                this.formCityName = '';
            //}
          }
        }
});

```

## 6. (main.js) Tester si la ville est déjà dans la liste
* Ajouter une méthode VUE ```isCityExist``` qui testera si la ville est déjà dans la liste
    * Utiliser la méthode native à Javascript 'filter' qui retourne une liste contenant tous les items ayant un nom égale à _cityName
    * Documentation sur filter : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter

```js
var app = new Vue({
        el: '#weatherApp',
        data: {
            //[...]
        },
        // define methods under the `methods` object
        methods: {

            addCity: function (event) {
                [...]
            },

            // 💡 méthode à copier
            isCityExist: function (_cityName){

                // la méthode 'filter' retourne une liste contenant tous les items ayant un nom égale à _cityName
                // doc. sur filter : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter
                if( this.cityList.filter(item => 
                                            item.name.toUpperCase() == _cityName.toUpperCase()
                                        ).length>0){
                    return true;
                }else{
                    return false;
                }
            }
        }
```

## 7. Adapter la méthode ```addCity``` pour tester si la ville existe déjà
* Si la ville existe déjà dans la liste ```cityList```, afficher un message via la variable  this.messageForm = 'existe déjà';

<p align="center">
<kbd><img src="img/form-error.png"></kbd><br/>
Message d'érreur
</p>

```js
 this.messageForm = 'existe déjà';
```

* Sous le formulaire HTML, afficher le message en question : 
```html
<!-- si messageForm n'est pas vide, on l'affiche -->
 <div class="alert alert-danger" role="alert" v-if='messageForm != ""'>
    {{messageForm}}
</div>   
```


## 8 . (index.html) Affichage de la liste des villes saisies

* Sous le formulaire, faire une boucle ```v-for``` pour afficher la liste

```html
<!-- Listing des villes, boucle sur l'array : cityList -->
<h4>Liste des villes ({{cityList.length}})</h4>
<ul class="list-group">
    <a v-for="city in cityList" v-on:click="meteo(city)" class="list-group-item d-flex justify-content-between align-items-center">
        {{city.name}}
        <button v-on:click="remove(city)" class="btn btn-secondary btn-sm" title="Supprimer de la liste">&times;</button>
    </a>
</ul>

<div class="alert alert-primary" role="alert" v-if="cityList.length==0">
    Aucune ville de saisie!
</div>

<!-- fin : Listing des villes -->
```

## 9. (main.js) Suppression d'une ville 

* Compléter la méthode VUE ```remove``` pour supprimer une ville de la liste

```js
remove: function(_city){
    // on utilise 'filter' pour retourne une liste avec tous les items ayant un nom différent de _city.name
    this.cityList = this.cityList.filter(item => item.name != _city.name);
}
```

## 10. (main.js) Demande des données météo à OpenWeatherMap
*  Compléter la méthode VUE ```meteo``` pour faire un appel à OpenWeatherMap
*  On utilisera ```fetch``` pour faire l'appel AJAX 
    * https://davidwalsh.name/fetch
    * https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch

```js
// à ajouter à la suite des autres méthodes VUE
meteo : function (_city){

    this.cityWeatherLoading = true;

    // appel AJAX avec fetch
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+_city.name+'&units=metric&lang=fr&apikey=VOTRE_APIKEY')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            app.cityWeatherLoading = false;

            // test du code retour
            // 200 = OK
            // 404 = city not found 
            if(json.cod == 200){
                // on met la réponse du webservice dans la variable cityWeather
                app.cityWeather = json;
                app.message = null;
            }else{
                app.cityWeather = null;
                app.message = 'Météo introuvable pour ' + _city.name 
                                + ' (' + json.message+ ')';
            }        
        });        
    }
}
```

## 11. (index.html) Affichage de la méteo

* Les données météo étant chargées dans la variable ```cityWeather```, on va la mettre en forme avec une ```card``` Boostrap
    * https://getbootstrap.com/docs/5.1/components/card/#kitchen-sink

<p align="center">
<kbd><img src="img/card.png"   style="box-shadow: 0 0 1em grey" border='1'></kbd><br/>
Carte météo
</p>

```html
<!-- meteo de la ville selectionnée -->
<div v-if="cityWeatherLoading"> Chargement de la météo...</div>

<div v-if="cityWeather">

    <div class="card" style="width: 18rem;" v-if="cityWeather">
        <div class="card-header">
            {{cityWeather.name}} 
        </div>
        <img class="card-img-top" v-bind:src="'url google map'" alt="Card image cap">

        <div class="card-body">
            <h5 class="card-title">
                <i v-bind:class="'wi wi-owm-day-'+cityWeather.weather[0].id"></i>
                {{cityWeather.main.temp}}<i class="wi wi-celsius"></i>                            
            </h5>
            <p class="card-text">{{cityWeather.weather[0].description}}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <i class="wi wi-cloud"></i> Nuage: {{cityWeather.clouds.all}}%                            
            </li>
            <li class="list-group-item">
                <i class="wi wi-humidity"></i> Humidité: {{cityWeather.main.humidity}}%                           
            </li>
            <li class="list-group-item">
                <i class="wi wi-windy"></i> Vent: {{cityWeather.wind.speed}} km/h
            </li>
            <li class="list-group-item">
                <i class="wi wi-sunrise"></i> 
                Levé du soleil: 
                {{new Date(cityWeather.sys.sunrise * 1000).toTimeString()}}
            </li>
            <li class="list-group-item">
                <i class="wi wi-sunset"></i>
                Couché du soleil: 
                {{new Date(cityWeather.sys.sunset * 1000).toTimeString()}}
            </li>
        </ul>        
    </div>
</div>
```

## 12. Affichage une image Google Map

* Afficher une image en utilisant les coordonnées lattitude et longitude renvoyées par OpenWeathermap

    * Pattern de l'URL:
```
https://maps.googleapis.com/maps/api/staticmap?markers='+LATITTUDE+','+LONGITUDE+'&zoom=5&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg'
```

* Si l'image ne s'affiche pas, essayez en mettant une autre clé Google (key)


## 13. Affichage des icones météo 

* Télécharger le code source (dossier css et font) des icones météo sur https://erikflowers.github.io/weather-icons/

Votre répertoire doit ressembler à ça:

```
tp5/
├── index.html
├── css/
│   ├── bootstrap.css
│   ├── weather-icons.css ⬅️
│   ├── weather-icons.min.css  ⬅️
├── font/ ⬅️
│   ├── weathericons-regular-webfont.eot ⬅️
│   ├── weathericons-regular-webfont.svg ⬅️
│   ├── weathericons-regular-webfont.ttf ⬅️
│   ├── weathericons-regular-webfont.woff ⬅️
│   ├── weathericons-regular-webfont.woff2 ⬅️
└── js/
    └── libs/
        ├── bootstrap.bundle.js
        └── vue.js
    └── main.js
```


Y faire référence dans index.html
```html
<link rel="stylesheet" href="css/weather-icons.min.css">
```

Pour utiliser les icones, il suffit de connaitre la classe CSS correspondante, exemple pour un nuage:

```html
<i class="wi wi-cloud"></i>
```
