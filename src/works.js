/* Works showcase data for the Stories page (/stories).
   Each entry drives one row. `video` and `poster` are plain URLs at runtime, so
   the sample imports below can be swapped for Drive (or any hosted) links later,
   e.g. video: 'https://.../film.mp4', poster: 'https://.../film.jpg'.
   `aspect` is the video's native ratio as 'width/height'; portrait videos
   (e.g. 1080x1920 = '9/16') get a portrait card. Leave it out to read the ratio
   from the video's metadata instead. */
import brandReelVideo from './videos/Brand Reel .mp4';
import btsVideo from './videos/BTS.mp4';
import teaserVideo from './videos/Teaser .mp4';
import brandReelPoster from './videos/posters/brand-reel.jpg';
import btsPoster from './videos/posters/bts.jpg';
import teaserPoster from './videos/posters/teaser.jpg';

export const works = [
  { index: '01', client: 'BALCONY SESSIONS', title: 'EPISODE ONE', cta: 'WATCH THE SESSION', slug: 'episode-one', video: btsVideo, poster: btsPoster, aspect: '9/16' },
  { index: '02', client: 'HOME STUDIO', title: 'A ROOM THAT WORKS', cta: 'WATCH THE FILM', slug: 'a-room-that-works', video: brandReelVideo, poster: brandReelPoster, aspect: '9/16' },
  { index: '03', client: 'COFFEE TABLE', title: 'FIRST DRAFT', cta: 'RUN THE PITCH', slug: 'first-draft', video: teaserVideo, poster: teaserPoster, aspect: '16/9' },
  { index: '04', client: 'AROUND THE TABLE', title: 'THE INTERVIEW', cta: 'WATCH THE SESSION', slug: 'the-interview', video: btsVideo, poster: btsPoster, aspect: '9/16' },
  { index: '05', client: 'BRAND FILM', title: 'STILL LIFE', cta: 'WATCH THE FILM', slug: 'still-life', video: brandReelVideo, poster: brandReelPoster, aspect: '9/16' },
  { index: '06', client: 'LATE LIGHT', title: 'SOUND CHECK', cta: 'PLAY THE CUT', slug: 'sound-check', video: teaserVideo, poster: teaserPoster, aspect: '16/9' }
];
