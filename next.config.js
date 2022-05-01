/** @type {import('next').NextConfig} */

const dummyImageDomains = [
  "placeimg.com",
  "placekitten.com",
  "www.lorempixel.com",
  "dummyimage.com",
];

module.exports = {
  async redirects() {
    return [
      {
        source: '/.well-known/matrix/server',
        destination: '/.well-known/matrix/server.json',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  images: {
    domains: [
      ...dummyImageDomains,
      "avatars.githubusercontent.com"
    ],
  },
  eslint: {
    dirs: ["pages", "components"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
};
