function distance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2 - lat1).toRad(); // Javascript functions in radians
  var dLon = (lon2 - lon1).toRad();
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1.toRad()) *
      Math.cos(lat2.toRad()) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

// Converts numeric degrees to radians / Creates the toRad method
if (typeof Number.prototype.toRad === "undefined") {
  Number.prototype.toRad = function () {
    return (this * Math.PI) / 180;
  };
}

function updateMap(event, lat, long) {
  navigator.geolocation.getCurrentPosition(
    () => {},
    () =>
      (header.textContent =
        "Geolocation is not working... Try enabling location for your browser/device settings or for this page")
  );

  if (lat) {
    navigator.geolocation.getCurrentPosition((pos) => {
      header.textContent = "Circle Created";

      let radiusCircle = distance(
        pos.coords.longitude,
        pos.coords.latitude,
        long,
        lat
      );

      map.setView(new L.LatLng(pos.coords.latitude, pos.coords.longitude), 17);

      L.circle([pos.coords.latitude, pos.coords.longitude], {
        radius: radiusCircle * 1000,
      }).addTo(map);
    });
  }
}

function getCoords() {
  switch (numberInput.value) {
    case "12233123122331":
      // Library
      lat = 41.83363679847255;
      long = -87.62831367132178;
      break;
    case "919834":
      // RE
      lat = 41.83691398732371;
      long = -87.6271764686111;
      break;
    case "319273":
      // HH
      lat = 41.835635286934284;
      long = -87.62830984768145;
      break;
    default:
      lat = 0;
      long = 0;
      break;
  }
  lat
    ? (header.textContent = "Code: Success")
    : (header.textContent = "Code: Failure");
}

// Initalize Variables

let lat = 0;
let long = 0;

const buttonMain = document.querySelector(".button-draw");
const buttonGo = document.querySelector(".button-go");
const header = document.querySelector("h1");
const numberInput = document.querySelector(".number-input");

// Initalize Map

var map = L.map("map").fitWorld();

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

// Event Listeners

buttonGo.addEventListener("mouseup", (event) => {
  getCoords();
});

buttonGo.addEventListener("touchend", (event) => {
  getCoords();
});

buttonMain.addEventListener("mouseup", (event) => {
  updateMap(event, lat, long);
});

buttonMain.addEventListener("touchend", (event) => {
  updateMap(event, lat, long);
});
