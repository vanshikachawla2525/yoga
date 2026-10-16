/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Stress Buster Station — Master Business & Demo Content Store
 * All business information, services, pricing, locations, and copy are centralized here.
 * Notice: All pricing, operational hours, outlet availability, and testimonials are DEMO placeholders.
 * Owner must verify and replace before official live rollout.
 */

import heroArch1Img from "../assets/images/hero_candle_stones_1792159387213.jpg";
import heroArch2Img from "../assets/images/hero_massage_hands_1792159387306.jpg";
import heroArch3Img from "../assets/images/hero_singing_bowl_1792159387184.jpg";
import ritualLoungeImg from "../assets/images/ritual_steam_lounge_1792159387278.jpg";

// Single source of truth for the provisional booking & contact WhatsApp number
export const PROVISIONAL_WHATSAPP_NUMBER = "917042938777"; // DEMO – owner to verify

// Master image registry (curated local assets + authentic wellness imagery fallbacks)
export const IMAGES = {
  heroArch1: heroArch1Img,
  heroArch2: heroArch2Img,
  heroArch3: heroArch3Img,
  ritualLounge: ritualLoungeImg,
  
  // High quality Unsplash wellness imagery with fallback safety
  candleStones: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
  massageHands: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1000&q=80",
  singingBowl: "https://images.unsplash.com/photo-1512290900672-1f55b9e5988a?auto=format&fit=crop&w=1000&q=80",
  steamAroma: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80",
  teaLounge: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1000&q=80",
  herbalHerbs: "https://images.unsplash.com/photo-1608248597359-0f0f3531b4fc?auto=format&fit=crop&w=1000&q=80",
  soundVibro: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1000&q=80",
  skinCare: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
  zenStones: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1000&q=80",
  corporateWellness: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
  corporateChair: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
  workspaceCalm: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80"
};

