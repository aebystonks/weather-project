const weatherForm = document.querySelector('.weather__form')
const weatherInput = document.querySelector('.weather__input')
const city = document.querySelector('.now__city')
const temperature = document.querySelector('.now__temperature')
const weatherIcon = document.querySelector('.now__img')
const addFavouriteCity = document.querySelector('.now__like')
const favouriteCities = document.querySelector('.weather__cities')
let deleteIcon

let favouriteList = []

function getCity(cityName) {
	const serverUrl = 'http://api.openweathermap.org/data/2.5/weather' //почему внутри функции?
	const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
	const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`

	return fetch(url).then(response => {
		try {
			if (response.ok) {
				return response.json()
			}
		} catch (error) {
			throw new Error(error)
		}
	})
}

weatherForm.addEventListener('submit', event => {
	event.preventDefault()

	const cityName = weatherInput.value

	getCity(cityName)
		.then(response => {
			splitFunction(response.main.temp, response.name, response.weather[0].icon)
		})
		.catch(error => {
			console.error(error)
		})
})

function splitFunction(temp, name, icon) {
	temperature.textContent = Math.round(temp) + '°C'
	city.textContent = name
	weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@4x.png`
	weatherInput.value = ''
}

addFavouriteCity.addEventListener('click', () => {
	addCity(city.textContent)
	splitElements()
	console.log(favouriteList)
})

function splitElements() {
	favouriteCities.textContent = ''
	favouriteList.forEach((element, index) => {
		const newCity = document.createElement('li')
		deleteIcon = document.createElement('span')

		newCity.className = 'weather__city'
		newCity.textContent = element
		deleteIcon.className = 'weather__delete-city'
		newCity.append(deleteIcon)
		favouriteCities.append(newCity)
	})
}

function addCity(newCity) {
	favouriteList.push(newCity)
}

deleteIcon.addEventListener('click', () => {
	alert('deleted')
})
