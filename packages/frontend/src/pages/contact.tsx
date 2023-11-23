import React from 'react';
import LandingPageLayout from '@/layouts/LandingPageLayout';
import ContactUsLanding from '@/components/LandingPage/ContactUsLanding';

export default function Contact() {
  return (
    <LandingPageLayout currentRoute="CONTACT" landingPageImageUrl="/landing_image_contact.png">
        <ContactUsLanding />
    </LandingPageLayout>
  )
}