import React from 'react';
import LandingPageLayout from '@maltas-dashboard/frontend/src/layouts/LandingPageLayout';
import ContactUsLanding from '@maltas-dashboard/frontend/src/components/LandingPage/ContactUsLanding';

export default function Contact() {
  return (
    <LandingPageLayout currentRoute="CONTACT" landingPageImageUrl="/landing_image_contact.png">
        <ContactUsLanding />
    </LandingPageLayout>
  )
}