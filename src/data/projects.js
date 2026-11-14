// Every live site, with the category Kashif gave it. `domain` doubles as the screenshot name in /public/screens.
// Sites without a screenshot yet fall back to generated cover art.
const site = (name, domain, category, pattern = 1) => ({ name, domain, url: `https://${domain}`, category, pattern });

export const sites = [
  // E-commerce
  site('Xclusive Watches', 'xclusivewatches.in', 'E-commerce', 0),
  site('La Gracy', 'lagracy.com', 'E-commerce', 0),
  site('Kalp Gaming Computers', 'kalpgamingcomputers.com', 'E-commerce', 0),
  site('IK Electricals', 'ikelectrical.com', 'E-commerce', 0),
  site('Whispers of Istanbul', 'whispersofistanbul.com', 'E-commerce', 0),
  site('A1 Kitchen Mart', 'a1kitchenmart.com', 'E-commerce', 0),
  site('The Funkydelic Store', 'thefunkydelicstore.com', 'E-commerce', 0),
  site('The Funkydelic Store (India)', 'thefunkydelicstore.in', 'E-commerce', 0),
  site('Love Creations', 'thelovecreations.com', 'E-commerce', 0),
  site('Dhaani Foods', 'dhaanifoods.com', 'E-commerce', 0),
  site('Buy Auto Part', 'buyautopart.in', 'E-commerce', 0),
  // Business websites
  site('Easypower Solutions', 'easypowersolution.in', 'Business website'),
  site('Golden Axis Electrical', 'goldenaxiselectrical.com', 'Business website'),
  site('Smart Ingredients', 'smartingredients.co.in', 'Business website'),
  site('Rewaste Management', 'rewastemanagement.in', 'Business website'),
  site('Magnum One', 'magnumone.net', 'Business website'),
  site('Neura Smart Living', 'neurasmartliving.com', 'Business website'),
  site('Vista Pools', 'vistapools.in', 'Business website'),
  site('Device Care Station', 'devicecarestation.com', 'Business website'),
  site('Macfix Station', 'macfixstation.com', 'Business website'),
  site('Kwickseal', 'kwickseal.com', 'Business website'),
  site('Homeville Group', 'homevillegroup.com', 'Business website'),
  site('HomeNXT', 'homenxt.com', 'Business website'),
  site('Singularity Credit', 'singularitycredit.com', 'Business website'),
  // Business profiles and portfolios
  site('Clicksy Studio', 'clicksystudio.com', 'Business profile', 2),
  site('TM Dalal', 'tmdalal.com', 'Business profile', 2),
  site('Avya Legal Advisors', 'avyalegaladvisors.com', 'Business profile', 2),
  site('Rakshita Anand', 'rakshitaanand.com', 'Business profile', 2),
  site('Vinod Waterproofing', 'vinodwaterproofing.com', 'Business profile', 2),
  site('Your Waterproofing Store', 'yourwaterproofingstore.com', 'Business profile', 2),
  site('Psyche Essence', 'psyche-essence.com', 'Business profile', 2),
  site('The Rolling Radish', 'therollingradish.in', 'Business profile', 2),
  // Healthcare
  site('Toothastu', 'toothastu.com', 'Healthcare', 2),
  // Agencies and creative studios
  site('Katha Kahaani', 'kathakahaani.in', 'Agency & creative', 3),
  site('Project 90s', 'project90s.media', 'Agency & creative', 3),
  site('WebSpark', 'webspark.co.in', 'Agency & creative', 3),
  site('Ahmed Sohail', 'ahmedsohail.com', 'Agency & creative', 3),
];

export const siteCategories = ['All', ...new Set(sites.map((s) => s.category))];
const link = (s) => ({ label: s.domain, href: s.url });
const inCats = (...cats) => sites.filter((s) => cats.includes(s.category));

