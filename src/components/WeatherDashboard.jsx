import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Tabs, Tab, Box, TextField, Button, Alert, Snackbar, Grid } from '@mui/material';
import { WbSunny, Cloud, Opacity, Air } from '@mui/icons-material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import AdventureCast from './AdventureCast';
import EventPlanner from './EventPlanner';
import Farmer from './Farmer';
import Traveler from './Traveler';
import AdvancedWeatherView from './AdvancedWeatherView';

const apiKey = '1a965b9727335460768026c62c1f0a8b';

const WeatherCard = ({ icon: Icon, title, value, unit }) => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center">
        <Icon style={{ fontSize: 40, marginRight: 16 }} />
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" component="div">
            {value}{unit}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const WeatherDashboard = () => {
  const [selectedView, setSelectedView] = useState('simple');
  const [location, setLocation] = useState('London');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    fetchWeatherData(location);
  }, []);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);
      setWeatherData(response.data);
      setLocation(city);
      setSnackbarMessage(`Weather data updated for ${city}`);
      setOpenSnackbar(true);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError(`City "${city}" not found. Please try another location.`);
      } else {
        setError('Failed to fetch weather data. Please try again later.');
      }
      setSnackbarMessage('Error fetching weather data');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(location);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const simpleChartData = weatherData ? [
    { name: 'Temperature (°C)', value: weatherData.main.temp },
    { name: 'Humidity (%)', value: weatherData.main.humidity },
    { name: 'Wind Speed (m/s)', value: weatherData.wind.speed }
  ] : [];

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
        <Typography variant="h4" component="h1">WeatherSafe Dashboard</Typography>
        <Box component="form" onSubmit={handleLocationSubmit} sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Enter location"
            variant="outlined"
            value={location}
            onChange={handleLocationChange}
            size="small"
            sx={{ mr: 2 }}
          />
          <Button type="submit" variant="contained" sx={{ mr: 2 }}>
            Update
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => setSelectedView('simple')} 
            sx={{ mr: 2 }}
            disabled={selectedView === 'simple'}
          >
            Simple View
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => setSelectedView('advanced')}
            disabled={selectedView === 'advanced'}
          >
            Advanced View
          </Button>
        </Box>
      </Box>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      {loading ? (
        <Typography>Loading weather data...</Typography>
      ) : weatherData ? (
        <>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="General" />
            <Tab label="AdventureCast" />
            <Tab label="Event Planner" />
            <Tab label="Farmer" />
            <Tab label="Traveler" />
          </Tabs>
          
          <Box>
            {tabValue === 0 && (
              <>
                {selectedView === 'simple' ? (
                  <>
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                      <Grid item xs={12} sm={6} md={3}>
                        <WeatherCard 
                          icon={WbSunny} 
                          title="Temperature" 
                          value={weatherData.main?.temp?.toFixed(1) || 'N/A'} 
                          unit="°C" 
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <WeatherCard 
                          icon={Opacity} 
                          title="Humidity" 
                          value={weatherData.main?.humidity || 'N/A'} 
                          unit="%" 
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <WeatherCard 
                          icon={Air} 
                          title="Wind Speed" 
                          value={weatherData.wind?.speed?.toFixed(1) || 'N/A'} 
                          unit="m/s" 
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <WeatherCard 
                          icon={Cloud} 
                          title="Weather" 
                          value={weatherData.weather[0]?.main || 'N/A'} 
                          unit="" 
                        />
                      </Grid>
                    </Grid>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Weather Overview</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={simpleChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <AdvancedWeatherView weatherData={weatherData} />
                )}
              </>
            )}
            {tabValue === 1 && <AdventureCast weatherData={weatherData} />}
            {tabValue === 2 && <EventPlanner weatherData={weatherData} />}
            {tabValue === 3 && <Farmer weatherData={weatherData} />}
            {tabValue === 4 && <Traveler weatherData={weatherData} />}
          </Box>
        </>
      ) : null}
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default WeatherDashboard;