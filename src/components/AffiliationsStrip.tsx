import React from 'react';

const AffiliationsStrip: React.FC = () => {
  const affiliations = [
    {
      name: 'Companies and Intellectual Property Commission',
      logo: 'https://www.cipc.co.za/wp-content/uploads/2020/06/cipc-logo.png',
      subtitle: 'a member of the dtic group'
    },
    {
      name: 'SARS',
      logo: 'https://www.sars.gov.za/wp-content/uploads/Ops/Images/sars-logo.png',
      subtitle: 'South African Revenue Service'
    },
    {
      name: 'SAICA',
      logo: 'https://www.saica.co.za/portals/0/images/saica_logo.png',
      subtitle: 'The South African Institute of Chartered Accountants'
    },
    {
      name: 'dtic',
      logo: 'https://www.thedtic.gov.za/wp-content/uploads/dtic_logo.png',
      subtitle: 'Department of Trade, Industry and Competition'
    }
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load logo: ${e.currentTarget.src}`);
    e.currentTarget.style.display = 'none'; // Hide the broken image icon
  };

  return (
    <div className="bg-white border-t border-b border-gray-200 py-6 overflow-hidden">
      <div className="relative">
        <div className="flex animate-scroll whitespace-nowrap">
          {/* Render each set of affiliations twice for a seamless loop */}
          {[...affiliations, ...affiliations].map((affiliation, index) => (
            <div key={`${affiliation.name}-${index}`} className="flex items-center mx-12 min-w-max">
              <div className="flex items-center space-x-4">
                <img 
                  src={affiliation.logo} 
                  alt={affiliation.name}
                  className="h-12 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  onError={handleImageError}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AffiliationsStrip;