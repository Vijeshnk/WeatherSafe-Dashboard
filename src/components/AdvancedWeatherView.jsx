import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AdvancedWeatherView = ({ weatherData }) => {
  if (!weatherData) return null;

  const generateHourlyForecast = () => {
    const currentHour = new Date().getHours();
    return Array.from({ length: 24 }, (_, i) => {
      const hour = (currentHour + i) % 24;
      const temp = weatherData.main.temp + Math.random() * 5 - 2.5; // Simulated temperature variation
      const humidity = Math.min(100, Math.max(0, weatherData.main.humidity + Math.random() * 20 - 10)); // Simulated humidity variation
      return {
        hour: `${hour}:00`,
        temperature: temp.toFixed(1),
        humidity: humidity.toFixed(0),
      };
    });
  };

  const hourlyData = generateHourlyForecast();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>24-Hour Temperature Forecast</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>24-Hour Humidity Forecast</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="humidity" fill="#82ca9d" name="Humidity (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdvancedWeatherView;