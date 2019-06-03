const React = window.React
const { Map, Popup, TileLayer, GeoJSON } = window.ReactLeaflet


class Basemap extends React.Component {
    constructor() {
        super()
        this.state = {
            lat: 42.995051,
            lng: -89.421230,
            zoom: 12
        }
        this.mapboxAccessToken = 'pk.eyJ1Ijoiamtvc2VyIiwiYSI6ImNpbWtxNTg2NzAxNGl2cGtnY3k1dGU3aXEifQ.VbZ8l9bL6wsh8dgaI8gTuw';
        this.url = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this.mapboxAccessToken;
    }

   
    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                    url={this.url}
                    id='mapbox.dark'
                />
                <Neighborhoods />
            </Map>
        );
    }
}

class Neighborhoods extends React.Component {
    zoomToFeature = (e) => {
        var layer = e.target;
        var height_offset = window.innerHeight / 2;
    
        map.fitBounds(layer.getBounds(), {paddingBottomRight: [0, height_offset]});
        console.log(layer.feature.properties.NA_ID)
    }
    
    resetHighlight = (e) => {
        geojson.resetStyle(e.target);
        e.target.closePopup();
    }
    
    highlightFeature = (e) => {
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
    
    style_generator = (feature) => {
        return {
            fillColor: getColor(feature.properties.NUMPOINTS)[0],
            weight: 1,
            opacity: 0.7,
            color: getColor(feature.properties.NUMPOINTS)[1],
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    render() {
        return (
            <GeoJSON 
                data={na_data}
                style={this.style_generator}
            />
        )
    }
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

window.ReactDOM.render(<Basemap />, document.getElementById('map'))