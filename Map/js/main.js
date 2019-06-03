var geoJson;
var map;
var survey_data;
/** TODO: Extra info to put for each neighborhood:
- Rent cost graph
- Comments
- Parking cost graph
- Average satisfaction
- List of buildinig names
*/

// ===== PAGE READY ==== //
$(document).ready(function() {
    loadSurveyData();
    createMap();
    attachHandlers();
});

function loadSurveyData() {
    $.getJSON('data/comments.json', function(data) {
        survey_data = data;
    }).fail(function() {
        alert("There has been a problem loading the survey data");
    });
}

function createMap() {
    var mapboxAccessToken = 'pk.eyJ1Ijoiamtvc2VyIiwiYSI6ImNpbWtxNTg2NzAxNGl2cGtnY3k1dGU3aXEifQ.VbZ8l9bL6wsh8dgaI8gTuw';
    map = L.map('map').setView([42.995051, -89.421230], 12);
    
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
        id: 'mapbox.dark',
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }).addTo(map);
    
    geojson = L.geoJson(na_data, {
        style: style_generator,
        onEachFeature: onEachFeature
    }).addTo(map);
}
    
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

function style_generator(feature) {
    return {
        fillColor: getColor(feature.properties.NUMPOINTS)[0],
        weight: 1,
        opacity: 0.7,
        color: getColor(feature.properties.NUMPOINTS)[1],
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function zoomToFeature(e) {
    var layer = e.target;
    var height_offset = window.innerHeight / 2;

    map.fitBounds(layer.getBounds(), {paddingBottomRight: [0, height_offset]});
    console.log(layer.feature.properties.NA_ID)
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    e.target.closePopup();
}

function highlightFeature(e) {
    var layer = e.target;
    var popup = L.popup()
        .setLatLng(layer.getBounds().getCenter())
        .setContent(layer.feature.properties.NEIGHB_NAM)
        .openOn(map);

    layer.setStyle({
        weight: 5,
        dashArray: '',
        fillOPacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function attachHandlers() {
    console.log("hi")
}