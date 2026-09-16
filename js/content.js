/**
 * content.js
 * Single source of truth for all editable Sangeet Shraavana website content.
 * Edit values here — do not hardcode copy inside HTML/JS logic files.
 *
 * Sangeet Shraavana is the classical music & dance program run annually by
 * Dr. Ishwar Koujalgi Memorial Charitable Trust, Bidar. The trust organises
 * public recitals, felicitations and community music events in memory of
 * Dr. Ishwar Koujalgi — it does not run classes or offer instruction.
 */

const SITE_CONTENT = {
  academy: {
    name: "Sangeet Shraavana",
    trustName: "Dr. Ishwar Koujalgi Memorial Charitable Trust",
    nameKannada: "ಸಂಗೀತ ಶ್ರಾವಣ",
    tagline: "Where Tradition Finds Its Voice",
    phone: "+91 88611 88186",
    email: "hello@sangeetshraavana.in",
    address: "Bidar, Karnataka, India",
    mapUrl: "#",
  },

  navigation: [
    { label: "Home", href: "index.html" },
    { label: "About", href: "about.html" },
    /*{ label: "Artists", href: "faculty.html" },*/
    { label: "Events", href: "events.html" },
    { label: "Gallery", href: "gallery.html" },
    { label: "Contact", href: "contact.html" },
  ],

  hero: {
    slides: [
      {
        eyebrow: "A Bidar tradition, kept alive",
        heading: "Where classical music finds an audience",
        body: "Sangeet Shraavana brings vocalists, instrumentalists and dancers to the stage in Bidar — a charitable tribute to Dr. Ishwar Koujalgi, offered through music.",
        cta: { label: "Upcoming events", href: "events.html" },
        image: "assets/images/hero/hero-vocal.jpg",
      },
      {
        eyebrow: "Artists, honoured and heard",
        heading: "A stage for Karnataka's classical musicians",
        body: "From Carnatic vocal to Bharatanatyam, the trust brings performing artists to Bidar and felicitates those who keep these traditions alive.",
        cta: { label: "Meet our artists", href: "faculty.html" },
        image: "assets/images/hero/hero-tabla.jpg",
      },
      {
        eyebrow: "In memory, for the community",
        heading: "Music offered in remembrance",
        body: "Every recital, felicitation and gathering we host carries forward the memory of Dr. Ishwar Koujalgi — free, open, and rooted in Bidar.",
        cta: { label: "About the trust", href: "about.html" },
        image: "assets/images/hero/hero-sitar.jpg",
      },
    ],
  },

  about: {
    heading: "A trust dedicated to classical music",
    body: "Dr. Ishwar Koujalgi Memorial Charitable Trust was established in Bidar to honour the memory of Dr. Ishwar Koujalgi through the classical arts he loved. Each year, under the banner of Sangeet Shraavana, the trust brings vocalists, instrumentalists and dancers to the city, felicitates accomplished artists, and keeps Bidar's connection to classical music and dance alive — open to anyone who wishes to attend.",
    stats: [
      { value: "12+", label: "years of programs" },
      { value: "500+", label: "artists felicitated" },
      { value: "6", label: "art forms represented" },
      { value: "25+", label: "public recitals held" },
    ],
    image: "assets/images/about/about-main.jpg",
  },

  faculty: [
    {
      name: "Vidwan Raghavendra Rao",
      role: "Carnatic Vocal & Violin",
      bio: "Trained under the Thanjavur tradition; has performed at Sangeet Shraavana programs since 2014.",
      image: "assets/images/faculty/faculty-1.jpg",
    },
    {
      name: "Smt. Lakshmi Narayan",
      role: "Bharatanatyam",
      bio: "Senior disciple of the Kalakshetra style; a featured performer at the trust's annual recitals.",
      image: "assets/images/faculty/faculty-2.jpg",
    },
    {
      name: "Ustad Imran Sheikh",
      role: "Sitar & Tabla",
      bio: "Hindustani classical musician, All India Radio graded artist; a regular performer at trust programs.",
      image: "assets/images/faculty/faculty-3.jpg",
    },
    {
      name: "Shri Anand Kulkarni",
      role: "Bansuri",
      bio: "Disciple of the Maihar gharana; has performed across Karnataka and at Sangeet Shraavana events.",
      image: "assets/images/faculty/faculty-4.jpg",
    },
  ],

  events: [
    {
      title: "Sangeet Shraavana – Singing Competition",
      date: "2026-09-06",
      time: "6:00 PM – 2:00 PM",
      location: "Dr. Channabasava Pattadevaru Ranga Mandira, Bidar",
      description: "Celebrating the Voice, Talent & Tradition of Indian Music.",
      details: [
        "Sangeet Shraavana presents a vibrant singing competition designed to provide talented singers with a platform to showcase their musical abilities. Participants can express their passion for music through soulful performances while celebrating the rich traditions of Indian music.",        
        "The competition brings together singers from different backgrounds and creates an inspiring environment where talent meets tradition. It is an opportunity for participants to perform with confidence and share their love for music with a wider audience.",
      
      ],
      image: "assets/images/events/event-1.webp",
    },
    {
      title: "Sangeet Shraavana – Grand Opening Ceremony",
      date: "2026-09-06",
      time: "2:00 PM – 8:30 PM",
      location: "Dr. Channabasava Pattadevaru Ranga Mandira, Bidar",
      description: "A Grand Beginning to a Celebration of Indian Music.",
      details: [
        "The Sangeet Shraavana 2026 Grand Opening Ceremony marks the auspicious beginning of a beautiful musical journey. The event brings together distinguished guests, artists, musicians, cultural personalities and music enthusiasts to celebrate the timeless beauty of Indian music and culture.",
        "The opening ceremony sets the tone for the entire Sangeet Shraavana celebration, creating an atmosphere of tradition, devotion and artistic excellence. It welcomes everyone to a memorable series of musical and cultural experiences.",
      ],
      image: "assets/images/events/event-2.webp",
    },
    {
      title: "Sangeet Darbar",
      date: "2027-09-06",
      time: "6:00 AM – 11:00 PM",
      location: "Dr. Channabasava Pattadevaru Ranga Mandira, Bidar",
      description: "An Evening of Indian Classical Music.",
      details: [
        "Sangeet Darbar is a soulful musical evening celebrating the depth, beauty and heritage of Indian classical music. The event brings together accomplished musicians and passionate performers for an immersive experience filled with melody, rhythm and devotion.",
        "Sangeet Darbar provides a traditional setting where artists and audiences come together to experience the magic of Indian music. Every performance reflects the richness of our musical heritage while creating an intimate and memorable evening for everyone present.",
      ],
      image: "assets/images/events/event-3.webp",
    },
     /*{
      title: "Spring Bharatanatyam Margam",
      date: "2027-02-08",
      time: "5:30 PM – 7:30 PM",
      location: "Community Rangamandira, Bidar",
      description: "A full margam performance by accomplished Bharatanatyam artists.",
      details: [
        "A complete margam — from alarippu through thillana — presented by Bharatanatyam artists associated with the trust.",
        "This is a ticketed evening; seats can be reserved through the trust office starting three weeks before the date.",
        "A short introduction to each piece will be given before it begins, useful for guests less familiar with the repertoire.",
      ],
      image: "assets/images/events/event-1.jpg",
    },
    {
      title: "Artists' Recital Evening",
      date: "2027-03-05",
      time: "6:30 PM – 8:30 PM",
      location: "Community Rangamandira, Bidar",
      description: "The artists behind Sangeet Shraavana come together for one shared evening.",
      details: [
        "Once a year, the performing artists associated with Sangeet Shraavana come together for a single shared evening on stage.",
        "Expect a mixed program spanning vocal, sitar, tabla, and violin — a rare chance to hear these musicians perform alongside one another.",
        "Open seating, no registration required. Arrive early — this evening tends to fill the hall.",
      ],
      image: "assets/images/events/event-2.jpg",
    },
   {
      title: "Guru Vandana: Artist Felicitation Evening",
      date: "2027-04-12",
      time: "5:00 PM – 7:00 PM",
      location: "Community Rangamandira, Bidar",
      description: "The trust honours senior artists and rising talent from across the region.",
      details: [
        "An evening dedicated to felicitating senior classical artists and recognising promising young performers from across the region.",
        "The program includes short performances by those being honoured, followed by the felicitation ceremony itself.",
        "Open to the public. Families of honoured artists are especially welcome to attend.",
      ],
      image: "assets/images/events/event-3.jpg",
    },*/
  ],

  gallery: [
    { category: "events", image: "assets/images/gallery/event-01.webp", caption: "Inaugural pooja ceremony" },
    { category: "felicitations", image: "assets/images/gallery/event-24.webp", caption: "Artist receiving recognition" },
    { category: "recitals", image: "assets/images/gallery/event-37.webp", caption: "Live concert performance" },
    { category: "events", image: "assets/images/gallery/event-02.webp", caption: "Prayer offering" },
    { category: "felicitations", image: "assets/images/gallery/event-25.webp", caption: "Certificate presentation" },
    { category: "recitals", image: "assets/images/gallery/event-38.webp", caption: "Full ensemble on stage" },
    { category: "events", image: "assets/images/gallery/event-03.webp", caption: "Traditional lamp-lighting" },
    { category: "felicitations", image: "assets/images/gallery/event-26.webp", caption: "Young talent honoured" },
    { category: "recitals", image: "assets/images/gallery/event-39.webp", caption: "Musical recital" },
    { category: "events", image: "assets/images/gallery/event-04.webp", caption: "Guest felicitation" },
    { category: "felicitations", image: "assets/images/gallery/event-27.webp", caption: "Excellence award" },
    { category: "recitals", image: "assets/images/gallery/event-40.webp", caption: "Devotional music performance" },
    { category: "events", image: "assets/images/gallery/event-05.webp", caption: "Welcoming dignitaries" },
    { category: "felicitations", image: "assets/images/gallery/event-28.webp", caption: "Celebrating an artist's achievement" },
    { category: "recitals", image: "assets/images/gallery/event-41.webp", caption: "Classical recital in progress" },
    { category: "events", image: "assets/images/gallery/event-06.webp", caption: "Ceremonial proceedings" },
    { category: "felicitations", image: "assets/images/gallery/event-29.webp", caption: "Artist receiving recognition" },
    { category: "recitals", image: "assets/images/gallery/event-42.webp", caption: "Live concert performance" },
    { category: "events", image: "assets/images/gallery/event-07.webp", caption: "Inauguration function" },
    { category: "felicitations", image: "assets/images/gallery/event-30.webp", caption: "Certificate presentation" },
    { category: "recitals", image: "assets/images/gallery/event-43.webp", caption: "Full ensemble on stage" },
    { category: "events", image: "assets/images/gallery/event-08.webp", caption: "Honouring the guests" },
    { category: "felicitations", image: "assets/images/gallery/event-31.webp", caption: "Young talent honoured" },
    { category: "recitals", image: "assets/images/gallery/event-44.webp", caption: "Musical recital" },
    { category: "events", image: "assets/images/gallery/event-09.webp", caption: "Opening ceremony moment" },
    { category: "felicitations", image: "assets/images/gallery/event-32.webp", caption: "Excellence award" },
    { category: "recitals", image: "assets/images/gallery/event-45.webp", caption: "Devotional music performance" },
    { category: "events", image: "assets/images/gallery/event-10.webp", caption: "Inaugural pooja ceremony" },
    { category: "felicitations", image: "assets/images/gallery/event-33.webp", caption: "Celebrating an artist's achievement" },
    { category: "recitals", image: "assets/images/gallery/event-46.webp", caption: "Classical recital in progress" },
    { category: "events", image: "assets/images/gallery/event-11.webp", caption: "Prayer offering" },
    { category: "felicitations", image: "assets/images/gallery/event-34.webp", caption: "Artist receiving recognition" },
    { category: "recitals", image: "assets/images/gallery/event-47.webp", caption: "Live concert performance" },
    { category: "events", image: "assets/images/gallery/event-12.webp", caption: "Traditional lamp-lighting" },
    { category: "felicitations", image: "assets/images/gallery/event-35.webp", caption: "Certificate presentation" },
    { category: "recitals", image: "assets/images/gallery/event-48.webp", caption: "Full ensemble on stage" },
    { category: "events", image: "assets/images/gallery/event-13.webp", caption: "Guest felicitation" },
    { category: "felicitations", image: "assets/images/gallery/event-36.webp", caption: "Young talent honoured" },
    { category: "events", image: "assets/images/gallery/event-14.webp", caption: "Welcoming dignitaries" },
    { category: "events", image: "assets/images/gallery/event-15.webp", caption: "Ceremonial proceedings" },
    { category: "events", image: "assets/images/gallery/event-16.webp", caption: "Inauguration function" },
    { category: "events", image: "assets/images/gallery/event-17.webp", caption: "Honouring the guests" },
    { category: "events", image: "assets/images/gallery/event-18.webp", caption: "Opening ceremony moment" },
    { category: "events", image: "assets/images/gallery/event-19.webp", caption: "Inaugural pooja ceremony" },
    { category: "events", image: "assets/images/gallery/event-20.webp", caption: "Prayer offering" },
    { category: "events", image: "assets/images/gallery/event-21.webp", caption: "Traditional lamp-lighting" },
    { category: "events", image: "assets/images/gallery/event-22.webp", caption: "Guest felicitation" },
    { category: "events", image: "assets/images/gallery/event-23.webp", caption: "Welcoming dignitaries" },
    { category: "events", image: "assets/images/gallery/event-49.webp", caption: "Inauguration ceremony" },
  ],

  testimonials: [
    {
      quote: "I've been attending Sangeet Shraavana's recitals for years now. Every evening feels like a tribute done right — to the music, and to Dr. Koujalgi's memory.",
      name: "Deepa R.",
      relation: "Regular attendee",
    },
    {
      quote: "Being felicitated by the trust after decades of playing tabla meant more to me than I expected. They remember artists that others overlook.",
      name: "Kiran Joshi",
      relation: "Felicitated tabla artist",
    },
    {
      quote: "My son performed at one of their community recitals when he was young. The trust's encouragement stayed with him ever since.",
      name: "Farida Sheikh",
      relation: "Parent of a performing artist",
    },
  ],

  social: [
    { platform: "Instagram", href: "#", icon: "instagram" },
    { platform: "YouTube", href: "#", icon: "youtube" },
    { platform: "Facebook", href: "#", icon: "facebook" },
  ],
};
