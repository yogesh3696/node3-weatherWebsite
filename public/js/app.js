console.log("Client side js loaded")

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("testing");
    const location =searchElement.value;
    console.log(location);
    messageOne.textContent = "Loading..."
    messageTwo.textContent = "";
    fetch('/weather?address='+location).then((response,error) => {
        console.log("inside response ap.js",response);
        console.log("inside response ap.js",error);
        response.json().then((data) => {
            if(data.error){
                console.log(data.error);
                messageOne.textContent = data.error;
            }else{
                console.log(data.address);
                console.log(data.Forecast);
                messageOne.textContent = data.address;
                messageTwo.textContent = "Current Temparature is "+data.Forecast+"\u00B0C";
                messageThree.textContent = "But it feels like "+data.FeelsLike+"\u00B0C";
            }
        })
    })
})