export interface ServiceItem {
  id: string;
  category: "reset" | "sound" | "massage" | "salon" | "journeys";
  name: string;
  shortDescription: string;
  durationMinutes: number; // DEMO – owner to verify
  demoPriceINR: number; // DEMO – owner to verify
  image: string;
  availableOutlets: string[]; // Outlet IDs
  suitableFor: string;
  experienceNotes: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "chair-reset-5",
    category: "reset",
    name: "5-Minute Ergonomic Chair Reset",
    shortDescription: "Targeted sub-occipital and shoulder decompression in a calibrated zero-gravity massage chair.",
    durationMinutes: 5, // DEMO – owner to verify
    demoPriceINR: 299, // DEMO – owner to verify
    image: IMAGES.heroArch2,
    availableOutlets: ["capri", "dlf-city", "hilton-63", "harmony", "dlf-club4"],
    suitableFor: "Quick break between meetings",
    experienceNotes: "No garment change required. Focuses on upper trapezius and optic nerve relief."
  },
  {
    id: "desk-reset-15",
    category: "reset",
    name: "15-Minute Executive Desk Reset",
    shortDescription: "Neck, temple, and scalp acupressure combined with gentle rhythmic breath guidance.",
    durationMinutes: 15, // DEMO – owner to verify
    demoPriceINR: 699, // DEMO – owner to verify
    image: IMAGES.heroArch1,
    availableOutlets: ["capri", "dlf-city", "hilton-63", "harmony", "dlf-club4"],
    suitableFor: "Digital eye strain & postural tension",
    experienceNotes: "Includes warmed herbal neck wrap and peppermint inhalation."
  },
  {
    id: "sound-bath-30",
    category: "sound",
    name: "Himalayan Sound Bath Immersion",
    shortDescription: "Full-body acoustic resonance with handcrafted antique singing bowls and gong overtones.",
    durationMinutes: 30, // DEMO – owner to verify
    demoPriceINR: 1499, // DEMO – owner to verify
    image: IMAGES.heroArch3,
    availableOutlets: ["capri", "hilton-63", "harmony"],
    suitableFor: "Mental chatter & sensory overload",
    experienceNotes: "Lie down on weighted linen futons in an acoustically damped sanctuary."
  },
  {
    id: "vibroacoustic-25",
    category: "sound",
    name: "Vibroacoustic Sound Lounge",
    shortDescription: "Low-frequency tactile soundwaves channeled directly through a patented resonance mat.",
    durationMinutes: 25, // DEMO – owner to verify
    demoPriceINR: 1299, // DEMO – owner to verify
    image: IMAGES.soundVibro,
    availableOutlets: ["capri", "dlf-city", "harmony"],
    suitableFor: "Nervous system down-regulation",
    experienceNotes: "Frequencies synchronized between 40Hz and 68Hz to induce alpha-wave brain states."
  },
  {
    id: "tibetan-bowl-45",
    category: "sound",
    name: "Tibetan On-Body Bowl Technique",
    shortDescription: "Singing bowls placed directly on thoracic and sacral points for micro-vibrational release.",
    durationMinutes: 45, // DEMO – owner to verify
    demoPriceINR: 1999, // DEMO – owner to verify
    image: IMAGES.singingBowl,
    availableOutlets: ["capri", "harmony"],
    suitableFor: "Deep chronic neuromuscular tension",
    experienceNotes: "Combined with grounding warm sandalwood foot compress."
  },
  {
    id: "therapeutic-massage-60",
    category: "massage",
    name: "Deep Therapeutic Bodywork",
    shortDescription: "Slow rhythmic myofascial unwinding with cold-pressed warm sesame and cedarwood oils.",
    durationMinutes: 60, // DEMO – owner to verify
    demoPriceINR: 2499, // DEMO – owner to verify
    image: IMAGES.massageHands,
    availableOutlets: ["capri", "dlf-city", "hilton-63", "dlf-club4"],
    suitableFor: "Physical exhaustion & postural misalignment",
    experienceNotes: "Custom pressure intensity calibrated to your muscle resistance."
  },
  {
    id: "ayurveda-abhyanga-60",
    category: "massage",
    name: "Ayurveda-Inspired Abhyanga",
    shortDescription: "Harmonizing long stroke synchronized massage using warm dosha-specific botanical medicated oils.",
    durationMinutes: 60, // DEMO – owner to verify
    demoPriceINR: 2799, // DEMO – owner to verify
    image: IMAGES.herbalHerbs,
    availableOutlets: ["capri", "hilton-63", "harmony"],
    suitableFor: "Fatigue, dry skin & lymphatic circulation",
    experienceNotes: "Concludes with gentle herbal steam inhalation."
  },
  {
    id: "head-shoulder-30",
    category: "massage",
    name: "Head, Scapula & Shoulder Release",
    shortDescription: "Concentrated trigger-point therapy across the occipital ridge, scapula, and upper spinal column.",
    durationMinutes: 30, // DEMO – owner to verify
    demoPriceINR: 1199, // DEMO – owner to verify
    image: IMAGES.heroArch2,
    availableOutlets: ["capri", "dlf-city", "hilton-63", "harmony", "dlf-club4"],
    suitableFor: "Tension headaches & desk hunch",
    experienceNotes: "Includes cooling camphor and vetiver finishing mist."
  },
  {
    id: "foot-reflex-40",
    category: "massage",
    name: "Foot Reflexology & Thermal Soak",
    shortDescription: "Epsom salt soak with pine needle oil followed by pressure point zone mapping on feet and calves.",
    durationMinutes: 40, // DEMO – owner to verify
    demoPriceINR: 1399, // DEMO – owner to verify
    image: IMAGES.zenStones,
    availableOutlets: ["capri", "dlf-city", "hilton-63", "dlf-club4"],
    suitableFor: "Prolonged standing or travel fatigue",
    experienceNotes: "Stimulates systemic vitality and relieves heavy legs."
  },
  {
    id: "express-facial-35",
    category: "salon",
    name: "Express Botanical Reset Facial",
    shortDescription: "Antioxidant thermal compress, lymphatic jade-roller contouring, and clean rosehip hydration.",
    durationMinutes: 35, // DEMO – owner to verify
    demoPriceINR: 1699, // DEMO – owner to verify
    image: IMAGES.skinCare,
    availableOutlets: ["capri", "dlf-city", "dlf-club4"],
    suitableFor: "Urban pollution dullness & facial tension",
    experienceNotes: "Non-invasive, clean botanical formulation suitable for sensitive skin."
  },
  {
    id: "hair-scalp-spa-45",
    category: "salon",
    name: "Restorative Hair & Scalp Spa",
    shortDescription: "Nutritive bhringraj steam infusion, deep follicle conditioning, and rhythmic craniosacral scalp strokes.",
    durationMinutes: 45, // DEMO – owner to verify
    demoPriceINR: 1899, // DEMO – owner to verify
    image: IMAGES.steamAroma,
    availableOutlets: ["capri", "dlf-city", "dlf-club4"],
    suitableFor: "Scalp tightness and hair vitality",
    experienceNotes: "Includes a warm tea-tree rinse and blow-dry."
  },
  {
    id: "pedicure-manicure-50",
    category: "salon",
    name: "Organic Manicure & Pedicure Ritual",
    shortDescription: "Hydrating paraffin soak, cuticle care, natural bamboo exfoliation, and gentle hand-arm massage.",
    durationMinutes: 50, // DEMO – owner to verify
    demoPriceINR: 1799, // DEMO – owner to verify
    image: IMAGES.teaLounge,
    availableOutlets: ["capri", "dlf-city", "dlf-club4"],
    suitableFor: "Grooming & tactile tranquility",
    experienceNotes: "Clean, non-toxic products used throughout."
  },
  {
    id: "signature-journey-90",
    category: "journeys",
    name: "The Five Minutes of Quiet™ Signature Journey",
    shortDescription: "The ultimate sequence: 15-min sound immersion + 45-min therapeutic massage + 30-min scalp & facial reset.",
    durationMinutes: 90, // DEMO – owner to verify
    demoPriceINR: 4299, // DEMO – owner to verify
    image: IMAGES.ritualLounge,
    availableOutlets: ["capri", "hilton-63", "harmony"],
    suitableFor: "Total physical unwinding and deep stillness",
    experienceNotes: "Accompanied by complimentary botanical infusion in the quiet transition lounge."
  }
];

