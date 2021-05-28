import React, {useEffect, useRef, useState} from 'react';
import MarkerIcon from "../assets/img/marker.svg"


interface IMap {
    mapTypeControl?: boolean;
    mapAddresses? : IMapAddress[],
    mapActiveAddress? : number
}

interface IMapAddress {
  lat: number;
  lng: number;
  zoom: number;
}

interface IMarker {
    latitude: number;
    longitude: number;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

const Map: React.FC<IMap> = ({ mapTypeControl = false, mapActiveAddress= 0, mapAddresses =  [{lat: 48.856614, lng: 2.352222, zoom: 12}]}) => {

    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<GoogleMap>();
    const [markers, setMarkers] = useState<Array<GoogleMarker>>([]);

    const startMap = (): void => {
        if (!map) {
          initMap();
        }
    };
    useEffect(startMap, [map]);

    useEffect(() => {
      if (map) {
        map.setCenter({
          lat : +mapAddresses[mapActiveAddress].lat,
          lng : +mapAddresses[mapActiveAddress].lng
        });
      }
    },[mapActiveAddress])


/*
    const initEventListener = ():void => {
        if (map) {
            google.maps.event.addListener(map, 'click', function(e) {
                coordinateToAddress(e.latLng);
            })
        }
    };
    useEffect(initEventListener, [map]);*/

    useEffect(() => {
      if (map) {
        for (let i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
          console.log(markers[i])
        }
        setMarkers([])
        mapAddresses.forEach(({lat, lng}) => addMarker(new google.maps.LatLng(lat,lng)))
        map.setCenter({
          lat : +mapAddresses[mapActiveAddress].lat,
          lng : +mapAddresses[mapActiveAddress].lng
        });
      }
    }, [map, mapAddresses]);

    const addMarker = (location: google.maps.LatLng): void => {
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: MarkerIcon
        });
        setMarkers((oldMarkers)=>[...oldMarkers, marker])
    };

    const initMap = (): void => {
        if (ref.current) {
            setMap(
                new google.maps.Map(ref.current, {
                    zoom: mapAddresses[0].zoom,
                    center: {lat:+mapAddresses[0].lat,lng:+mapAddresses[0].lng},
                    mapTypeControl: mapTypeControl,
                    streetViewControl: false,
                    rotateControl: false,
                    scaleControl: true,
                    fullscreenControl: false,
                    panControl: false,
                    zoomControl: true,
                    gestureHandling: 'cooperative',
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    draggableCursor: 'pointer',
                    styles: [
                      {
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#acd6fe"
                          }
                        ]
                      },
                      {
                        "elementType": "labels.icon",
                        "stylers": [
                          {
                            "color": "#3e82d1"
                          }
                        ]
                      },
                      {
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#3e82d1"
                          }
                        ]
                      },
                      {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#468cd4"
                          },
                          {
                            "visibility": "on"
                          }
                        ]
                      },
                      {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#ffffff"
                          }
                        ]
                      },
                      {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#468cd4"
                          }
                        ]
                      },
                      {
                        "featureType": "poi.attraction",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#468cd4"
                          }
                        ]
                      },
                      {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#d4e7fd"
                          }
                        ]
                      },
                      {
                        "featureType": "poi.park",
                        "elementType": "labels.icon",
                        "stylers": [
                          {
                            "visibility": "off"
                          }
                        ]
                      },
                      {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#468cd4"
                          }
                        ]
                      },
                      {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#ffffff"
                          }
                        ]
                      },
                      {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers": [
                          {
                            "visibility": "off"
                          }
                        ]
                      },
                      {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#468cd4"
                          }
                        ]
                      },
                      {
                        "featureType": "road",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                          {
                            "visibility": "simplified"
                          }
                        ]
                      },
                      {
                        "featureType": "road.arterial",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#183a6a"
                          }
                        ]
                      },
                      {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#ffffff"
                          }
                        ]
                      },
                      {
                        "featureType": "road.highway",
                        "elementType": "labels.icon",
                        "stylers": [
                          {
                            "visibility": "off"
                          }
                        ]
                      },
                      {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#468cd4"
                          }
                        ]
                      },
                      {
                        "featureType": "road.local",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#468cd4"
                          }
                        ]
                      },
                      {
                        "featureType": "transit.line",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#ffffff"
                          },
                          {
                            "visibility": "on"
                          }
                        ]
                      },
                      {
                        "featureType": "transit.station",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#d4e7fd"
                          }
                        ]
                      },
                      {
                        "featureType": "transit.station",
                        "elementType": "labels.icon",
                        "stylers": [
                          {
                            "color": "#d4e7fd"
                          }
                        ]
                      },
                      {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                          {
                            "color": "#ffffff"
                          }
                        ]
                      },
                      {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                          {
                            "color": "#468cd4"
                          }
                        ]
                      }
                    ]
                })
            );
        }
    };

    return <div ref={ref} style={{height: 600, position: 'absolute', bottom: 0, left: 0, width: '100%'}} />;
};

export default Map;
