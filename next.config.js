const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
  //stop running useEffect twice in UseEffect dev mode
  reactStrictMode: false,
  env: {
    NEXTAUTH_SECRET: "sdjfkhfkjsdhfjk283324sdfy34859",
    API_URL: "https://recipyb-dev.herokuapp.com/api/v1/"
  },
  images: {
    domains: ["images.unsplash.com", "recipyb-dev.herokuapp.com"],
  },
  pwa: withPWA({
    dest: "public",
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com/,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-stylesheets",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 1 month
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com/,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-webfonts",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 1 month
          },
        },
      },
    ],
  }),
};

module.exports = nextConfig;
