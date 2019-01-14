var mapboxAccessToken = 'pk.eyJ1Ijoiamtvc2VyIiwiYSI6ImNpbWtxNTg2NzAxNGl2cGtnY3k1dGU3aXEifQ.VbZ8l9bL6wsh8dgaI8gTuw';
var map = L.map('map').setView([43.073051, 	-89.401230], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
    id: 'mapbox.light',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
}).addTo(map);

function getColor(numPts) {
    return numPts > 9 ? '#662506' :
       numPts > 8  ? '#993404' :
       numPts > 7  ? '#cc4c02' :
       numPts > 6  ? '#ec7014' :
       numPts > 5  ? '#fe9929' :
       numPts > 4  ? '#fec44f' :
       numPts > 3  ? '#fee391' :
       numPts > 2  ? '#fff7bc' :
       numPts > 1  ? '#ffffe5' :
                     'None' ;
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.NUMPOINTS),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(na_data, {style: style}).addTo(map);