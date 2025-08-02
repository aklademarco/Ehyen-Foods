import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Home: NextPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const sections = ["home", "about", "products", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Intersection Observer for product cards
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardIndex = entry.target.getAttribute("data-index");
          if (cardIndex !== null) {
            const index = parseInt(cardIndex);
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        }
      });
    }, observerOptions);

    // Set up intersection observer for product cards
    const setupObserver = () => {
      const productCards = document.querySelectorAll(".product-card");

      if (productCards.length > 0) {
        productCards.forEach((card) => observer.observe(card));
      } else {
        // If elements aren't ready yet, try again
        setTimeout(setupObserver, 200);
      }
    };

    // Start observing after component mounts
    setTimeout(setupObserver, 100);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    });
  };

  const spices = [
    {
      name: "Garlic Flakes",
      description:
        "Crisp, aromatic, and bursting with flavor, our Garlic Flakes offer a convenient way to enjoy the bold taste of fresh garlic without the prep. Perfect for soups, sauces, marinades, and spice blends, they add depth and warmth to any dish. Naturally dried to preserve essential oils and nutrients.",
      image: "/images/GarlicFlakes.jpg",
      origin: "Ehyen Foods",
      benefits: [
        "Boosts Immunity",
        "Supports Heart Health",
        "Rich in Antioxidants",
      ],
      organic: true,
    },
    {
      name: "Onion Flakes",
      description:
        "Sweet and savory, our Onion Flakes provide a convenient way to add rich onion flavor to your dishes without the hassle of chopping. Perfect for soups, stews, and spice blends.",
      image: "/images/onionFlakes.jpg",
      origin: "Ehyen Foods",
      benefits: ["Digestive aid", "Fresh breath", "Heart healthy"],
      organic: true,
    },
    {
      name: "Shrimp Powder",
      description:
        "Aromatic and flavorful, our Shrimp Powder is made from high-quality shrimp, providing a rich umami taste to your dishes. Perfect for soups, sauces, and marinades.",
      image: "/images/ShrimpPowder.jpg",
      origin: "Ehyen Foods",
      benefits: ["Mood enhancer", "Luxury flavor", "Antioxidant power"],
      organic: true,
    },
    {
      name: "Pepper Soup",
      description:
        "A warm and comforting blend, our Pepper Soup is perfect for chilly days. Made with a variety of spices, it offers a rich and flavorful experience.",
      image: "/images/PepperSoup.jpg",
      origin: "Ehyen Foods",
      benefits: ["Flavor enhancer", "Natural sweetness", "Warming spice"],
      organic: true,
    },
    {
      name: "Khebab Suya",
      description:
        "A spicy and flavorful blend, our Khebab Suya is perfect for grilling and barbecuing. Made with a variety of spices, it offers a rich and smoky flavor.",
      image: "/images/khebabSuyaSeasoning.jpg",
      origin: "Ehyen Foods",
      benefits: ["Mood enhancer", "Digestive aid", "Bold flavor"],
      organic: true,
    },
    {
      name: "4Mix",
      description:
        "A harmonious blend of spices for all-purpose cooking. Ginger, garlic, onion, and pepper come together to create a versatile seasoning that enhances the flavor of any dish.",
      image: "/images/4inONE.jpg",
      origin: "Ehyen Foods",
      benefits: ["Iron-rich", "Digestive support", "Authentic taste"],
      organic: true,
    },
    {
      name: "All Purpose",
      description:
        "A versatile blend of spices designed to enhance the flavor of any dish. Perfect for seasoning meats, vegetables, and more.",
      image: "/images/AllPurposeSeasoning.jpg",
      origin: "Ehyen Foods",
      benefits: ["Iron-rich", "Digestive support", "Authentic taste"],
      organic: true,
    },
    {
      name: "Goat Seasoning",
      description:
        "A rich and flavorful blend designed to enhance goat dishes. Perfect for stews, grills, and marinades.",
      image: "/images/GoatSeasoning.jpg",
      origin: "Ehyen Foods",
      benefits: ["Iron-rich", "Digestive support", "Authentic taste"],
      organic: true,
    },
    {
      name: "Kelewele And Kakro",
      description: "All in one natural spice for your Kelewele and Kakro",
      image: "/images/KeleweleSeasoning.jpg",
      origin: "Ehyen Foods",
      benefits: ["Iron-rich", "Digestive support", "Authentic taste"],
      organic: true,
    },
    {
      name: "Jollof Rice",
      description:
        "A vibrant and aromatic blend of spices designed to bring the authentic taste of Jollof rice to your kitchen.",
      image: "/images/JollofSeasoning.jpg",
      origin: "Ehyen Foods",
      benefits: ["Iron-rich", "Digestive support", "Authentic taste"],
      organic: true,
    },
    {
      name: "Beef Seasoning",
      description:
        "A robust and flavorful blend designed to enhance beef dishes.",
      image: "/images/BeefSeasoning.jpg",
      origin: "Ehyen Foods",
      benefits: ["Iron-rich", "Digestive support", "Authentic taste"],
      organic: true,
    },

    {
      name: "Fish Powder",
      description:
        "Aromatic and flavorful, our Fish Powder is made from high-quality fish, providing a rich umami taste to your dishes. Perfect for soups, sauces, and marinades.",
      image: "/images/fishPowder.jpg",
      origin: "Ehyen Foods",
      benefits: ["Mood enhancer", "Luxury flavor", "Antioxidant power"],
      organic: true,
    },

    {
      name: "Chicken Seasoning",
      description: "A flavorful blend designed to enhance chicken dishes.",
      image: "/images/ChickenSeasoning.jpg",
      origin: "Ehyen Foods",
      benefits: ["Iron-rich", "Digestive support", "Authentic taste"],
      organic: true,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Chef",
      content:
        "Ehyen Foods has transformed my kitchen. Their premium spices bring authentic flavors that my customers love. The quality is unmatched!",
      rating: 5,
      image: "/images/ehyen.jpg",
    },
    {
      name: "Michael Chen",
      role: "Home Cook",
      content:
        "I've been using Ehyen spices for over a year now. The difference in taste is incredible. My family can't get enough of my cooking!",
      rating: 5,
      image: "/images/ehyen.jpg",
    },
    {
      name: "Emma Rodriguez",
      role: "Food Blogger",
      content:
        "As a food blogger, I need the best ingredients. Ehyen Foods never disappoints. Their spices are the secret to my most popular recipes.",
      rating: 5,
      image: "/images/ehyen.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Head>
        <title>Ehyen Foods - Premium Spices for Your Soul</title>
        <meta
          name="description"
          content="Discover premium quality spices from around the world. Ehyen Foods brings authentic flavors to your kitchen with our carefully curated spice collection."
        />
        <meta
          name="keywords"
          content="spices, premium spices, turmeric, cardamom, saffron, cinnamon, food, cooking, authentic flavors"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>

      {/* Floating Particles Background */}
      <div className="particles fixed inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1} animate-float`} />
        ))}
      </div>

      {/* Navigation Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isVisible
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 animate-fade-in-left">
              <div className="relative">
                <Image
                  src="/images/ehyen.jpg"
                  alt="Ehyen Foods Logo"
                  width={50}
                  height={50}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-15 md:h-15 rounded-full shadow-lg ring-2 ring-orange-200"
                />
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text font-serif">
                Ehyen Foods
              </h1>
            </div>

            <nav
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } md:flex absolute md:relative top-full left-0 md:top-auto md:left-auto w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8 animate-fade-in-right rounded-b-lg md:rounded-none`}
            >
              {["home", "about", "products", "testimonials", "contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`relative px-3 sm:px-4 py-2 text-sm sm:text-base font-medium transition-all duration-300 capitalize hover:text-orange-600 rounded-md md:rounded-none hover:bg-orange-50 md:hover:bg-transparent
                    ${
                      activeSection === item
                        ? "text-orange-600 bg-orange-50 md:bg-transparent"
                        : "text-gray-700"
                    }`}
                  >
                    {item}
                    {activeSection === item && (
                      <div className="hidden md:block absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                    )}
                  </a>
                )
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors rounded-md hover:bg-orange-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10 px-4 sm:px-6 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/GarlicFlakes.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Background overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 sm:bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-red-900/20"></div>

          <div className="container mx-auto relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              <h1
                className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 font-serif transition-all duration-1000 leading-tight ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                <span className="text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 bg-clip-text block">
                  « Nti na aduane yi
                </span>
                <span className="text-white animate-float block mt-2">
                  yɛdɛ yi »
                </span>
              </h1>

              <p
                className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-6 sm:mb-8 leading-relaxed px-4 transition-all duration-1000 delay-300 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                Experience 100% natural, additive-free spices from Ghana&apos;s
                smallholder women farmers.
                <br className="hidden sm:block" />
                Sustainably crafted with traditional knowledge and modern
                techniques.
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 transition-all duration-1000 delay-500 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                <button
                  onClick={() =>
                    document
                      .getElementById("products")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                >
                  Explore Products
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-orange-500 text-orange-600 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 text-sm sm:text-base"
                >
                  Our Story
                </button>
              </div>

              {/* Trust indicators */}
              <div
                className={`flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 px-4 transition-all duration-1000 delay-700 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
              >
                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-800 font-medium">
                    100% Natural
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-800 font-medium">
                    Additive-Free
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-800 font-medium">
                    Supporting Women Farmers
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Floating Spice Icons */}
          <div
            className="absolute top-20 left-10 animate-float"
            style={{ animationDelay: "0s" }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20"></div>
          </div>
          <div
            className="absolute top-40 right-20 animate-float"
            style={{ animationDelay: "1s" }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-full opacity-20"></div>
          </div>
          <div
            className="absolute bottom-32 left-1/4 animate-float"
            style={{ animationDelay: "2s" }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-15"></div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div
                className={`space-y-4 sm:space-y-6 order-2 lg:order-1 transition-all duration-1000 animate-fade-in-left`}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 font-serif leading-tight">
                  About{" "}
                  <span className="text-transparent bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text">
                    Ehyen Foods
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Ehyen Foods sustainably produces 100% natural, additive-free
                  spices through eco-friendly, value-added processing. By
                  blending traditional knowledge with modern techniques such as
                  hygienic drying, sorting, and packaging, we preserve authentic
                  flavour and nutrition without the use of chemicals.
                </p>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Our spices are sourced directly from smallholder women farmers
                  across rural Ghana, reducing post-harvest losses, improving
                  product quality, and increasing farmer incomes. Born from a
                  personal health journey, our innovation not only offers
                  healthy, locally-made alternatives to imported spice blends,
                  but also drives rural development and gender equity.
                </p>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Today, our products are trusted by households, food vendors,
                  and international stores, proving that natural can also be
                  powerful, profitable, and impactful.
                </p>

                <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                  <div className="text-center p-4 sm:p-6 bg-white/50 rounded-xl backdrop-blur-sm hover:bg-white/70 transition-all duration-300">
                    <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">
                      100%
                    </div>
                    <div className="text-sm sm:text-base text-gray-600">
                      Natural & Additive-Free
                    </div>
                  </div>
                  <div className="text-center p-4 sm:p-6 bg-white/50 rounded-xl backdrop-blur-sm hover:bg-white/70 transition-all duration-300">
                    <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1 sm:mb-2">
                      Ghana
                    </div>
                    <div className="text-sm sm:text-base text-gray-600">
                      Smallholder Women Farmers
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button className="px-5 sm:px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm sm:text-base font-medium">
                    Purchase in Bulk
                  </button>
                  <button className="px-5 sm:px-6 py-3 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 text-sm sm:text-base font-medium">
                    Watch Video
                  </button>
                </div>
              </div>

              <div
                className={`relative order-1 lg:order-2 transition-all duration-1000 animate-fade-in-right`}
              >
                <div className="relative z-10">
                  {/* Main Image Container */}
                  <div className="relative bg-gradient-to-br from-orange-100 to-amber-100 p-3 sm:p-4 lg:p-6 rounded-3xl shadow-2xl overflow-hidden">
                    <div className="relative overflow-hidden rounded-2xl">
                      <Image
                        src="/images/about.jpg"
                        alt="Ghanaian Women Farmers - Ehyen Foods Story"
                        width={500}
                        height={400}
                        className="w-full h-56 sm:h-72 lg:h-96 object-cover transition-transform duration-700 hover:scale-110"
                      />
                      {/* Image Overlay with Ghana Colors */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                      {/* Ghana Flag Inspired Badge */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-4 bg-red-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-yellow-500 rounded-sm"></div>
                            <div className="w-2 h-4 bg-green-600 rounded-sm"></div>
                          </div>
                          <span className="text-xs font-semibold text-gray-700">
                            Made in Ghana
                          </span>
                        </div>
                      </div>

                      {/* Women Farmers Badge */}
                      <div className="absolute bottom-4 right-4 bg-orange-500/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                        <div className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span className="text-xs font-semibold text-white">
                            Supporting Women
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Natural Ingredients Indicator */}
                    <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-80 animate-pulse flex items-center justify-center">
                      <svg
                        className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {/* Sustainability Element */}
                    <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-70 animate-float flex items-center justify-center">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Authentic Story Caption */}
                  <div className="mt-4 text-center bg-white/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg">
                    <p className="text-sm sm:text-base text-gray-700 font-medium">
                      &ldquo;Empowering smallholder women farmers across rural
                      Ghana&rdquo;
                    </p>
                    <div className="flex justify-center items-center mt-2 space-x-4">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">
                          100% Natural
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">
                          Sustainable
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">Impactful</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section
          id="products"
          className="relative overflow-hidden bg-gradient-to-br from-[#fffaf0] via-[#fefae0] to-[#faf0dc]"
        >
          {/* Section Header */}
          <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16 sm:mb-20"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#a0522d] mb-6 font-serif leading-tight">
                Our{" "}
                <span className="text-transparent bg-gradient-to-r from-[#a0522d] to-[#8b4513] bg-clip-text">
                  Premium Collection
                </span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-[#6b4423] max-w-4xl mx-auto leading-relaxed px-4">
                Discover nature&apos;s finest spices, carefully sourced from
                around the world. Each spice tells a story of tradition,
                quality, and authentic flavor.
              </p>
            </motion.div>
          </div>

          {/* Dynamic Product Sections */}
          {spices.map((spice, index) => {
            const isEven = index % 2 === 0;
            const ProductSection = () => {
              const ref = useRef(null);
              const isInView = useInView(ref, {
                once: true,
                margin: "-100px",
              });

              return (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: isEven ? -100 : 100 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: "easeOut",
                  }}
                  className={`min-h-screen flex items-center justify-center py-16 sm:py-20 ${
                    isEven
                      ? "bg-gradient-to-r from-[#fffaf0] to-[#fefae0]"
                      : "bg-gradient-to-r from-[#fefae0] to-[#fffaf0]"
                  }`}
                >
                  <div className="container mx-auto px-4 sm:px-6">
                    <div
                      className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                        isEven ? "lg:grid-flow-col" : "lg:grid-flow-col-dense"
                      }`}
                    >
                      {/* Product Image */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={
                          isInView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.8 }
                        }
                        transition={{
                          duration: 0.8,
                          delay: 0.4,
                          ease: "easeOut",
                        }}
                        className={`relative order-1 ${
                          isEven ? "lg:order-1" : "lg:order-2"
                        }`}
                      >
                        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-700">
                          <div className="relative h-80 sm:h-96 lg:h-[500px] overflow-hidden">
                            <Image
                              src={spice.image}
                              alt={spice.name}
                              fill
                              className="object-cover transition-transform duration-700 hover:scale-110"
                              sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                            {/* Organic Badge */}
                            {spice.organic && (
                              <div className="absolute top-6 left-6 bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                                100% Organic
                              </div>
                            )}

                            {/* Origin Badge */}
                            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm text-[#a0522d] text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                              {spice.origin}
                            </div>
                          </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#a0522d]/20 to-[#8b4513]/20 rounded-full animate-float"></div>
                        <div
                          className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-[#f4a460]/20 to-[#daa520]/20 rounded-full animate-float"
                          style={{ animationDelay: "2s" }}
                        ></div>
                      </motion.div>

                      {/* Product Content */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                          isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 30 }
                        }
                        transition={{
                          duration: 0.8,
                          delay: 0.6,
                          ease: "easeOut",
                        }}
                        className={`order-2 ${
                          isEven ? "lg:order-2" : "lg:order-1"
                        }`}
                      >
                        <div className="space-y-6 sm:space-y-8">
                          <div>
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#a0522d] mb-4 font-serif leading-tight">
                              {spice.name}
                            </h3>
                            <p className="text-lg sm:text-xl lg:text-2xl text-[#6b4423] leading-relaxed">
                              {spice.description}
                            </p>
                          </div>

                          {/* Health Benefits */}
                          <div className="space-y-4">
                            <h4 className="text-xl font-semibold text-[#a0522d]">
                              Health Benefits:
                            </h4>
                            <div className="flex flex-wrap gap-3">
                              {spice.benefits.map((benefit, idx) => (
                                <motion.span
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={
                                    isInView
                                      ? { opacity: 1, scale: 1 }
                                      : { opacity: 0, scale: 0.8 }
                                  }
                                  transition={{
                                    duration: 0.5,
                                    delay: 0.8 + idx * 0.1,
                                    ease: "easeOut",
                                  }}
                                  className="text-sm bg-[#f4a460]/20 text-[#8b4513] px-4 py-2 rounded-full border border-[#daa520]/30"
                                >
                                  {benefit}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          {/* Call to Action */}
                          <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={
                              isInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 20 }
                            }
                            transition={{
                              duration: 0.6,
                              delay: 1.0,
                              ease: "easeOut",
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-[#a0522d] to-[#8b4513] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                          >
                            Purchase in Bulk
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            };

            return <ProductSection key={spice.name} />;
          })}

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-20 bg-gradient-to-r from-[#a0522d] to-[#8b4513]"
          >
            <div className="container mx-auto px-4 sm:px-6 text-center">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 font-serif">
                  Experience the Difference
                </h3>
                <p className="text-xl sm:text-2xl text-white/90 mb-8 leading-relaxed">
                  Our spices are more than ingredients – they&apos;re a gateway
                  to authentic flavors and culinary traditions from around the
                  world.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-white text-[#a0522d] font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl"
                >
                  Discover Our Story
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-20 bg-gradient-to-br from-orange-50 to-amber-50 relative overflow-hidden"
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-serif">
                What Our{" "}
                <span className="text-transparent bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text">
                  Customers Say
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Don&apos;t just take our word for it. Here&apos;s what our
                valued customers have to say about their experience with Ehyen
                Foods.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center mb-6">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-600 leading-relaxed italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-orange-50 relative overflow-hidden"
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="animate-fade-in-left order-2 lg:order-1">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 font-serif leading-tight">
                  Get In{" "}
                  <span className="text-transparent bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text">
                    Touch
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Have questions about our products? Want to become a wholesale
                  partner? Or simply want to share your culinary creations?
                  We&apos;d love to hear from you!
                </p>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm sm:text-base">
                        Phone
                      </div>
                      <div className="text-gray-600 text-sm sm:text-base">
                        +1 (555) 123-4567
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm sm:text-base">
                        Email
                      </div>
                      <div className="text-gray-600 text-sm sm:text-base">
                        hello@ehyenfoods.com
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm sm:text-base">
                        Address
                      </div>
                      <div className="text-gray-600 text-sm sm:text-base">
                        123 Spice Street, Flavor City, FC 12345
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-fade-in-right order-1 lg:order-2">
                <form
                  onSubmit={handleFormSubmit}
                  className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      placeholder="john.doe@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Question">Product Question</option>
                      <option value="Wholesale Partnership">
                        Wholesale Partnership
                      </option>
                      <option value="Customer Support">Customer Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base"
                      placeholder="Tell us how we can help you..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Image
                  src="/images/ehyen.jpg"
                  alt="Ehyen Foods"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <h3 className="text-2xl font-bold font-serif">Ehyen Foods</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Bringing authentic flavors from around the world to your
                kitchen. Premium quality spices for passionate cooks.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-orange-100 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Image
                    src="/images/Facebook.svg"
                    alt="Facebook"
                    width={20}
                    height={20}
                    className="w-5 h-5 sm:w-6 sm:h-6 hover:opacity-80 transition-opacity duration-300"
                  />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-blue-50 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Image
                    src="/images/Twitter.svg"
                    alt="Twitter"
                    width={20}
                    height={20}
                    className="w-5 h-5 sm:w-6 sm:h-6 hover:opacity-80 transition-opacity duration-300"
                  />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-pink-50 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Image
                    src="/images/instagram.svg"
                    alt="Instagram"
                    width={20}
                    height={20}
                    className="w-5 h-5 sm:w-6 sm:h-6 hover:opacity-80 transition-opacity duration-300"
                  />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-green-50 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Image
                    src="/images/whatsapp.svg"
                    alt="WhatsApp"
                    width={20}
                    height={20}
                    className="w-5 h-5 sm:w-6 sm:h-6 hover:opacity-80 transition-opacity duration-300"
                  />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Image
                    src="/images/YouTube.svg"
                    alt="YouTube"
                    width={20}
                    height={20}
                    className="w-5 h-5 sm:w-6 sm:h-6 hover:opacity-80 transition-opacity duration-300"
                  />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#home"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Product Categories</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Whole Spices
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Ground Spices
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Spice Blends
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Organic Collection
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Gift Sets
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Customer Care</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Return Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300 mb-4 md:mb-0">
                &copy; 2024 Ehyen Foods. All rights reserved. Made with ❤️ for
                spice lovers.
              </p>
              <div className="flex items-center space-x-6">
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50"
        aria-label="Back to top"
      >
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* Custom CSS for animations and clip paths */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }

        .card-hover {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .clip-hexagon {
          clip-path: polygon(
            25% 0%,
            75% 0%,
            100% 50%,
            75% 100%,
            25% 100%,
            0% 50%
          );
        }

        .clip-diamond {
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
        }

        .clip-star {
          clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 70%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%
          );
        }

        .clip-pentagon {
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
        }

        .clip-circle {
          clip-path: circle(50% at 50% 50%);
        }

        .clip-triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .particles {
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(
            circle,
            rgba(249, 115, 22, 0.6),
            rgba(239, 68, 68, 0.3)
          );
          border-radius: 50%;
        }

        .particle-1 {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
          animation-duration: 8s;
        }
        .particle-2 {
          top: 20%;
          left: 80%;
          animation-delay: 1s;
          animation-duration: 10s;
        }
        .particle-3 {
          top: 60%;
          left: 20%;
          animation-delay: 2s;
          animation-duration: 9s;
        }
        .particle-4 {
          top: 80%;
          left: 70%;
          animation-delay: 3s;
          animation-duration: 7s;
        }
        .particle-5 {
          top: 30%;
          left: 60%;
          animation-delay: 4s;
          animation-duration: 11s;
        }
        .particle-6 {
          top: 70%;
          left: 90%;
          animation-delay: 5s;
          animation-duration: 8s;
        }
        .particle-7 {
          top: 15%;
          left: 40%;
          animation-delay: 6s;
          animation-duration: 9s;
        }
        .particle-8 {
          top: 85%;
          left: 15%;
          animation-delay: 7s;
          animation-duration: 10s;
        }
        .particle-9 {
          top: 40%;
          left: 85%;
          animation-delay: 8s;
          animation-duration: 7s;
        }
        .particle-10 {
          top: 65%;
          left: 45%;
          animation-delay: 9s;
          animation-duration: 8s;
        }
        .particle-11 {
          top: 25%;
          left: 25%;
          animation-delay: 10s;
          animation-duration: 9s;
        }
        .particle-12 {
          top: 75%;
          left: 75%;
          animation-delay: 11s;
          animation-duration: 10s;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Home;
