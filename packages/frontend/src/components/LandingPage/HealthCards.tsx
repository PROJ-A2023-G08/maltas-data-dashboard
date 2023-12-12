import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useMediaQuery, useTheme, Theme } from '@mui/material';

const HealthCards: React.FC = () => {
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);
  const theme = useTheme<Theme>();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const healthData = [
        {
          title: 'Healthy Eating',
          description:
            'Explore the benefits of a balanced diet rich in fruits, vegetables, and whole grains. Learn how nutrition plays a crucial role in maintaining overall health and preventing diseases.',
          image: '/healthy_eating.png',
          margin: false,
        },
        {
          title: 'Cardiovascular Health',
          description:
            'Discover tips and exercises to keep your heart healthy. Cardiovascular health is essential for maintaining a strong and efficient circulatory system.',
          image: '/cardiovascular_health.png',
          margin: true,
        },
        {
          title: 'Mental Wellness',
          description:
            'Prioritize mental health with mindfulness and stress-reducing activities. Learn how to manage stress and maintain a positive mindset for overall well-being.',
          image: '/mental_wellness.png',
          margin: false,
        },
        {
          title: 'Fitness Routine',
          description:
            'Develop a regular fitness routine to enhance your physical strength and flexibility. Explore different exercises for a well-rounded and enjoyable workout.',
          image: '/fitness_routine.png',
          margin: true,
        },
        {
          title: 'Sleep Hygiene',
          description:
            'Understand the importance of quality sleep and adopt good sleep hygiene practices. Learn how adequate sleep contributes to better physical and mental health.',
          image: '/sleep_hygiene.png',
          margin: false,
        },
        {
          title: 'Hydration Habits',
          description:
            'Stay hydrated for optimal health. Discover the benefits of proper hydration and tips for incorporating more fluids into your daily routine.',
          image: '/hydration_habits.png',
          margin: true,
        },
        {
          title: 'Immune Boosting Foods',
          description:
            'Explore a variety of foods that can help strengthen your immune system. Learn about the nutrients that play a key role in supporting immune function.',
          image: '/immune_boosting_foods.png',
          margin: false,
        },
        {
          title: 'Healthy Aging',
          description:
            'Embrace healthy aging with lifestyle choices that promote vitality and longevity. Learn about habits that contribute to graceful aging and well-being.',
          image: '/healthy_ageing.png',
          margin: true,
        },
      ];
      

      return (
        <div className="p-8 bg-primary">
          <Grid container spacing={3}>
            {healthData.map((data, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card
                  sx={{
                   
                    mt: data.margin ? '60px' : '0px',
                    transform: index === hoveredCard ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                >
                  <CardMedia sx={{ height: isSmallScreen? 400 : 200 }} image={data.image} title={data.title} />
                  <CardContent sx={{
                    p: (theme)=> theme.spacing(4),
                    pb: (theme)=> theme.spacing(1)
                  }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button sx={{
                      ml: (theme)=> theme.spacing(3),
                      mb: (theme)=> theme.spacing(3)
                    }} variant="outlined" size="large">View</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      );
};

export default HealthCards;
