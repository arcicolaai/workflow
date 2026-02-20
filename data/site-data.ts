export default {
  site: {
    name: "Workflow Coworking Space",
    tagline: "Your best work gets done here.",
    description: "The first ever coworking space and study hub in Ozamiz City and Misamis Occidental"
  },
  hero: {
    backgroundImage: "/images/heropic.png",
    backgroundImageAlt: "Workflow Coworking Space interior",
    subtitle: "Workflow Coworking Space",
    title: "Your best work gets done",
    titleHighlight: "here.",
    description: "The first ever coworking space and study hub in Ozamiz City and Misamis Occidental",
    buttons: [
      {
        text: "ORDER NOW",
        type: "primary",
        action: "order"
      },
      {
        text: "BOOK OUR SPACE",
        type: "secondary",
        action: "book"
      }
    ]
  },
  about: {
    title: "About us",
    paragraphs: [
      "Made by the passionate, for the passionate.",
      "Workflow Coworking Space is the first ever hub in the heart of Ozamiz City and Misamis Occidental, designed to inspire productivity and collaboration.",
      "We provide a welcoming space for freelancers, students, and entrepreneurs to work, connect, and grow together."
    ],
    image: "/images/about.jpeg",
    imageAlt: "Workflow Coworking Space - people working together",
    overlayText: "workflow coworking",
    button: {
      text: "LEARN MORE",
      action: "learn-more"
    },
    titleColor: "#7B7557",
    textColor: "#1E1E1E",
    buttonColor: "#7B7557",
    buttonHoverColor: "#605B45"
  },
  features: [
    {
      name: "High Speed Internet",
      icon: "wifi"
    },
    {
      name: "Power Outlets",
      icon: "outlet"
    },
    {
      name: "Air Conditioned",
      icon: "ac"
    },
    {
      name: "Ergonomic Chairs",
      icon: "chair"
    }
  ],
  ourSpace: {
    title: "Our Space",
    description: "Designed to inspire productivity and creativity, our space welcomes students, freelancers, entrepreneurs, and anyone in search of a comfortable place to work or unwind. Enjoy a wide selection of beverages from coffee favorites and milk based drinks to matcha and more paired perfectly with satisfying rice meals and snacks. Simply place your order, settle in, and make the space your own for the day. Planning something bigger? You can also book the entire venue for events, seminars, and special gatherings.",
    button: {
      text: "RATES",
      action: "rates"
    },
    images: [
      "/images/image1.png",
      "/images/image2.jpg",
      "/images/image3.jpg",
      "/images/image4.png",
      "/images/image1.png",
      "/images/image2.jpg",
      "/images/image3.jpg",
      "/images/image4.png"
    ],
    carousel: {
      itemsPerGroup: 4,
      autoSlideInterval: 5000
    }
  },
  navigation: {
    logo: {
      image: "/images/logo.png"
    },
    links: [
      {
        text: "Home",
        to: "#hero"
      },
      {
        text: "About",
        to: "/aboutUs"
      },
      {
        text: "Our Space",
        to: "/our-space"
      },
      {
        text: "Menu",
        to: "/menu"
      },
      {
        text: "Announcements",
        to: "/announcements"
      }
    ],
    contactButton: {
      text: "Contact Us",
      to: "/contact"
    }
  },
  serviceFeatures: [
    {
      name: "MADE-TO-ORDER",
      icon: "chef"
    },
    {
      name: "CONVENIENT ORDERING",
      icon: "basket"
    },
    {
      name: "FUEL FOR GREAT IDEAS",
      icon: "lightbulb"
    }
  ],
  bestSellingItems: {
    title: {
      prefix: "Our",
      highlight: "Best-Selling",
      suffix: "Items"
    },
    description: "Our best-selling items are loved for their rich flavors and satisfying quality. From creamy coffee favorites to hearty, flavorful food, each product is crafted to deliver comfort and enjoyment making them the top choices our customers keep coming back for.",
    items: [
      {
        name: "Signature Matcha Latte",
        price: "₱185",
        description: "A refreshing iced matcha latte with vibrant green matcha layered over creamy milk and ice for a smooth, earthy, and lightly sweet flavor.",
        image: "/images/signature.png"
      },
      {
        name: "Ube Spanish Latte",
        price: "₱170",
        description: "A stunning iced Ube Spanish latte a creamy, layered Filipino-inspired drink featuring vibrant purple ube (sweet purple yam with nutty vanilla notes).",
        image: "/images/ube.png"
      },
      {
        name: "Dirty Matcha Latte",
        price: "₱160",
        description: "A refreshing iced dirty matcha latte a striking layered drink featuring vibrant green matcha blended with creamy milk at the bottom, topped with a bold espresso pour that creates mesmerizing swirls of caramel-brown over ice.",
        image: "/images/dirty.png"
      },
      {
        name: "Caramel Macchiato",
        price: "₱129",
        description: "Iced caramel macchiato layered with milk, espresso, caramel drizzle, and topped with whipped cream.",
        image: "/images/caramel.png"
      }
    ],
    viewMenuButton: {
      text: "View Menu",
      action: "view-menu"
    }
  },
  announcements: {
    title: "Announcements",
    items: [
      {
        id: "cloud-series",
        title: "Signature CLOUD SERIES",
        image: "/images/m1.jpg"
      },
      {
        id: "brain-booster",
        title: "Brain Booster",
        image: "/images/m2.jpg"
      },
      {
        id: "coffee-shop",
        title: "Coffee Shop Setup",
        image: "/images/m3.jpg"
      },
      {
        id: "savory-selections",
        title: "Savory Selections",
        image: "/images/m4.jpg"
      },
      {
        id: "anniversary",
        title: "2ND ANNIVERSARY CELEBRATION",
        image: "/images/m5.jpg"
      }
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        id: "outside-food",
        question: "Can I bring my own food or drinks?",
        answer: "We kindly ask that no outside food or drinks be brought into Workflow. Enjoy our selection of fresh drinks, rice meals, and snacks while you work or study!"
      },
      {
        id: "book-space",
        question: "Can I book the space for events or seminars?",
        answer: "Absolutely! You can rent the entire space for events, workshops, or seminars. Contact us to check availability and rates."
      },
      {
        id: "sign-in",
        question: "Do I need to sign in to order drinks or meals?",
        answer: "No sign-in is required! You can order as a guest and pay at the counter, and pick up your order which is simple, fast, and convenient."
      }
    ]
  },
  contact: {
    title: "Contact Us",
    form: {
      firstName: {
        label: "Firstname",
        placeholder: "Firstname"
      },
      lastName: {
        label: "Lastname",
        placeholder: "Lastname"
      },
      email: {
        label: "Your email address",
        placeholder: "Your email address"
      },
      phone: {
        label: "Contact Number",
        placeholder: "Contact Number"
      },
      subject: {
        label: "Subject",
        placeholder: "Subject"
      },
      message: {
        label: "Your message",
        placeholder: "Your message"
      }
    },
    map: {
      title: "Find us here",
      embedUrl: "https://www.google.com/maps?q=555+Don+Anselmo+Bernad+Avenue,+Ozamiz,+Misamis+Occidental,+Workflow+co-working+space+mercury+dug+building&output=embed",
      location: "555 Don Anselmo Bernad Avenue, Ozamiz, Misamis Occidental",
      placeName: "Workflow co-working space in mercury dug building"
    },
    buildingImage: "/images/locationwork.jpg",
    backgroundImage: "/images/contact-bg.jpg"
  },
  footer: {
    logo: {
      image: "/images/logo.png",
      text: "WORKFLOW COWORKING SPACE",
      tagline: "Your Coworking Space and Cafe in Ozamiz City and Misamis Occidental"
    },
    sitemap: {
      title: "Sitemap",
      links: [
        { text: "Why Workflow?", to: "#about" },
        { text: "Amenities", to: "#amenities" },
        { text: "How it works", to: "#how-it-works" },
        { text: "Community", to: "#community" },
        { text: "Contact Us", to: "/contact" }
      ]
    },
    location: {
      title: "Location",
      address: "Workflow Coworking Space, 2/F Infinity Business Center, Bernad Avenue, Aguada, Ozamiz City, 7200 Misamis Occidental, Philippines"
    },
    businessHours: {
      title: "Business Hours",
      hours: [
        "Monday to Saturday",
        "8:00 am to 10:00 pm"
      ]
    },
    poweredBy: "Powered by Tech Savvy"
  },
  colors: {
    primary: "#7B7557",
    primaryHover: "#605B45",
    workflowGreen: "#7B7557",
    workflowGreenHover: "#605B45"
  }
}

