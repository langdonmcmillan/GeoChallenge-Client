import * as React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { List } from "immutable";

interface Props {
    google: {};
}

interface State {
    markers: List<{}>;
    guessed: boolean;
}

export class GameMap extends React.Component<Props, State> {
    state = {
        markers: List(),
        guessed: false
    };
    handleMapClick = (mapProps: any, map: any, event: any) => {
        if (!this.state.guessed) {
            const newMarker = (
                <Marker
                    title={"Your Guess"}
                    name={"guessMarker"}
                    position={{
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng()
                    }}
                />
            );
            this.setState({
                markers: this.state.markers.insert(0, newMarker),
                guessed: true
            });
        }
    };
    render() {
        const style = {
            width: "67vw",
            height: "67vh"
        };
        return (
            <div>
                <Map
                    onClick={this.handleMapClick}
                    google={this.props.google}
                    style={style}
                    zoom={2}
                    initialCenter={{ lat: 0, lng: 0 }}
                    disableDefaultUI={true}
                    mapTypeControl={false}
                    clickableIcons={false}
                    scaleControl={false}
                    scrollwheel={false}
                    draggable={false}
                    disableDoubleClickZoom={true}
                    zoomControl={false}
                    styles={[
                        {
                            featureType: "administrative.country",
                            elementType: "labels",
                            stylers: [{ visibility: "off" }]
                        }
                    ]}
                >
                    {this.state.markers.toArray()}
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDGutSf0m6mNzjlXt_u-Z0KZJ-3SH3m_Nw"
})(GameMap);
