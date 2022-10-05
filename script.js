// const { response } = require("express");

// const textInput = document.getElementById('ip-or-domain');
// const submitButton = document.querySelector('.submit-button');
// const ipAddressOutput = document.getElementById('.ip-address');
// const locationOutput = document.getElementById('.location');
// const timezoneOutput = document.getElementById('.timezone');
// const ispInput = document.getElementById('.isp');
// const myKey = config.MY_KEY;

const successCallback = (position) => {
    console.log(position);
}

const errorCallback = (error) => {
    console.log(error);
}

// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);

// fetch('https://geo.ipify.org/api/v2/country,city?apiKey=at_DtQQJHBPSRUynpzrcmvEXQtB58DtA&ipAddress=8.8.8.8').then(response => {
//     return response.json();
// }).then(mapData => {
//     const mapObject = mapData.ip;
//     ipAddressOutput.textContent = `${mapObject.ip}`;
// }).catch(error => {
//     console.log(error);
// });