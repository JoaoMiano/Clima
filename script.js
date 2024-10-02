document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();
    let city = document.querySelector('#searchInput').value;
    if (city !== '') {
        clearWarning()
        showWarning('Carregando...')

        //fazendo a requisição para obter os dados climaticos da cidade
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=fdfd20c4d84b3be8d75128780a20953c&units=metric&lang=pt_br`
        let result = await fetch(url)
        let json = await result.json()

        if (json.cod == 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                description: json.weather[0].description,
                icon: json.weather[0].icon,
                speed: json.wind.speed,
                deg: json.wind.deg
            })
        } else {
            clearWarning()
            showWarning('Não encontramos esta localização')
        }

    }



})

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}

function showInfo(json) {

    showWarning('')

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.speed} <span>km/h</span>`
    document.querySelector('.desc').innerHTML = `${json.description}`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.icon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.deg - 90}deg)`

    document.querySelector('.resultado').style.display = 'block'
}

function clearWarning() {
    document.querySelector('.resultado').style.display = 'none'
}