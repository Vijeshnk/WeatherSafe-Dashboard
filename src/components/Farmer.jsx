import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { Opacity, Thermostat, Air, WbSunny } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Farmer = ({ weatherData }) => {
  if (!weatherData) return null;

  const getFarmingAdvice = () => {
    const temp = weatherData.main?.temp;
    const humidity = weatherData.main?.humidity;
    const windSpeed = weatherData.wind?.speed;
    const weatherMain = weatherData.weather[0]?.main.toLowerCase();

    let advice = [];

    if (temp < 5) advice.push("Risk of frost. Protect sensitive crops.");
    if (temp > 30) advice.push("High heat. Ensure adequate irrigation.");
    if (humidity > 80) advice.push("High humidity. Monitor for fungal diseases.");
    if (windSpeed > 10) advice.push("Strong winds. Delay spraying operations.");
    if (weatherMain?.includes('rain')) advice.push("Rainfall expected. Plan field operations accordingly.");
    if (weatherMain?.includes('clear') && humidity < 30) advice.push("Dry conditions. Consider irrigation if needed.");

    return advice.length > 0 ? advice : ["Weather conditions are generally favorable for farming operations."];
  };

  const chartData = [
    { name: 'Temperature (°C)', value: weatherData.main?.temp },
    { name: 'Humidity (%)', value: weatherData.main?.humidity },
    { name: 'Wind Speed (m/s)', value: weatherData.wind?.speed },
    { name: 'Pressure (hPa)', value: weatherData.main?.pressure / 10 } // Divided by 10 to fit scale
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Farmer's Weather Insights</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Current conditions in {weatherData.name || 'Unknown Location'}:
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <Thermostat sx={{ mr: 1 }} />
              <Typography variant="body2">
                Temperature: {weatherData.main?.temp?.toFixed(1) || 'N/A'}°C
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Opacity sx={{ mr: 1 }} />
              <Typography variant="body2">
                Humidity: {weatherData.main?.humidity || 'N/A'}%
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Air sx={{ mr: 1 }} />
              <Typography variant="body2">
                Wind Speed: {weatherData.wind?.speed?.toFixed(1) || 'N/A'} m/s
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <WbSunny sx={{ mr: 1 }} />
              <Typography variant="body2">
                Weather: {weatherData.weather[0]?.description || 'N/A'}
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>Farming Advice:</Typography>
              <ul>
                {getFarmingAdvice().map((advice, index) => (
                  <li key={index}>{advice}</li>
                ))}
              </ul>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Weather Metrics</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Farmer;