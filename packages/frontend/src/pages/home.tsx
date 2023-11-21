import React from 'react';
import LandingPageLayout from '@/layouts/LandingPageLayout';
import ProblemStatement from '@/components/LandingPage/ProblemStatement';
import ContactUsLanding from '@/components/LandingPage/ContactUsLanding';
import Testimonials from '@/components/LandingPage/Testimonials/Testimonials';
import HealthCards from '@/components/LandingPage/HealthCards';

export default function home() {
  return (
    <LandingPageLayout >
        <ProblemStatement/>
        <HealthCards />
        <ContactUsLanding />
        <Testimonials />
    </LandingPageLayout>
  )
}
