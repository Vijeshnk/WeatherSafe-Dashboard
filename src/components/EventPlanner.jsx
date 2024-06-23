import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { WbSunny, Umbrella, AcUnit, Thermostat } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const EventPlanner = ({ weatherData }) => {
  if (!weatherData) return null;

  const getEventRecommendation = () => {
    const temp = weatherData.main?.temp;
    const weatherMain = weatherData.weather[0]?.main.toLowerCase();

    if (weatherMain?.includes('clear')) return "Perfect weather for outdoor events!";
    if (weatherMain?.includes('rain') || weatherMain?.includes('thunderstorm')) return "Consider indoor venues or provide shelter for outdoor events.";
    if (temp < 10) return "Chilly weather. Ensure heating for outdoor events or move indoors.";
    if (temp > 30) return "Hot weather. Provide shade and hydration stations for outdoor events.";
    return "Moderate weather. Suitable for both indoor and outdoor events.";
  };

  const getWeatherIcon = () => {
    const weatherMain = weatherData.weather[0]?.main.toLowerCase();
    if (weatherMain?.includes('rain')) return <Umbrella style={{ color: '#1976d2' }} />;
    if (weatherMain?.includes('clear')) return <WbSunny style={{ color: '#ffa000' }} />;
    if (weatherMain?.includes('snow')) return <AcUnit style={{ color: '#4fc3f7' }} />;
    return <Thermostat style={{ color: '#e64a19' }} />;
  };

  const chartData = [
    { name: 'Clear Sky', value: 100 - (weatherData.clouds?.all || 0) },
    { name: 'Clouds', value: weatherData.clouds?.all || 0 },
  ];

  const COLORS = ['#FFBB28', '#00C49F'];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Event Weather Planner</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              Current conditions in {weatherData.name || 'Unknown Location'}:
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <Thermostat sx={{ mr: 1 }} />
              <Typography variant="body2">
                Temperature: {weatherData.main?.temp?.toFixed(1) || 'N/A'}°C (Feels like: {weatherData.main?.feels_like?.toFixed(1) || 'N/A'}°C)
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <WbSunny sx={{ mr: 1 }} />
              <Typography variant="body2">
                Weather: {weatherData.weather[0]?.description || 'N/A'}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
              <Umbrella sx={{ mr: 1 }} />
              <Typography variant="body2">
                Humidity: {weatherData.main?.humidity || 'N/A'}%
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>
                Event Recommendation:
              </Typography>
              <Box display="flex" alignItems="center">
                {getWeatherIcon()}
                <Typography variant="body1" style={{ marginLeft: 8 }}>
                  {getEventRecommendation()}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Sky Conditions</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EventPlanner;