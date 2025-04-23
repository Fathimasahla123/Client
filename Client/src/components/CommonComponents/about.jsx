// import React from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// //import './About.css'; // Custom styling
// import teamImage from '../../assets/pictures/team.jpg'; // Replace with your actual image
// import restaurantImage from '../../assets/pictures/restaurant-tech.jpg';

// const About = () => {
//   return (
//     <div className="about-page">
//       {/* Hero Section */}
//       <section className="about-hero">
//         <Container>
//           <h1 className="display-3 fw-bold text-white">Eatos: Where Flavor Meets Innovation</h1>
//         </Container>
//       </section>

//       {/* Our Story Section */}
//       <section className="py-5">
//         <Container>
//           <Row className="align-items-center">
//             <Col md={6}>
//               <img 
//                 src={teamImage} 
//                 alt="Eatos team working together" 
//                 className="img-fluid rounded shadow"
//               />
//             </Col>
//             <Col md={6} className="ps-md-5 mt-4 mt-md-0">
//               <h2 className="mb-4">Our Story</h2>
//               <p className="lead">
//                 Eatos was born from a simple belief: great restaurants deserve great technology.
//               </p>
//               <p>
//                 Founded by a team of chefs, restaurateurs, and software engineers, our platform blends 
//                 the art of hospitality with the precision of modern management tools.
//               </p>
//               <p>
//                 Every feature in Eatos tells a story—of late-night brainstorming sessions, of feedback 
//                 from chefs and servers, of the relentless pursuit of making restaurant operations 
//                 smoother, smarter, and more intuitive.
//               </p>
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* Mission Section */}
//       <section className="py-5 bg-light">
//         <Container>
//           <Row className="align-items-center">
//             <Col md={6} className="pe-md-5 order-md-1 order-2">
//               <h2 className="mb-4">Our Mission</h2>
//               <p>
//                 What remains unchanged is our commitment to preserving the soul of dining—while giving 
//                 you the tools to elevate it. Because behind every successful restaurant is not just 
//                 delicious food, but a well-orchestrated symphony of service, efficiency, and passion.
//               </p>
//               <blockquote className="blockquote mt-4">
//                 <p className="mb-0 fst-italic">
//                   "Eatos isn't just software. It's the silent partner in your restaurant's success story."
//                 </p>
//               </blockquote>
//             </Col>
//             <Col md={6} className="order-md-2 order-1 mb-4 mb-md-0">
//               <img 
//                 src={restaurantImage} 
//                 alt="Restaurant using Eatos system" 
//                 className="img-fluid rounded shadow"
//               />
//             </Col>
//           </Row>
//         </Container>
//       </section>

//       {/* Features Highlight */}
//       <section className="py-5">
//         <Container>
//           <h2 className="text-center mb-5">Why Restaurants Love Eatos</h2>
//           <Row>
//             <Col md={4} className="mb-4">
//               <Card className="h-100 border-0 shadow-sm">
//                 <Card.Body className="text-center p-4">
//                   <div className="about-icon mb-3">
//                     <i className="bi bi-speedometer2 fs-1 text-primary"></i>
//                   </div>
//                   <h5>Streamlined Operations</h5>
//                   <p>
//                     From seamless reservations to real-time order tracking, we've built a system that 
//                     works as hard as your staff does.
//                   </p>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={4} className="mb-4">
//               <Card className="h-100 border-0 shadow-sm">
//                 <Card.Body className="text-center p-4">
//                   <div className="about-icon mb-3">
//                     <i className="bi bi-people fs-1 text-primary"></i>
//                   </div>
//                   <h5>Built By Restaurant People</h5>
//                   <p>
//                     Designed by chefs and servers who understand the unique challenges of the 
//                     hospitality industry.
//                   </p>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col md={4} className="mb-4">
//               <Card className="h-100 border-0 shadow-sm">
//                 <Card.Body className="text-center p-4">
//                   <div className="about-icon mb-3">
//                     <i className="bi bi-heart fs-1 text-primary"></i>
//                   </div>
//                   <h5>Passion-Driven</h5>
//                   <p>
//                     We're committed to preserving the soul of dining while giving you the modern tools 
//                     to succeed.
//                   </p>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </section>
//     </div>
//   );
// };

// export default About;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import teamImage from '../../assets/pictures/team.jpg';
import restaurantImage from '../../assets/pictures/restaurant-tech.jpg';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 z-50 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
        aria-label="Go back"
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </button>

      {/* Hero Section */}
      <section 
        className="relative h-96 flex items-center justify-center bg-black text-white mb-12"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${teamImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Eatos: Where Flavor Meets Innovation
          </h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <img 
                src={teamImage} 
                alt="Eatos team working together" 
                className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-102"
              />
            </div>
            <div className="w-full md:w-1/2 mt-6 md:mt-0">
              <h2 className="text-3xl font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-amber-500">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Eatos was born from a simple belief: great restaurants deserve great technology.
              </p>
              <p className="text-gray-600 mb-4">
                Founded by a team of chefs, restaurateurs, and software engineers, our platform blends 
                the art of hospitality with the precision of modern management tools.
              </p>
              <p className="text-gray-600">
                Every feature in Eatos tells a story—of late-night brainstorming sessions, of feedback 
                from chefs and servers, of the relentless pursuit of making restaurant operations 
                smoother, smarter, and more intuitive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-amber-500">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-4">
                What remains unchanged is our commitment to preserving the soul of dining—while giving 
                you the tools to elevate it. Because behind every successful restaurant is not just 
                delicious food, but a well-orchestrated symphony of service, efficiency, and passion.
              </p>
              <blockquote className="border-l-4 border-amber-500 pl-4 my-6 bg-gray-100 rounded-r-lg py-3 italic text-gray-700">
                "Eatos isn't just software. It's the silent partner in your restaurant's success story."
              </blockquote>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <img 
                src={restaurantImage} 
                alt="Restaurant using Eatos system" 
                className="w-full h-auto rounded-lg shadow-xl transition-transform duration-300 hover:scale-102"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-1 after:bg-amber-500 pb-2">
            Why Restaurants Love Eatos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Streamlined Operations</h3>
                <p className="text-gray-600">
                  From seamless reservations to real-time order tracking, we've built a system that 
                  works as hard as your staff does.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Built By Restaurant People</h3>
                <p className="text-gray-600">
                  Designed by chefs and servers who understand the unique challenges of the 
                  hospitality industry.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Passion-Driven</h3>
                <p className="text-gray-600">
                  We're committed to preserving the soul of dining while giving you the modern tools 
                  to succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;