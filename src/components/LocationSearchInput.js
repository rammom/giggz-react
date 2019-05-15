import React from 'react';
import axios from 'axios';
import PlacesAutocomplete, {
geocodeByAddress,
getLatLng,
} from 'react-places-autocomplete';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ClipLoader from 'react-spinners/ClipLoader';

export class LocationSearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            address: '',
            lat: null,
            lng: null,
            range: 50,
            locationLoading: false,
        };
    }

    handleChange = address => {
        this.setState({ address });
    };

    getStores = () => {
        return new Promise((resolve, reject) => {

            let lat = this.state.lat;
            let lng = this.state.lng;
            let range = this.state.range;

            if(lat && lng && range){
                axios.get('api/store/getByLocation',{
                    params: {
                        lat,
                        lng,
                        range,
                    }})
                    .then(res => {
                        let stores = res.data.stores;
                        resolve(stores);
                    })
                    .catch(err => {
                        reject(err.response);
                    })
            }
            else {
                reject("BAD REQUEST");
            }
        });            
    }

    handleSelect = address => {
        this.setState({address});
        geocodeByAddress(address)
        .then(results => {
            return getLatLng(results[0])
        })
        .then(latLng => {
            this.setState({lat:latLng.lat,lng:latLng.lng});
        })
        .catch(error => console.error('Error', error));
    };

    handleRange = (e) => {
        this.setState({range:e.target.value});
    }

    reverseGeolocation = () => {
        return new Promise((resolve, reject) => {
            let latlng = {};
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    latlng = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    resolve(latlng);
                });
            }
            else{
                reject("Could not find location");
            }
            
        })
    }
    
    handleLocator = async (e) => {
        e.preventDefault();
        let latlng = await this.reverseGeolocation();
        if(latlng.lat && latlng.lng){
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat},${latlng.lng}&key=AIzaSyDk-ajlF-VYrDHvb1VxuY62XnHDkVwSDvk`)
                .then(res => {
                    this.setState({
                        address: res.data.results[0].formatted_address,
                        lat: latlng.lat,
                        lng: latlng.lng,
                    });
                })
                .catch(err => {
                    console.log(err.response);
                })
        }
    }

    submitRequest = async() => {
        if(this.state.lat && this.state.lng && this.state.range){
            let stores = await this.getStores()
            this.props.processStores(stores);
        }
        
    }

    renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions, loading }) => (
        <Form>
            <Form.Group style={{marginBottom: "0"}}>
                <div style={{display:"flex", maxHeight: "2em"}}>
                    <Form.Control {...getInputProps()} 
                        type = "text" 
                        placeholder = "Enter your Address"
                        className = 'location-search-input'
                        style={{
                            borderBottomRightRadius: "0",
                            borderTopRightRadius: "0",
                            width:"85%",
                            borderBottomLeftRadius: "0",
                            WebkitBorderRadius: "none",
                            boxShadow:"none"
                        }}
                    />

                    <button
                        style = {{
                            border: "none",
                            padding: "0",
                            cursor: "pointer",
                            outline: "inherit",
                        }}
                        onClick = {this.handleLocator}
                    >
                        {!this.state.locationLoading ?
                        <img 
                            alt = "locator" 
                            src="images/locator.png"
                            style = {{
                                height: "calc(2.25rem + 2px)",
                                backgroundColor: "#fff",
                                border: "1px solid #ced4da",
                                borderLeft: "0",
                            }}
                        />
                        :
                        <ClipLoader
                            sizeUnit={"em"}
                            size={2}
                            color={'#000'}
                            loading={this.state.locationLoading}
                        />
                        }
                    </button>
                    <Form.Control 
                        as="select" 
                        value={this.state.range}
                        onChange={this.handleRange}
                        style={{
                            width:"15%",
                            borderTopLeftRadius: "0",
                            borderBottomLeftRadius: "0",
                            borderBottomRightRadius: "0",
                            borderLeft: "0",
                            WebkitAppearance: "none",
                            boxShadow:"none"
                    }}>
                    <option value={5}>5km</option>
                    <option value={10}>10km</option>
                    <option value={25}>25km</option>
                    <option value={50}>50km</option>
                    </Form.Control>
                </div>
            </Form.Group>

            <Dropdown.Menu show={(suggestions && suggestions.length > 0) ? true : false} style={{alignSelf:"flex-start", position: "inherit", float: "none", marginTop: "0"}}>
                {suggestions.map(suggestion => (
                <div {...getSuggestionItemProps(suggestion)}>
                    <Dropdown.Item style = {{overflow:"hidden"}}>{suggestion.description}</Dropdown.Item>
                </div>
                ))}
            </Dropdown.Menu>
            <Button 
            variant="danger"
            onClick = {this.submitRequest}
            style = {{
                borderRadius: "0 0 0.25rem 0.25rem",
                boxShadow:"none"
        
            }}
            block>
            Find Giggs in your Area
            </Button>
            
        </Form>
        
    );


    render() {
        return (
        <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            searchOptions={{
                componentRestrictions: {
                    country: ['CA'],
                }}}
        >
        {this.renderFunc}
        </PlacesAutocomplete>
        );
    }
}

export default LocationSearchInput;