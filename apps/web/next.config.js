module.exports = {
  reactStrictMode: true,
  env: {
    INFURA_API_KEY: process.env.INFURA_API_KEY,
    INFURA_API_SECRET: process.env.INFURA_API_SECRET,
    INFURA_IPFS_ENDPOINT: process.env.INFURA_IPFS_ENDPOINT,
  },
  transpilePackages: ["ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eventsea.infura-ipfs.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
