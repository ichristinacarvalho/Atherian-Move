const params = new URLSearchParams(window.location.search)
const rideID = params.get("id")
const ride = getRideRecord(rideID)

document.addEventListener("DOMContentLoaded", async () => {

    const dataElement = document.createElement("div")
    dataElement.className = "flex-fill d-flex flex-column"

    const itemElement = document.createElement("li")
    itemElement.id = ride.id
    itemElement.className = "d-flex p-1 align-items-center justify-content-between shadow-sm gap-3"
    rideListElement.appendChild(itemElement)

    itemElement.addEventListener("click", () => {
        window.location.href = `../detail.html?id=${ride.id}`
    })

    const firstPosition = ride.data[0]
    const firstLocationData = await getlocationData(firstPosition.latitude, firstPosition.longitude)

    const cityDiv = document.createElement("li")
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`
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
    dataElement.appendChild(dateDiv)

    document.querySelector("#data").appendChild(dataElement)
})

//parei aqui