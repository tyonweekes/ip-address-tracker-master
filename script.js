// // Input
// const textInput = document.getElementById('ip-or-domain');
// const submitButton = document.querySelector('.submit-button');

// // Output
// const ipAddressOutput = document.getElementById('.ip-address');
// const locationOutput = document.getElementById('.location');
// const timezoneOutput = document.getElementById('.timezone');
// const ispOutput = document.getElementById('.isp');

// // API Key and URL
// const myKey = config.MY_KEY;
// const apiUrl = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_DtQQJHBPSRUynpzrcmvEXQtB58DtA&ipAddress=8.8.8.8';

// // Set up map
// // const map = L.map('map').setView([51.505, -0.09], 13);

// // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //     maxZoom: 19,
// //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// // }).addTo(map);

// // Create custom map pin
// let mapPin = L.icon({
//     iconUrl: './images/icon-location.svg',
//     iconSize: [46, 56], // size of the icon
//     iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
// });

// // Put icon on the map
// L.marker([51.5, -0.09], {icon: mapPin}).addTo(map);

// updateMarker = (update_marker = [-42, 42]) => {
//     map.setView(update_marker, 13);
//     L.marker(update_marker).addTo(map);
// }

// getIPDetails = (default_ip) => {
//     if (default_ip == undefined) {
//         var ip_url = `${apiUrl}?apiKey=${myKey}`;
//     } else {
//         var ip_url = `${apiUrl}?apiKey=${myKey}&ipAddress=${default_ip}`;
//     }

//     fetch(ip_url)
//     .then(results => results.json())
//     .then(data => {
//         ipAddressOutput.innerHTML = data.ip;
//         locationOutput.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`;
//         timezoneOutput.innerHTML = data.location.timezone;
//         ispOutput.innerHTML = data.isp;

//         updateMarker([data.location.lat, data.location.lng]);
//     })
//     .catch(error => alert('Opps! Something went wrong.'));
// }

// getIPDetails();

// document.addEventListener('load', updateMarker());

// submitButton.addEventListener('click', e => {
//     e.preventDefault();
//     if (textInput.value != '' && textInput.value != null) {
//         getIPDetails(textInput.value);
//         return;
//     }
//     alert('Please enter a valid IP address.');
// });

// pull from different file
const secret_api ='ENTER_YOUR_API'
const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'
const api_uri = 'https://geo.ipify.org/api/'
let current_verion = 'v1'

// elements to update 
let current_ip = document.getElementById('current_ip')
let current_town = document.getElementById('current_town')
let current_zone = document.getElementById('current_zone')
let current_isp = document.getElementById('current_isp')

// form elements 
const entered_ip = document.getElementById('ip_address') 
const search_btn = document.getElementById('search_btn')

const headers_option = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}

const map = L.map('display-map', {
    'center': [0,0],
    'zoom': 0,
    'layers': [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
    ]
})

updateMarker = (update_marker = [-33.665, 18.993]) => {
    map.setView(update_marker, 13);
    L.marker(update_marker).addTo(map);
}

getIPDetails = (default_ip) => {
    if(default_ip == undefined){
        var ip_url = `${bypass_cors_url}${api_uri}${current_verion}?apiKey=${secret_api}`
    }
    else {
        var ip_url = `${bypass_cors_url}${api_uri}${current_verion}?apiKey=${secret_api}&ipAddress=${default_ip}`
    }
    fetch(ip_url, headers_option)
    .then( results => results.json())
    .then( data => {
        current_ip.innerHTML = data.ip
        current_town.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
        current_zone.innerHTML = data.location.timezone
        current_isp.innerHTML = data.isp

        // update map marker 
        updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error => {
        alert("Unable to get IP details")
        console.log(error)
    })
}

document.addEventListener('load', updateMarker())

search_btn.addEventListener('click', e => {
    e.preventDefault()
    if (entered_ip.value != '' && entered_ip.value != null) {
        getIPDetails(entered_ip.value)
        return
    }
    alert("Please enter a valid IP address");
})