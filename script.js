// Input
const textInput = document.getElementById('ip-or-domain');
const submitButton = document.querySelector('.submit-button');

// Output
const ipAddressOutput = document.getElementById('ip-address');
const locationOutput = document.getElementById('location');
const timezoneOutput = document.getElementById('timezone');
const ispOutput = document.getElementById('isp');

// Set up map
const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Create custom map pin
const mapPin = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [46, 56], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
});

// Put icon on the map
const marker = L.marker([0, 0], {icon: mapPin}).addTo(map);

// Get IP information and update map
getIPDetails = () => {
    fetch(`https://ipapi.co/${textInput.value}/json/`)
    .then(function(response) {
        response.json().then(jsonData => {
            ipAddressOutput.textContent = jsonData.ip;
            locationOutput.textContent = `${jsonData.city}, ${jsonData.region} ${jsonData.postal}`;
            timezoneOutput.textContent += jsonData.utc_offset;
            ispOutput.textContent = jsonData.org;
            map.setView([jsonData.latitude, jsonData.longitude], 13);
            marker.setLatLng([jsonData.latitude, jsonData.longitude]);
        });
    }) 
    .catch(function(error) {
        console.log(error)
    });
}

getIPDetails();

submitButton.addEventListener('click', e => {
    if (textInput.value != '' && textInput.value != null) {
        getIPDetails(textInput.value);
        return;
    }
})