export interface OutletItem {
  id: string;
  name: string;
  shortName: string;
  complex: string;
  address: string;
  coordinates: { x: number; y: number }; // Relative SVG map points (0-100)
  demoHours: string; // DEMO – owner to verify
  demoPhone: string; // DEMO – owner to verify
  mapQuery: string;
  openNowEstimate: boolean; // Computed dynamically or fallback
  availableServicesCount: number;
}

export const OUTLETS_DATA: OutletItem[] = [
  {
    id: "capri",
    name: "Club Capri Flagship Sanctuary",
    shortName: "Sector 48 Flagship",
    complex: "Central Park II Resort",
    address: "Club Capri, Central Park II Resort, Sector 48, Sohna Road, Gurugram, Haryana 122018",
    coordinates: { x: 34, y: 56 },
    demoHours: "08:00 AM – 09:30 PM (Daily)", // DEMO – owner to verify
    demoPhone: "+91 70429 38777", // DEMO – owner to verify
    mapQuery: "Club Capri Central Park II Sector 48 Gurugram",
    openNowEstimate: true,
    availableServicesCount: 13
  },
  {
    id: "dlf-city",
    name: "DLF City Club Wellness Suite",
    shortName: "DLF Phase 4",
    complex: "DLF City Phase IV",
    address: "DLF City Club, Galleria Market Corridor, DLF Phase IV, Gurugram, Haryana 122002",
    coordinates: { x: 62, y: 32 },
    demoHours: "09:00 AM – 09:00 PM (Daily)", // DEMO – owner to verify
    demoPhone: "+91 70429 38777", // DEMO – owner to verify
    mapQuery: "DLF City Club DLF Phase 4 Gurugram",
    openNowEstimate: true,
    availableServicesCount: 9
  },
  {
    id: "hilton-63",
    name: "Hilton Sector 63 Lounge",
    shortName: "Golf Course Ext.",
    complex: "Sector 63 Commercial Hub",
    address: "Adjacent to Hilton Residences, Golf Course Extension Road, Sector 63, Gurugram, Haryana 122102",
    coordinates: { x: 74, y: 72 },
    demoHours: "10:00 AM – 10:00 PM (Daily)", // DEMO – owner to verify
    demoPhone: "+91 70429 38777", // DEMO – owner to verify
    mapQuery: "Hilton Sector 63 Golf Course Extension Road Gurugram",
    openNowEstimate: true,
    availableServicesCount: 8
  },
  {
    id: "harmony",
    name: "Harmony Zone Sound Sanctuary",
    shortName: "Harmony Zone",
    complex: "DLF Cyber City Periphery",
    address: "Harmony Zone Studio, Sector 25A, Near Cyber Hub, Gurugram, Haryana 122008",
    coordinates: { x: 52, y: 22 },
    demoHours: "11:00 AM – 08:30 PM (Wed–Mon, Closed Tue)", // DEMO – owner to verify
    demoPhone: "+91 70429 38777", // DEMO – owner to verify
    mapQuery: "Cyber City Sector 25A Gurugram",
    openNowEstimate: true,
    availableServicesCount: 7
  },
  {
    id: "dlf-club4",
    name: "DLF Club 4 Wellness Salon",
    shortName: "DLF Club 4",
    complex: "DLF Club4 Premises",
    address: "DLF Club 4, Block C, Sushant Lok Phase I, Gurugram, Haryana 122009",
    coordinates: { x: 44, y: 40 },
    demoHours: "09:30 AM – 08:30 PM (Daily)", // DEMO – owner to verify
    demoPhone: "+91 70429 38777", // DEMO – owner to verify
    mapQuery: "DLF Club 4 Sushant Lok Phase 1 Gurugram",
    openNowEstimate: true,
    availableServicesCount: 8
  }
];

