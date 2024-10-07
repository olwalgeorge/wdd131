document.addEventListener("DOMContentLoaded", function() {
    const temperature = 10; // °C
    const windSpeed = 5; // km/h

    function calculateWindChill(temp, wind) {
        return (13.12 + (0.6215 * temp) - (11.37 * Math.pow(wind, 0.16)) + (0.3965 * temp * Math.pow(wind, 0.16))).toFixed(1);
    }

    let windChill = "N/A";
    
    if (temperature <= 10 && windSpeed > 4.8) {
        windChill = calculateWindChill(temperature, windSpeed);
    }

    document.getElementById("windChill").textContent = windChill + " °C";
});