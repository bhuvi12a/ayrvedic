import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Hero from './Components/Herosection';
import Aboutpage from './Components/AboutSection';
import Service from './Components/ServicesSection';
import Team from './Components/TeamSection';
import TestimonialsSection from './Components/TestimonialsSection';


export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Aboutpage />
      <Team />
      <Service />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}