export interface PlanItem {
  id: string;
  name: string;
  tier: "starter" | "mid" | "premium";
  tagline: string;
  isPopular?: boolean;
  demoMonthlyINR: number; // DEMO – owner to verify
  demoQuarterlyINR: number; // DEMO – owner to verify
  includedPerks: string[];
  idealFor: string;
}

export const MEMBERSHIP_PLANS: PlanItem[] = [
  {
    id: "plan-reset",
    name: "The Reset Circle",
    tier: "starter",
    tagline: "For consistent workweek decompression and mental pacing.",
    demoMonthlyINR: 3499, // DEMO – owner to verify
    demoQuarterlyINR: 8999, // DEMO – owner to verify
    includedPerks: [
      "4 × 15-Minute Chair or Sound Resets per month",
      "15% off all standalone treatments",
      "Preferred walk-in standby priority",
      "Access to Club Capri quiet garden lounge"
    ],
    idealFor: "Busy professionals needing weekly breath pauses"
  },
  {
    id: "plan-restore",
    name: "The Restore Guild",
    tier: "mid",
    tagline: "Our most balanced cadence for restorative wellness.",
    isPopular: true,
    demoMonthlyINR: 6999, // DEMO – owner to verify
    demoQuarterlyINR: 17999, // DEMO – owner to verify
    includedPerks: [
      "2 × 60-Minute Therapeutic or Ayurveda Bodywork sessions",
      "4 × 20-Minute Sound Bath or Vibroacoustic sessions",
      "Guest pass: 1 complimentary companion chair reset",
      "20% off salon and hair spa services",
      "Dedicated concierge WhatsApp booking"
    ],
    idealFor: "Regular self-care and high-stress recovery"
  },
  {
    id: "plan-retreat",
    name: "The Sanctuary Club",
    tier: "premium",
    tagline: "Unlimited micro-resets and dedicated holistic care.",
    demoMonthlyINR: 12999, // DEMO – owner to verify
    demoQuarterlyINR: 32999, // DEMO – owner to verify
    includedPerks: [
      "Unlimited 5-minute express chair resets",
      "4 × 60-Minute premium bodywork treatments",
      "Weekly Sound Room reservations",
      "Complimentary locker & herbal tea bar at all outlets",
      "Priority weekend booking slots across all 5 locations",
      "Complimentary monthly gift voucher for a guest"
    ],
    idealFor: "Executives and founders seeking an urban refuge"
  }
];

export const SPECIAL_TILES = [
  {
    title: "Gift Vouchers",
    description: "Gift an uninterrupted hour of quiet. Digital bespoke gift card delivered via WhatsApp or email.",
    action: "Custom voucher from ₹1,000 (Demo)"
  },
  {
    title: "First-Visit Welcome Privilege",
    description: "Enjoy a complimentary 10-minute sound bath enhancement with any 60-minute therapeutic session.",
    action: "Sample offer for new guests"
  },
  {
    title: "Corporate Prepaid Pack",
    description: "Bundled transferable credits for teams. Boost productivity and reduce burnout without overhead.",
    action: "Packs of 25, 50 & 100 resets"
  },
  {
    title: "Family Wellness Anchor",
    description: "Shared household monthly credit pool across all five Gurugram sanctuary locations.",
    action: "Shared pool up to 4 members"
  }
];

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  outletUsed: string;
  sessionTaken: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    quote: "I ducked into the Sector 48 lounge between client calls expecting a standard massage. Instead, the 15-minute sound reset felt like pressing an actual factory reset button in my mind.",
    author: "Rohan Malhotra",
    role: "Director of Product, Cyber City",
    outletUsed: "Club Capri Flagship",
    sessionTaken: "15-Minute Desk Reset + Himalayan Sound"
  },
  {
    quote: "Living with chronic neck tightness from 12-hour desk days. The therapist at DLF City Club had exceptional anatomical intuition. No rush, no noisy salon chatter—just deep, respectful quiet.",
    author: "Ananya Sengupta",
    role: "Senior Legal Counsel",
    outletUsed: "DLF City Club Suite",
    sessionTaken: "Head, Scapula & Shoulder Release"
  },
  {
    quote: "The on-body singing bowl technique is unlike anything in Delhi NCR. You physically feel the tension draining from your chest plate into the resonance mat. Truly exceptional craft.",
    author: "Devrath Singhania",
    role: "Architecture Partner, Golf Course Ext.",
    outletUsed: "Hilton Sector 63 Lounge",
    sessionTaken: "Tibetan On-Body Bowl Technique"
  },
  {
    quote: "Stress Buster Station came into our corporate office for a 3-day wellness pop-up. Over 140 engineers took 15-minute chair resets. The team vibe afterwards was tangibly lighter and calmer.",
    author: "Meenakshi K.",
    role: "People Operations Head, FinTech Sector",
    outletUsed: "On-Site Corporate Pop-Up",
    sessionTaken: "Ergonomic Corporate Chair Series"
  }
];

