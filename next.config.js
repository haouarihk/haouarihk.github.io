/** @type {import('next').NextConfig} */

const dummyImageDomains = [
  "placeimg.com",
  "placekitten.com",
  "www.lorempixel.com",
  "dummyimage.com",
];

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [...dummyImageDomains],
  },
  eslint: {
    dirs: ["pages", "components"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
};
