var mapboxAccessToken = 'pk.eyJ1Ijoiamtvc2VyIiwiYSI6ImNpbWtxNTg2NzAxNGl2cGtnY3k1dGU3aXEifQ.VbZ8l9bL6wsh8dgaI8gTuw';
var map = L.map('map').setView([43.073051, 	-89.401230], 12);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.dark',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
}).addTo(map);

function getColor(numPts) {
    return numPts >= 9 ? ['#7f0000', 'white'] :
       numPts >= 8  ? ['#b30000', 'white'] :
       numPts >= 7  ? ['#d7301f', 'white'] :
       numPts >= 6  ? ['#ef6548', 'white'] :
       numPts >= 5  ? ['#fc8d59', 'white'] :
       numPts >= 4  ? ['#fdbb84', 'white'] :
       numPts >= 3  ? ['#fdd49e', 'white'] :
       numPts >= 2  ? ['#fee8c8', 'white'] :
       numPts >= 1  ? ['#fff7ec', 'white'] :
                     ['None', 'None'] ;
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.NUMPOINTS)[0],
        weight: 1,
        opacity: 0.7,
        color: getColor(feature.properties.NUMPOINTS)[1],
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(na_data, {style: style}).addTo(map);