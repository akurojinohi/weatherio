import express from 'express';
import fetch from 'node-fetch'; // ES module import
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/geocode', async (req, res) => {
    const { city } = req.query;
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch geocoding data' });
    }
});

app.get('/historical-weather', async (req, res) => {
    const { latitude, longitude, start_date, end_date } = req.query;
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch historical weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
