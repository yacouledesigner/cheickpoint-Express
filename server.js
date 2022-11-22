const express = require("express");
const app = express();
const port = 5500;
const fs = require("fs");

app.use(express.static(__dirname));

/*Pour commencer il faut extraire les heures pour pouvoir les 
utilisés en fonction de l'heure de fermeture de d'ouverture */
let date = new Date();
let hours = date.getUTCHours();

/*Maintenant il faut definir les jours pour pouvoir se baser dessus 
et enfin obtenir les jours ouvrables */

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = weekday[date.getUTCDay()];

/*console.log(day)
par defaut la sortie est thursday donc pou me balader entre 
les jours je devrais utiliser des valeurs numuriques ex :
let day = weekday[date.getUTCDay()-1 ou + 1]
*/

/*Et pour terminer il reste a etablir la logique , les jours pivot 
et heures pivots qui nous aideront a etablir nos conditions
 */

let sunday = weekday[date.getUTCDay() - 4];
let saturday = weekday[date.getUTCDay() + 2];

/*mise en place de la logique */

app.get("/", (req, res) => {
  if (hours >= 9 && hours <= 17 && day !== sunday && day !== saturday) {
    res.status(200).sendFile(__dirname + "/pages/home.html");
  } else {
    res.status(404).send("nous sommes fermés le weekend");
  }
});

app.get("/services", (req, res) => {
  if (hours >= 9 && hours <= 17 && day !== sunday && day !== saturday) {
    res.status(200).sendFile(__dirname + "/pages/services.html");
  } else {
    res.status(404).send("nous sommes fermés le weekend");
  }
});

app.get("/contacts", (req, res) => {
  if (hours >= 9 && hours <= 17 && day !== sunday && day !== saturday) {
    res.status(200).sendFile(__dirname + "/pages/contact.html");
  } else {
    res.status(404).send("nous sommes fermés le weekend");
  }
});

app.listen(port, () =>
  console.log("application listening on http://localhost:" + port)
);
