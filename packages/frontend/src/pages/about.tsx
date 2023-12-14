import React from 'react';
import LandingPageLayout from '@maltas-dashboard/frontend/src/layouts/LandingPageLayout';
import AboutUs from '@maltas-dashboard/frontend/src/components/LandingPage/AboutUs';

export default function Contact() {
  return (
    <LandingPageLayout currentRoute="ABOUT" landingPageImageUrl="/about_us_hospital.png">
     <AboutUs />
    </LandingPageLayout>
  )
}