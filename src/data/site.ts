// Shared facts used for structured data (schema.org JSON-LD) and the RSS feed.
// Keep these in sync with the visible page content; search engines and AI
// assistants read these to confirm what the pages say.

export const SITE_URL = 'https://erindohan.com';

export const AUTHOR = {
  '@type': 'Person',
  '@id': `${SITE_URL}/about#erin-dohan`,
  name: 'Erin Dohan',
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/images/author-photo.jpg`,
  jobTitle: 'Author',
  description:
    "Erin Dohan is the author of I Think I'm Ready to Talk, a memoir about surviving a ruptured brain aneurysm at 27 and the five years of medical crises that followed. She lives in the western suburbs of Chicago.",
  email: 'Erin@erindohan.com',
  sameAs: [
    'https://www.instagram.com/erindohanthings/',
    'https://www.tiktok.com/@erindohanthings',
  ],
} as const;

export const BOOK = {
  '@type': 'Book',
  '@id': `${SITE_URL}/the-book#book`,
  name: "I Think I'm Ready to Talk",
  alternateName:
    "I Think I'm Ready to Talk: The Messy, Honest Story of Coming Back to Myself After a Ruptured Brain Aneurysm",
  author: { '@id': AUTHOR['@id'] },
  isbn: '9798897471867',
  bookFormat: 'https://schema.org/Paperback',
  datePublished: '2026-09-09',
  publisher: { '@type': 'Organization', name: 'Koehler Books' },
  inLanguage: 'en',
  genre: 'Memoir',
  image: `${SITE_URL}/images/Cover1_V2.jpeg`,
  url: `${SITE_URL}/the-book`,
  description:
    "At age 27, on May 29, 2019, Erin Dohan survived a ruptured brain aneurysm. The five years that followed brought miscarriage, emergency abortion, infertility, complicated pregnancy, postpartum complications, ovarian torsion, and ultimately the removal of both ovaries, alongside a medical system that consistently dismissed, minimized, or failed to believe her. I Think I'm Ready to Talk is a raw and unfiltered exploration of recovery, identity, and what it means to rediscover yourself when your body has been the source of the trauma.",
} as const;

export const RETAILERS = [
  { name: 'Amazon', url: 'https://www.amazon.com/I-Think-Im-Ready-Talk/dp/B0H475T4ZY/' },
  {
    name: 'Barnes & Noble',
    url: 'https://www.barnesandnoble.com/w/i-think-im-ready-to-talk-erin-dohan/1150333907?ean=9798897471867',
  },
  { name: 'Bookshop.org', url: 'https://bookshop.org/p/books/i-think-i-m-ready-to-talk/3f77e5f423875e46' },
  { name: 'Books-A-Million', url: 'https://www.booksamillion.com/p/Think-Im-Ready-Talk/Erin-Dohan/9798897471867' },
  {
    name: 'Walmart',
    url: 'https://www.walmart.com/ip/I-Think-I-m-Ready-to-Talk-Paperback-9798897471867/20282009855',
  },
];
