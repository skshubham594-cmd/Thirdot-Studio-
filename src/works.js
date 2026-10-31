/* Works showcase data for the Stories page (/stories).
   Each entry drives one row. Videos and posters live in public/assets/stories
   as web-ready copies of the originals in Google Drive: 720x1280 H.264, at most
   30 fps, with the index moved to the front (+faststart) so playback starts
   before the file has finished downloading. Encode new reels the same way:

     ffmpeg -i in.mp4 -vf "scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280" \
       -fpsmax 30 -c:v libx264 -preset slow -crf 27 -maxrate 1800k -bufsize 3600k \
       -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart out.mp4

   `aspect` is the video's native ratio as 'width/height'; leave it out to read
   the ratio from the video's metadata instead. Portrait cards get a varied
   shape from Works.jsx; set `shape: '3/4'` (etc.) on an entry to pick one. */
const reel = (slug) => ({ video: `/assets/stories/${slug}.mp4`, poster: `/assets/stories/${slug}.jpg`, aspect: '9/16' });

const landscape = (slug) => ({ ...reel(slug), aspect: '16/9' });

const items = [
  { client: 'ADANI ACC', title: 'PROUD SPONSOR OF GUJARAT GIANTS', cta: 'WATCH THE REEL', ...reel('journey'), slug: 'adani-acc-gujarat-giants' },
  { client: 'CHK', title: 'AT HOME', cta: 'WATCH THE FILM', ...reel('c0022'), slug: 'chk-at-home' },
  { client: 'HOUSE OF EVORAH', title: 'THE MYSTERY OF THE DESERT', cta: 'WATCH THE REEL', ...reel('house-of-evorah'), slug: 'house-of-evorah' },
  { client: 'THIRDOT STUDIO', title: 'WAKE UP', cta: 'WATCH THE FILM', ...landscape('ready-cut'), slug: 'wake-up' },
  { client: 'MULID STRONG', title: 'PRO KABADDI', cta: 'WATCH THE REEL', ...reel('kabaddi'), slug: 'mulid-strong-kabaddi' },
  { client: 'FASHION FILM', title: 'SUPER BOLD', cta: 'WATCH THE FILM', ...reel('super-bold'), slug: 'super-bold' },
  { client: 'FASHION FILM', title: 'BOOK NOW', cta: 'WATCH THE FILM', ...reel('book-now'), slug: 'book-now' },
  { client: 'BRAND FILM', title: 'IN THE COAT', cta: 'WATCH THE FILM', ...reel('brand-reel'), slug: 'brand-reel' },
  { client: 'THIRDOT CREATIVE', title: 'WHY PIYUSH PANDEY’S ADS HIT DIFFERENT', cta: 'WATCH THE REEL', ...reel('piyush-pandey'), slug: 'piyush-pandey' },
  { client: 'BUDGET VS SEPHORA', title: 'PART 1: THE BLUSH TEST', cta: 'WATCH THE REEL', ...reel('blush-part-1'), slug: 'blush-part-1' },
  { client: 'BEHIND THE SCENES', title: 'TOHH UHHH YEAH', cta: 'WATCH THE SESSION', ...reel('bts'), slug: 'bts' },
  { client: 'FASHION FILM', title: 'PRESSED', cta: 'WATCH THE FILM', ...reel('reel-02'), slug: 'reel-02' },
  { client: 'THIRDOT CREATIVE', title: '98 MILLION VIEWS IN 48 HOURS', cta: 'WATCH THE REEL', ...reel('tesla-ai'), slug: 'tesla-ai' },
  { client: 'BUDGET VS SEPHORA', title: 'PART 2: DUSKY SKIN TEST', cta: 'WATCH THE REEL', ...reel('blush-part-2'), slug: 'blush-part-2' },
  { client: 'PRODUCT FILM', title: 'CARRY IT WELL', cta: 'WATCH THE FILM', ...reel('reel-05'), slug: 'reel-05' },
  { client: 'THIRDOT CREATIVE', title: 'THE PESO MODEL', cta: 'WATCH THE REEL', ...reel('peso-model'), slug: 'peso-model' },
  { client: 'BUDGET VS SEPHORA', title: 'PART 3: PRICE REVEAL', cta: 'WATCH THE REEL', ...reel('blush-part-3'), slug: 'blush-part-3' },
  { client: 'ETHNIC WEAR', title: 'GREEN ROOM', cta: 'WATCH THE FILM', ...reel('reel'), slug: 'green-room' },
  { client: 'THIRDOT CREATIVE', title: 'SOUND OR VISUAL? WHAT SELLS MORE', cta: 'WATCH THE REEL', ...reel('sound-vs-visual'), slug: 'sound-vs-visual' },
  { client: 'GIFT GUIDE', title: 'WHAT TO GIFT A MAN', cta: 'WATCH THE REEL', ...reel('reel-01'), slug: 'gift-guide' },
  { client: 'PRODUCT FILM', title: 'THE EVENING BAG', cta: 'WATCH THE FILM', ...reel('reel-07'), slug: 'evening-bag' },
  { client: 'THIRDOT CREATIVE', title: '90S KIDS WILL REMEMBER THESE SOUNDS', cta: 'WATCH THE REEL', ...reel('90s-sounds'), slug: '90s-sounds' },
  { client: 'NUVANA LUXURY', title: 'LET’S BE HONEST', cta: 'WATCH THE REEL', ...reel('nuvana-luxury'), slug: 'nuvana-luxury' },
  { client: 'RHEA SINGHA', title: 'LOGO REVEAL', cta: 'WATCH THE FILM', ...reel('rhea-singha'), slug: 'rhea-singha' },
  { client: 'ON THE MOVE', title: 'FIRST CUT', cta: 'WATCH THE FILM', ...reel('first-cut'), slug: 'first-cut' },
  { client: 'EDUCATION', title: '195 STUDENTS', cta: 'WATCH THE REEL', ...reel('video-34591'), slug: '195-students' }
];

export const works = items.map((item, i) => ({ index: String(i + 1).padStart(2, '0'), ...item }));
