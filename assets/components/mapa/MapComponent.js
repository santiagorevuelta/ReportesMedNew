import icon from './icon';
import config from '../../tsconfig.json';
const url = config[config.use].map;

const html_script = `
<!DOCTYPE html>
<html lang="">
<head>
	<title></title>
	<meta charset="utf-8">
	<preference name="Scheme" value="https" />
	<allow-navigation href="https://*"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="">
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
 <!-- Load Leaflet from CDN -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>

  <!-- Load Esri Leaflet from CDN -->
  <script src="https://unpkg.com/esri-leaflet@3.0.4/dist/esri-leaflet.js"
    integrity="sha512-oUArlxr7VpoY7f/dd3ZdUL7FGOvS79nXVVQhxlg6ij4Fhdc4QID43LUFRs7abwHNJ0EYWijiN5LP2ZRR2PY4hQ=="
    crossorigin=""></script>

  <!-- Load Esri Leaflet Vector from CDN -->
  <script src="https://unpkg.com/esri-leaflet-vector@3.1.1/dist/esri-leaflet-vector.js"
    integrity="sha512-7rLAors9em7cR3/583gZSvu1mxwPBUjWjdFJ000pc4Wpu+fq84lXF1l4dbG4ShiPQ4pSBUTb4e9xaO6xtMZIlA=="
    crossorigin=""></script>
 </head>
<body style="padding: 0; margin: 0">
<div id="mapid" style="width: 100%; height: 100vh;"></div>
<script>

const mymap = L.map("mapid", {
      center: [6.2447305, -75.5760133],
      zoom: 15, 
      zoomControl: false,
      attributionControl: false,
      navigation: {momentumEnabled : false}
      })
  
const myIcon = L.icon({
    iconUrl: '${icon}',
    iconAnchor: [21, 42], // point of the icon which will correspond to marker's location 
});


const RadioLocation = L.circleMarker(mymap.getCenter(), {
    color: "#58D2FF",
    fillColor: "#58D2FF", 
    radius: 15}).addTo(mymap);



// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
//     maxZoom: 25,
//     attribution: '',
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1
// }).addTo(mymap);

let cartoDefault = "${url}";

L.esri.tiledMapLayer({
 url: cartoDefault
}).addTo(mymap);

const marker = L.marker(mymap.getCenter(), {
    icon: myIcon
}).addTo(mymap);
 

const radius = L.circleMarker(mymap.getCenter(), {
    color: "#08517F",
    fillColor: "08517FB6",
    radius: 10
}).addTo(mymap);


mymap.on('move', function() {
    marker.setLatLng(mymap.getCenter());
});

var firstLatLng = null;
var distanceOld = 0;
let mover = 1;
 //let sourceMove = false;

mymap.on('moveend', function(e) {
  
    radius.setLatLng(mymap.getCenter());
    if(mover === 0){
        return
    }
    
    let coord = mymap.getCenter();
    let res = L.CRS.EPSG3857.project(coord);
    let distance = 5;
    
    if(firstLatLng !== null){
      distance = parseInt(mymap.distance(firstLatLng ,coord));
      /*L.polyline([firstLatLng, coord], {
        color: 'red'
      }).addTo(mymap);*/
      //alert(distance)
    } 
    // alert(mymap.getZoom());
    let tolerance = 5;
    if(mymap.getZoom() > 18){
      tolerance = 5;
    } else {
      tolerance = (65-((10*mymap.getZoom())/3));
    }
    // alert(tolerance); 
    let coodenadasfinales = {'4326':coord,'3857':{"lat": res.y, "lng":res.x}};
        if(distance > tolerance){
           //if(!sourceMove){
            // if(firstLatLng !== null){
            firstLatLng = null;
            //sourceMove = false;
            window.ReactNativeWebView.postMessage(JSON.stringify(coodenadasfinales));
            // }
           //}
     }
});


function setCoord(lat,lng ){
    mover++
    //sourceMove = true;
    moverenmapa(lat,lng);
}

function moverenmapa(lat,lng,zoom){
  firstLatLng = {lat,lng};
    // mymap.flyTo([lat, lng],zoom)
    mymap.setView([lat, lng],zoom)
}

function setTracking(coords) {
   RadioLocation.setLatLng(coords);
}


</script> 
</body>
</html>
`;

export default html_script;
