import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

//const LocationText = ({ text,size }) => <div style = {{fontSize:size}}>{text}</div>;

const LocationMarker = ({text}) => <div><img alt = {text} src ={`/images/pointer.png`}></img></div>;
export class GoogleMap extends Component {

    constructor(props){
        super(props);
        this.state = {
            address: this.props.address,
            zoom: this.props.zoom,
            center: {}
        }
        this.getGPS = this.getGPS.bind(this);
    }
    
    componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            this.getGPS();
        }
    }
    
    async getGPS(){
        let slug = this.props.address.street.split(' ').join('+') + ",+" + this.props.address.city.split(' ').join('+') + ",+" + this.props.address.state.split(' ').join('+') + ",+" + this.props.address.country.split(' ').join('+');
        await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${slug}&key=AIzaSyDk-ajlF-VYrDHvb1VxuY62XnHDkVwSDvk`)
			.then(res => {
				//Get the longitutde and latitude from the data
				this.setState({center: res.data.results[0].geometry.location});
			})
			.catch(err => {
				console.log(err.response);
			})
    }

    

    render() {

        return (
            <div style={{ height: '10em', width: '100%', borderRadius: "1em", overflow: "auto"}}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: `AIzaSyDk-ajlF-VYrDHvb1VxuY62XnHDkVwSDvk` }}
                //Default of Windsor, Ontario
                defaultCenter={{
                    lat: 42.3149,
                    lng: 83.0364
                }}
                center={this.state.center}
                defaultZoom={this.state.zoom}
                
            >
            <LocationMarker
                lat={this.state.center.lat}
                lng={this.state.center.lng}
                text={'HERE'}
                size={20}
            />
            </GoogleMapReact>
            </div>
        );
    }
}
 
export default GoogleMap;
