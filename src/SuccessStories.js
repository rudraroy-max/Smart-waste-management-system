import React from 'react';
import './SuccessStories.css';

const SuccessStories = () => {
  const stories = [
    {
      title: 'Helping Hands in Hyderabad',
      description:
        'Thanks to our volunteers, we were able to collect and distribute over 500 food packets to the needy in Hyderabad during the summer heatwave.',
      image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg',
    },
    {
      title: 'A Wedding With a Purpose',
      description:
        'Leftover food from a wedding was donated and fed 200+ homeless individuals in Chennai. A big thank you to the couple and caterers!',
      image: 'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f',
    },
    {
      title: 'College Drive Success',
      description:
        'Students from a local college initiated a donation drive and provided nutritious meals to over 300 people in slum areas.',
      image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg', // Replaced problematic Pixabay image
    },
  ];

  // Fallback image for any loading errors
  const fallbackImage = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg';

  return (
    <div className="success-stories-container">
      <h2>Success Stories</h2>
      <div className="stories-grid">
        {stories.map((story, index) => (
          <div key={index} className="story-card">
            <img 
              src={story.image} 
              alt={story.title} 
              className="story-image" 
              onError={(e) => (e.target.src = fallbackImage)} 
            />
            <h3>{story.title}</h3>
            <p>{story.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;