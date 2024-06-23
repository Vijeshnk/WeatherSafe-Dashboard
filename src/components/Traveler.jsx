import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { Luggage, Umbrella, WbSunny, AcUnit, Thermostat, Visibility } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Traveler = ({ weatherData }) => {
    if (!weatherData) return null;

    const getTravelAdvice = () => {
        const temp = weatherData.main?.temp;
        const weatherMain = weatherData.weather[0]?.main.toLowerCase();

        let advice = [];

        if (temp < 10) advice.push({ text: "Pack warm clothes.", icon: <AcUnit /> });
        if (temp > 25) advice.push({ text: "Bring light, breathable clothing.", icon: <WbSunny /> });
        if (weatherMain?.includes('rain')) advice.push({ text: "Don't forget an umbrella or raincoat.", icon: <Umbrella /> });
        if (weatherMain?.includes('snow')) advice.push({ text: "Pack winter boots and snow gear.", icon: <AcUnit /> });
        if (weatherMain?.includes('clear')) advice.push({ text: "Great weather for sightseeing!", icon: <WbSunny /> });

        return advice.length > 0 ? advice : [{ text: "Check local weather for specific packing needs.", icon: <Luggage /> }];
    };

    const chartData = [
        { name: 'Morning', temp: weatherData.main?.temp_min },
        { name: 'Noon', temp: weatherData.main?.temp },
        { name: 'Evening', temp: weatherData.main?.temp_max },
    ];

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>Travel Weather Guide</Typography>
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
                            <Visibility sx={{ mr: 1 }} />
                            <Typography variant="body2">
                                Visibility: {(weatherData.visibility / 1000).toFixed(1) || 'N/A'} km
                            </Typography>
                        </Box>
                        <Box mt={3}>
                            <Typography variant="h6" gutterBottom>Travel Advice:</Typography>
                            {getTravelAdvice().map((advice, index) => (
                                <Box key={index} display="flex" alignItems="center" mb={1}>
                                    {advice.icon}
                                    <Typography variant="body2" style={{ marginLeft: 8 }}>
                                        {advice.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>Temperature Forecast</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis
                                    yAxisId="left"
                                    orientation="left"
                                    stroke="#8884d8"
                                    axisLine={true}
                                    tickLine={true}
                                    tickFormatter={(value) => `${value}°C`}
                                />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="temp" stroke="#8884d8" yAxisId="left" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Traveler;