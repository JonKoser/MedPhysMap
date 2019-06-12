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

    zoomToFeature = e => {
        var layer = e.target;
        var height_offset = window.innerHeight / 2;
        this.setState({boundsOptions: {paddingBottomRight: [0, height_offset]}})
        this.setState({bounds: layer.getBounds()})
        // Eventually, I'll use this to update charts and things
        console.log(layer.feature.properties.NA_ID)
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <Map bounds={this.state.bounds}
                boundsOptions={this.state.boundsOptions}
                center={position} 
                zoom={this.state.zoom}>
                <TileLayer
                    attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
                    url={this.url}
                    id='mapbox.dark'
                />
                <Neighborhoods zoomToFeature={this.zoomToFeature} />
            </Map>
        );
    }
}

class Neighborhoods extends React.Component {
    getColor = numPts => {
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

    onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight,
            click: this.props.zoomToFeature
        });
    }

    resetHighlight = e => {
        var layer = e.target;
        layer.setStyle(this.style_generator(layer.feature))
    }
    
    highlightFeature = e => {
        var layer = e.target;
    
        layer.setStyle({
            weight: 5,
            dashArray: '',
            fillOPacity: 1
        });
    
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }
    
    style_generator = feature => {
        return {
            fillColor: this.getColor(feature.properties.NUMPOINTS)[0],
            weight: 1,
            opacity: 0.7,
            color: this.getColor(feature.properties.NUMPOINTS)[1],
            dashArray: '3',
            fillOpacity: 0.7
        };
    }

    render() {
        return (
            <GeoJSON 
                data={na_data}
                style={this.style_generator}
                onEachFeature={this.onEachFeature}
            />
        )
    }
}

window.ReactDOM.render(<Basemap />, document.getElementById('map'))