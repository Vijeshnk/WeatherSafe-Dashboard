import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { Warning, WbSunny, Opacity, Air } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdventureCast = ({ weatherData }) => {
  if (!weatherData) return null;

  const getAdventureRecommendation = () => {
    const temp = weatherData.main?.temp;
    const windSpeed = weatherData.wind?.speed;
    const weatherMain = weatherData.weather[0]?.main.toLowerCase();

    if (temp < 5) return "Too cold for most outdoor activities. Consider indoor adventures.";
    if (temp > 35) return "Extreme heat. Limit outdoor exposure and stay hydrated.";
    if (windSpeed > 10) return "High winds. Be cautious with activities like hiking or cycling.";
    if (weatherMain?.includes('rain') || weatherMain?.includes('thunderstorm')) return "Wet conditions. Plan indoor activities or ensure proper rain gear.";
    if (weatherMain?.includes('snow')) return "Snowy conditions. Great for winter sports, but be prepared.";
    return "Great weather for outdoor adventures! Enjoy responsibly.";
  };

  const chartData = [
    { name: 'Temperature', value: weatherData.main?.temp },
    { name: 'Feels Like', value: weatherData.main?.feels_like },
    { name: 'Wind Speed', value: weatherData.wind?.speed },
    { name: 'Humidity', value: weatherData.main?.humidity / 10 } // Divided by 10 to fit scale
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>AdventureCast</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Current conditions in {weatherData.name || 'Unknown Location'}:
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <WbSunny sx={{ mr: 1 }} />
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
            <Typography variant="body2" paragraph>
              Weather: {weatherData.weather[0]?.description || 'N/A'}
            </Typography>
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Adventure Recommendation:
              </Typography>
              <Box display="flex" alignItems="center">
                <Warning style={{ marginRight: 8, color: '#ffa000' }} />
                <Typography variant="body1">
                  {getAdventureRecommendation()}
                </Typography>
              </Box>
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

export default AdventureCast;