export const FAQS_DATA = [
  {
    question: "Is this my first visit? What should I expect when arriving?",
    answer: "Arrive 5 to 10 minutes prior to your reserved time. You will be greeted with warm sandalwood linen and an herbal foot soak or breath pause. There is no paperwork friction. Your practitioner will confirm your pressure preferences and acoustic tolerance before beginning."
  },
  {
    question: "Do I need to change my clothes for express resets?",
    answer: "No. Our 5-minute and 15-minute chair and desk resets are entirely ergonomic and designed for formal, workwear, or business casual clothing. For 60-minute therapeutic bodywork and Ayurvedic sessions, fresh organic linen robes and disposable garments are provided in private suites."
  },
  {
    question: "Are sound bowls and vibroacoustic sessions safe for everyone?",
    answer: "Sound and vibrational therapy provide gentle, non-invasive deep relaxation. However, if you have a cardiac pacemaker, active epilepsy, recent bone fractures, or are in your first trimester of pregnancy, please notify us so we can adapt acoustic overtones without direct on-body resonance."
  },
  {
    question: "What is your cancellation and rescheduling policy?",
    answer: "Life in Gurugram can be unpredictable. You may reschedule or cancel any session up to 2 hours prior without any fee. For corporate and group bookings, a 24-hour advance courtesy is appreciated."
  },
  {
    question: "Can we bring Stress Buster Station into our corporate campus?",
    answer: "Yes. We operate fully self-contained corporate wellness days, weekly executive chair clinics, and ergonomic sound rooms across DLF Cyber City, Udyog Vihar, Golf Course Road, and Noida. Inquire via our Corporate section."
  },
  {
    question: "Medical Disclaimer & Scope of Care",
    answer: "Wellness, vibrational, and relaxation services offered at Stress Buster Station are holistic modalities designed for stress reduction and physical relaxation. They are not a substitute for medical diagnosis, clinical psychotherapy, physical therapy, or psychiatric treatment."
  }
];

export const MANIFESTO_TEXT = 
  "Modern work does not break you with a single catastrophic event. It wears you down in the imperceptible hum: seventy-two unread notifications, back-to-back video calls, the constant posture of alertness. We believe you do not always need a two-week retreat in the Himalayas to reclaim your mind. You need five minutes of deliberate, sacred quiet right here in the pulse of Gurugram. When you step into our space, the clock stops ticking for the outside world. Sound slows down your pulse. Skilled touch unwinds your neck. You take a full, unobstructed breath. And you return to your life grounded.";

export const BROCHURE_SAMPLE_CONTENT = {
  title: "Stress Buster Station — Corporate & Sanctuary Wellness Dossier",
  edition: "2026 Curated Edition (Demo Brochure)",
  disclaimer: "Sample promotional document pending owner verification.",
  phone: "+91 70429 38777",
  email: "connect@stressbusterstation.com",
  locations: "Gurugram: Sector 48 · DLF Phase 4 · Sector 63 · DLF Club 4 · Cyber City",
  pillars: [
    "Ergonomic Workplace On-Site Resets (5 & 15 minutes)",
    "Himalayan Acoustic & Vibroacoustic Sound Lounges",
    "Restorative Bodywork & Ayurvedic Decompression",
    "Tailored Executive De-Stressing Programs"
  ]
};
