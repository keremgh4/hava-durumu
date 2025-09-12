const apiKey = 'a6b6c3617e0796a398b5c557890d1f3d';

function getWeather() {
  const city = document.getElementById('city').value.trim();
  if (!city) {
    alert('Lütfen bir şehir adı girin');
    return;
  }

  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('weather-info').classList.add('hidden');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('API isteği başarısız oldu!');
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById('loading').classList.add('hidden');

      if (data.cod === 200) {
        document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').textContent = `Sıcaklık: ${data.main.temp}°C`;
        document.getElementById('description').textContent = `Durum: ${data.weather[0].description}`;
        document.getElementById('humidity').textContent = `Nem: ${data.main.humidity}%`;
        document.getElementById('wind-speed').textContent = `Rüzgar Hızı: ${data.wind.speed} km/s`;

        document.getElementById('weather-info').classList.remove('hidden');
        changeBackground(data.weather[0].description);
      } else {
        alert('Şehir bulunamadı.');
      }
    })
    .catch((error) => {
      console.error('Hata:', error);
      alert('Veri çekme hatası: ' + error.message);
      document.getElementById('loading').classList.add('hidden');
    });
}

function changeBackground(weatherDescription) {
  const body = document.body;
  const videoElement = document.getElementById('bg-video');
  const videoSource = document.getElementById('video-source');

  const desc = weatherDescription.toLowerCase();
  let videoFile = 'default.mp4';

  if (desc.includes('açık')) {
    videoFile = 'sunny.mp4';
  } else if (desc.includes('yağmur')) {
    videoFile = 'rainy.mp4';
  } else if (desc.includes('bulut')) {
    videoFile = 'cloudy.mp4';
  } else if (desc.includes('kapalı') || desc.includes('overcast')) {
    videoFile = 'cloudy.mp4';
  } else if (desc.includes('rüzgar')) {
    videoFile = 'windy.mp4';
  } else if (desc.includes('kar')) {
    videoFile = 'snowy.mp4';
  }

  videoSource.setAttribute('src', `videos/${videoFile}`);
  videoElement.load();
}

window.onload = function () {
  const form = document.getElementById('search-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      getWeather();
    });
  }
};

// Opsiyonel: Otomatik güncelleme
// setInterval(() => {
//   getWeather();
// }, 10 * 60 * 1000);