// Case studies. Facts here come from the resume; the live-site lists come from `sites` above.
export const projects = [
  {
    slug: 'ecommerce-stores',
    title: '11 e-commerce stores',
    year: '2025–now',
    type: 'E-commerce',
    client: 'Freelance, India / UAE / Canada',
    summary: 'Shopify and WooCommerce stores for retail, food, fashion, electronics and auto-parts brands.',
    problem: 'Small brands needed stores that look custom, are easy to manage and let customers order the way they already do.',
    solution: 'Set up collections, search, cart and checkout, wishlist and compare, plus WhatsApp ordering, on Shopify (Liquid theme customization) and WooCommerce.',
    result: 'Eleven live stores, built directly with the business owners.',
    tags: ['Shopify (Liquid)', 'WooCommerce', 'WordPress', 'WhatsApp & lead forms', 'Responsive design'],
    links: inCats('E-commerce').map(link),
    cover: 'lagracy.com',
    pattern: 0,
  },
  {
    slug: 'business-websites',
    title: '13 business websites',
    year: '2025–now',
    type: 'Business website',
    client: 'Manufacturers, suppliers, service and tech companies',
    summary: 'Company websites and catalogs, from WordPress and Elementor builds to Next.js catalogs with request-a-quote flows.',
    problem: 'Service and industrial businesses needed a credible site quickly, with clear ways for visitors to call, book or ask for a quote.',
    solution: 'Responsive WordPress and Elementor sites with lead-capture and quote forms, click-to-call and WhatsApp, plus Next.js (React) product catalogs for suppliers who sell through quotes rather than carts.',
    result: 'Thirteen live company sites across electrical, waste management, real estate, finance, repair and manufacturing.',
    tags: ['WordPress', 'Elementor', 'Next.js', 'React.js', 'WhatsApp & lead forms', 'On-page SEO', 'Responsive design'],
    links: inCats('Business website').map(link),
    cover: 'easypowersolution.in',
    pattern: 1,
  },
  {
    slug: 'business-profiles',
    title: 'Business profiles & portfolios',
    year: '2025–now',
    type: 'Business profile',
    client: 'Clinics, law and CA firms, consultants, studios',
    summary: 'Profile and portfolio sites that present a practice or a person clearly and make it easy to get in touch.',
    problem: 'Professionals and small practices needed an online presence that builds trust: who they are, what they do, and how to book them.',
    solution: 'Clean WordPress and Elementor profile sites with service pages, portfolio galleries, booking calls-to-action, and lead and WhatsApp forms.',
    result: 'Nine live profile and portfolio sites for dental, legal, finance, waterproofing, nutrition and creative practices.',
    tags: ['WordPress', 'Elementor', 'WhatsApp & lead forms', 'On-page SEO', 'Responsive design'],
    links: inCats('Business profile', 'Healthcare').map(link),
    cover: 'toothastu.com',
    pattern: 2,
  },
  {
    slug: 'agency-creative',
    title: 'Agency & creative sites',
    year: '2025–now',
    type: 'Agency & creative',
    client: 'Digital agencies and creative studios',
    summary: 'Websites for digital marketing agencies and creative studios, built to show the work first.',
    problem: 'Agencies and studios sell on taste, so the site has to look the part and load fast while keeping the portfolio front and centre.',
    solution: 'Designed and built portfolio-led sites with case-study sections, service pages and enquiry forms.',
    result: 'Four live agency and studio sites.',
    tags: ['WordPress', 'Elementor', 'Portfolio galleries', 'Responsive design'],
    links: inCats('Agency & creative').map(link),
    cover: 'kathakahaani.in',
    pattern: 3,
  },
  {
    slug: 'graphic-design',
    title: 'Design & creative',
    year: 'Ongoing',
    type: 'Design',
    client: 'Freelance and agency clients',
    summary: 'Brochures, PDFs, logos, visiting cards, social media posts and AI videos, designed alongside the front-end work.',
    problem: 'Small businesses usually need more than a website: print material, a logo, social posts and short videos that all look like the same brand.',
    solution: 'Designed brand and marketing material end to end: logos and visiting cards, brochures and PDF decks, social media post sets, and short AI-generated videos for promotion. Keeping design and front-end in one pair of hands means the website and the collateral match.',
    result: 'One consistent look from the first logo to the live site, delivered by a single person.',
    tags: ['Logo design', 'Brochures', 'PDF', 'Visiting cards', 'Social media', 'AI video'],
    links: [],
    pattern: 3,
  },
];

export const allTypes = ['All', ...new Set(projects.map((p) => p.type))];
