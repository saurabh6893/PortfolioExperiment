const allBoxes = document.querySelectorAll('.box')
//for photo columns in slide a
const acol = document.querySelectorAll('.panel')

let pixbox = document.getElementById('pixbox')

acol.forEach((col) => {
  //col is the name of the each panel
  col.addEventListener('click', () => {
    collapse()
    col.classList.add('active') //to add active to panels
  })
})

function collapse() {
  acol.forEach((col) => {
    col.classList.remove('active')
  })
}

window.addEventListener('scroll', runScroller)

function runScroller() {
  const low = (window.innerHeight / 4) * 2

  allBoxes.forEach((box) => {
    const boxContent = box.getBoundingClientRect().top

    if (boxContent < low) {
      box.classList.add('visible')
    } else {
      box.classList.remove('visible')
    }
  })
}

let weather = {
  apiKey: '4d43cb74396ed340fa665ff0ea1a1726',
  fetchWeather: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then((response) => response.json())
      .then((Data) => this.displayWeather(Data))
  },

  displayWeather: function (data) {
    const { name } = data
    const { icon, description } = data.weather[0]

    const { temp, humidity } = data.main
    const { speed } = data.wind

    console.log(name, icon, description, temp, humidity, speed)
    document.querySelector('.city').innerText = name
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png'
    document.querySelector('.description').innerText = description
    document.querySelector('.humidity').innerText =
      'Humidity: ' + humidity + '%'
    document.querySelector('.temp').innerText = temp + ' °C'
    document.querySelector('.wind').innerText = 'WindSpeed: ' + speed + ' km/hr'
    pixbox.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`
    pixbox.innerHTML = `<h1>${name}</h1>`
  },
  search: function () {
    this.fetchWeather(document.querySelector('.searchBar').value)
  },
}
document.querySelector('.search button').addEventListener('click', function () {
  weather.search()
})
document
  .querySelector('.searchBar')
  .addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      document.querySelector('.search button').click()
    }
  })
