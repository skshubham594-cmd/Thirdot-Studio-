/* Editable site copy. Components read from here so text changes stay in one place. */

export const site = {
  name: 'THIRDOT',
  email: 'thirdotcreative@gmail.com',
  intro: { video: '/assets/hero/ep01-intro.mp4', poster: '/assets/hero/ep01-intro.jpg', title: 'EP01 Intro', client: 'THIRDOT CREATIVE', aspect: '16/9' }
};

/* Header and footer navigation. Section anchors live on the home page. */
export const navLinks = [
  { to: '/work', label: 'Work' },
  { to: '/studio', label: 'Studio' },
  { to: '/#services', label: 'Services' },
  { to: '/#process', label: 'Process' }
];
export const contactLink = { to: '/contact', label: 'Contact' };

export const hero = {
  disciplines: ['Content & storytelling', 'Podcast production', 'Studio setup'],
  statement: 'Building stories, shows and spaces that help brands be heard.'
};

/* Reels from src/works.js shown on the home page, by slug. */
export const featuredWork = ['brand-reel', 'piyush-pandey', 'blush-part-1', 'reel-02'];

export const about = {
  statement: 'A creative studio where brands and creators make content, podcasts and spaces that feel like home.',
  image: { src: '/assets/stories/reel-07.jpg', alt: 'A model holding an evening bag, from a THIRDOT product film' },
  columns: [
    'THIRDOT is a content studio for brands and creators. We shape brand films, social reels and podcasts from the first idea to the final cut, and we build the rooms they are recorded in.',
    'Every project starts as a conversation. We listen for what makes your story yours, then turn it into work that people stop for, watch to the end and remember.'
  ]
};

export const services = [
  {
    title: 'Content & storytelling',
    description: 'From the first idea to the final cut. We shape brand films, social content and stories that sound like you.',
    scope: ['Ideas & scripts', 'Video production', 'Editing & social cutdowns']
  },
  {
    title: 'Podcast production',
    description: 'Make room for a conversation worth hearing. We shape your show, set up the recording and bring each episode together.',
    scope: ['Show development', 'Audio & video recording', 'Episode edits']
  },
  {
    title: 'Studio setup',
    description: 'A space that works for the way you create. We plan the room, lighting, sound and recording setup around your needs.',
    scope: ['Space planning', 'Equipment guidance', 'Lighting & sound']
  },
  {
    title: 'Creative direction',
    description: 'A shared point of view from beginning to end. We turn loose ideas into a clear visual direction for your next piece of content.',
    scope: ['Brand narratives', 'Visual concepts', 'Shoot direction']
  }
];

/* Brands we have made work for. Logos are cropped on plain white in
   public/assets/brands so they can be shown in one tone and turn to full
   colour on hover. */
export const brands = [
  { name: 'BMW', logo: '/assets/brands/bmw.png' },
  { name: 'Audi', logo: '/assets/brands/audi.png' },
  { name: 'Adani', logo: '/assets/brands/adani.png' },
  { name: 'Yamaha', logo: '/assets/brands/yamaha.png' },
  { name: 'Insta360', logo: '/assets/brands/insta360.png' },
  { name: 'Berkowits Hair & Skin Clinic', logo: '/assets/brands/berkowits.png' },
  { name: 'Rhea Singha', logo: '/assets/brands/rhea-singha.png' },
  { name: 'Emily Loran', logo: '/assets/brands/emily-loran.png' }
];

export const process = [
  {
    title: 'Discovery',
    text: 'A conversation before a brief. Who the work is for, what it needs to say and where it will live.',
    image: '/assets/stories/brand-reel.jpg'
  },
  {
    title: 'Direction',
    text: 'One clear point of view: the story, the look and the format, agreed before anyone presses record.',
    image: '/assets/stories/reel-05.jpg'
  },
  {
    title: 'Production',
    text: 'Shoots, recordings and sessions run with care, in our studio or yours.',
    image: '/assets/stories/reel.jpg'
  },
  {
    title: 'Delivery',
    text: 'Edits, cutdowns and episodes shaped for every platform they will live on.',
    image: '/assets/stories/reel-02.jpg'
  }
];

export const studio = {
  statement: 'Rooted in conversation, the studio blends honest storytelling with a sharp eye for craft.',
  film: {
    video: '/assets/studio/studio-film.mp4',
    poster: '/assets/studio/studio-film.jpg',
    alt: 'THIRDOT studio film'
  },
  columns: [
    'At its core, THIRDOT is driven by curiosity: asking better questions, finding the story inside a brand and building work that resonates with the people it is made for.',
    'Whether it is a single reel, a full podcast season or a studio built from scratch, we value clarity, originality and real connection in everything we create.'
  ]
};

/* Long-form notes on the Studio page. */
export const articles = [
  {
    title: 'Before you press record',
    paragraphs: [
      'The microphone is rarely the best place to start. Begin with one person: who is listening, and what should they take away from the conversation? A clear answer makes the format, questions and editing decisions easier.',
      'Choose a useful thread rather than a long list of questions. A good opening establishes why the topic matters. Follow-up questions invite specifics: a moment, a decision, a mistake, something the listener can picture. Leave enough space for an answer you did not plan.',
      'Before a full session, record a short test and listen on headphones. Check background noise, microphone distance and levels. Confirm your guest is comfortable with the recording and how it will be used. A calm start leaves more room for a real conversation.'
    ]
  },
  {
    title: 'A studio should work for you',
    paragraphs: [
      'Start with the content, not the shopping list. A two-person podcast, a product shoot and a standing presentation ask different things of a room. Map where people sit or stand, how cameras see them, and where equipment can live without getting in the way.',
      'Listen to the room before treating it. Hard surfaces can create reflections, while traffic, air conditioning and neighbouring rooms may introduce noise. Acoustic treatment and sound isolation solve different problems, so assess the source before buying equipment.',
      'Build a setup you can repeat. Mark camera positions, document light placement, label cables and keep the most-used controls within reach. A studio is doing its job when the equipment stops being the centre of attention.'
    ]
  },
  {
    title: 'Start with a conversation, not a brief',
    paragraphs: [
      'A brief is useful. A conversation tells us what the brief could not. What is changing in your business? What do people misunderstand? Which part of your story feels important but never quite makes it into the content?',
      'Share the unfinished version. A reference you like, a voice note, an awkward first draft or a question can be enough to begin. The aim is not to arrive with all the answers. It is to discover the right question together.',
      'Then make the practical things clear: who the work is for, what it needs to say, where it will live, and the time and budget available. Trust and clarity belong at the same table. That is where collaboration becomes useful.'
    ]
  }
];

export const serviceOptions = [...services.map((service) => service.title), 'Let’s figure it out'];

export const cta = {
  title: 'Let’s make something worth watching',
  image: '/assets/studio/sofa-wide.jpg'
};

export const socialLinks = [
  { name: 'Instagram', handle: '@thirdotcreative', href: 'https://www.instagram.com/thirdotcreative/' },
  { name: 'YouTube', handle: '@ThirdotCreative', href: 'https://www.youtube.com/@ThirdotCreative' }
];
