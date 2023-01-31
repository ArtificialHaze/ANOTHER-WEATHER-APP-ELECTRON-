const form = document.getElementById("form");
const cityValue = document.getElementById("city").value;
let div = document.createElement("div");
div.setAttribute("id", "conditions");

const API_KEY = "10bf667b26e60b9fd4fedd4898d32cc7";

const getWeather = async (city) => {
  await fetch(
    `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
  )
    .then((res) => res.json())
    .then((data) => {
      let img = document.createElement("img");
      img.src = data.current.weather_icons[0];
      img.setAttribute("loading", "lazy");

      let weatherDescription = document.createElement("h4");
      let weatherDescriptionNode = document.createTextNode(
        data.current.weather_descriptions[0]
      );
      weatherDescription.appendChild(weatherDescriptionNode);

      let cityElement = document.createElement("h2");
      let cityElementNode = document.createTextNode(data.request.query);
      cityElement.appendChild(cityElementNode);

      let temperature = document.createElement("div");
      let temperatureNode = document.createTextNode(
        data.current.temperature + " C"
      );
      temperature.appendChild(temperatureNode);

      div.appendChild(img);
      div.appendChild(weatherDescription);
      div.appendChild(temperature);
      div.appendChild(cityElement);

      document.querySelector("main").appendChild(div);
    })
    .catch((error) => console.log(error));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cityValue !== "" || cityValue !== null) {
    let conditions = document.querySelector("#conditions");
    if (conditions) {
      document.querySelector("main").removeChild(conditions);
    }
    getWeather(cityValue);
  } else {
    console.log(
      "You must fill input field before requesting weather condition."
    );
  }
});
