/* Editable site copy. Components read from here so text changes stay in one place. */

/* Router paths: section anchors live on the home page, Stories is its own page. */
export const navLinks = [
  { to: '/#welcome-home', label: 'Home' },
  { to: '/#what-happens-here', label: 'Create' },
  { to: '/stories', label: 'Stories' },
  { to: '/#around-the-table', label: 'Journal' },
  { to: '/#people', label: 'People' },
  { to: '/#come-over', label: 'Come Over', invitation: true }
];

export const services = [
  {
    title: 'Content & storytelling',
    image: '/assets/balcony-friends.webp',
    alt: 'Content and storytelling, generated homely visual direction',
    description: 'From the first idea to the final cut. We shape brand films, social content and stories that sound like you.',
    scope: 'Ideas & scripts / Video production / Editing & social cutdowns'
  },
  {
    title: 'Podcast production',
    image: '/assets/balcony-laughter.webp',
    alt: 'Podcast production, generated balcony conversation',
    description: 'Make room for a conversation worth hearing. We help shape your show, set up the recording, and bring each episode together.',
    scope: 'Show development / Audio & video recording / Episode edits'
  },
  {
    title: 'Studio setup',
    image: '/assets/home-corner.webp',
    alt: 'Studio setup, generated cozy home creative corner',
    description: 'A space that works for the way you create. We plan the room, lighting, sound and recording setup around your needs.',
    scope: 'Space planning / Equipment guidance / Lighting & sound setup'
  },
  {
    title: 'Creative direction',
    image: '/assets/balcony-coffee.webp',
    alt: 'Creative direction, generated coffee-table concept',
    description: 'A shared point of view, from beginning to end. We turn loose ideas into a clear visual direction for your next piece of content.',
    scope: 'Brand narratives / Visual concepts / Shoot direction'
  }
];

export const articles = [
  {
    title: 'Before you press record',
    image: '/assets/balcony-laughter.webp',
    alt: 'Podcasting concept photograph',
    paragraphs: [
      'The microphone is rarely the best place to start. Begin with one person: who is listening, and what should they take away from the conversation? A clear answer makes the format, questions and editing decisions easier.',
      'Choose a useful thread rather than a long list of questions. A good opening establishes why the topic matters. Follow-up questions invite specifics: a moment, a decision, a mistake, something the listener can picture. Leave enough space for an answer you did not plan.',
      'Before a full session, record a short test and listen on headphones. Check background noise, microphone distance and levels. Confirm your guest is comfortable with the recording and how it will be used. A calm start leaves more room for a real conversation.'
    ]
  },
  {
    title: 'A studio should work for you',
    image: '/assets/home-corner.webp',
    alt: 'Studio design concept photograph',
    paragraphs: [
      'Start with the content, not the shopping list. A two-person podcast, a product shoot and a standing presentation ask different things of a room. Map where people sit or stand, how cameras see them, and where equipment can live without getting in the way.',
      'Listen to the room before treating it. Hard surfaces can create reflections, while traffic, air conditioning and neighbouring rooms may introduce noise. Acoustic treatment and sound isolation solve different problems, so assess the source before buying equipment.',
      'Build a setup you can repeat. Mark camera positions, document light placement, label cables and keep the most-used controls within reach. A studio is doing its job when the equipment stops being the centre of attention.'
    ]
  },
  {
    title: 'Start with a conversation, not a brief',
    image: '/assets/balcony-coffee.webp',
    alt: 'Creative process concept photograph',
    paragraphs: [
      'A brief is useful. A conversation tells us what the brief could not. What is changing in your business? What do people misunderstand? Which part of your story feels important but never quite makes it into the content?',
      'Share the unfinished version. A reference you like, a voice note, an awkward first draft or a question can be enough to begin. The aim is not to arrive with all the answers. It is to discover the right question together.',
      'Then make the practical things clear: who the work is for, what it needs to say, where it will live, and the time and budget available. Trust and clarity belong at the same table. That is where collaboration becomes useful.'
    ]
  }
];

export const serviceOptions = [
  'Content & storytelling',
  'Podcast production',
  'Studio setup',
  'Creative direction',
  'Let’s figure it out'
];
