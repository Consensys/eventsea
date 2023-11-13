module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eventsea.infura-ipfs.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
