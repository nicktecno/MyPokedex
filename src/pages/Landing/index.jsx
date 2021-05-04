import React from 'react';
import './styles.css';

import PageHeader from '../../components/PageHeader';
import BlocoMarrom from '../../components/BlocoMarrom';
import Carrossel from '../../components/Carrosel';
import Footer from '../../components/Footer';

const Landing = () => (
  <div className="container">
    <BlocoMarrom />
    <PageHeader />
    <Carrossel />
    <Footer />
  </div>
);
export default Landing;
