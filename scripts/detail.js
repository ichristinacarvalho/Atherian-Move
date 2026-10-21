const params = new URLSearchParams(window.location.search)
const rideID = params.get("id")
const ride = getRideRecord(rideID)

document.addEventListener("DOMContentLoaded", async () => {

    // Verificação colocada no lugar certo (dentro da função)
    if (!ride || !ride.data || ride.data.length === 0) {
        alert("Nenhum dado encontrado para esta corrida.")
        window.location.href = "./index.html"
        return
    }

    const dataElement = document.createElement("div")
    dataElement.className = "flex-fill d-flex flex-column"

    const firstPosition = ride.data[0]
    let firstLocationData = { city: "Local desconhecido", countryCode: "" }

    try {
        firstLocationData = await getlocationData(firstPosition.latitude, firstPosition.longitude)
    } catch (error) {
        console.warn("Não foi possível carregar a cidade:", error)
    }

    const cityDiv = document.createElement("li")
    cityDiv.innerText = `${firstLocationData.city}  ${firstLocationData.countryCode}`
    cityDiv.className = "text-primary mb-2"

    const maxSpeedDiv = document.createElement("div")
    maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} Km/h`
    maxSpeedDiv.className = "h5"

    const distanceDiv = document.createElement("div")
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km/h`

    const durationDiv = document.createElement("div")
    durationDiv.innerText = `Duration: ${getDuration(ride)}`

    const dateDiv = document.createElement("div")
    dateDiv.innerText = getStartDate(ride)
    dateDiv.className = "text-secondary mt-2"

    dataElement.appendChild(cityDiv)
    dataElement.appendChild(maxSpeedDiv)
    dataElement.appendChild(distanceDiv)
    dataElement.appendChild(durationDiv)
    dataElement.appendChild(dateDiv)

    document.querySelector("#data").appendChild(dataElement)

    const deleteButton = document.querySelector("#deleteBtn")
    deleteButton.addEventListener("click", () => {
        deleteRide(rideID)
        window.location.href = "./index.html" // Ajustado para não quebrar no GitHub Pages
    })

    const map = L.map("mapDetail")
    map.setView([firstPosition.latitude, firstPosition.longitude], 13)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 5,
        maxZoom: 16,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const positionsArray = ride.data.map(position => [position.latitude, position.longitude])

    if (positionsArray.length > 1) {
        const polyLine = L.polyline(positionsArray, { color: "#F00" })
        polyLine.addTo(map)
        map.fitBounds(polyLine.getBounds())
    } else {
        L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map)
    }
})