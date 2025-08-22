const apiKey = "3018048366427adae6b2b6f67e8775b2";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const weatherIcon = document.querySelector("#weather-icon");

async function fetchWeatherData(city) {
  try {
    const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    document.querySelector("#temperature").innerHTML = `${Math.round(
      data.main.temp
    )} °C`;
    document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#humidity").innerHTML = `${data.main.humidity} %`;
    document.querySelector("#wind").innerHTML = `${data.wind.speed} m/s`;
    document.querySelector("#error-message").innerHTML = ""; // Clear error on success

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "https://cdn-icons-png.flaticon.com/128/414/414927.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/128/15621/15621953.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/128/2864/2864448.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/128/15862/15862472.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/128/3718/3718549.png";
    } else {
      weatherIcon.src =
        "https://cdn-icons-png.flaticon.com/128/4643/4643191.png";
    }
  } catch (error) {
    console.error("Fetch error: ", error);
    document.querySelector("#error-message").innerHTML =
      "City not found. Please enter a valid city name.";
  }
}

fetchWeatherData("Indore");

// Search on button click
document.querySelector("button").addEventListener("click", () => {
  const city = document.querySelector("#search").value;
  fetchWeatherData(city);
});

// Search on Enter key press
document.querySelector("#search").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = event.target.value;
    fetchWeatherData(city);
  }
});
