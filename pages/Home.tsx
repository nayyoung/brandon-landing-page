import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HomePage } from '../components/HomePage';

export const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Brandon Young - Seattle Real Estate Broker for Creatives & Tech Workers</title>
        <meta 
          name="description" 
          content="Seattle real estate broker specializing in helping musicians, founders, and creatives navigate homebuying with non-traditional income. Former musician turned top 10% broker." 
        />
      </Helmet>
      <HomePage />
    </>
  );
};
