import React from 'react';
import LandingPageLayout from '@/layouts/LandingPageLayout';
import AboutUs from '@/components/LandingPage/AboutUs';

export default function Contact() {
  return (
    <LandingPageLayout currentRoute="ABOUT" landingPageImageUrl="/about_us_hospital.png">
     <AboutUs />
    </LandingPageLayout>
  )
}