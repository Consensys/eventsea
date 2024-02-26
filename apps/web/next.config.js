module.exports = {
  reactStrictMode: true,
  env: {
    INFURA_API_KEY: process.env.INFURA_API_KEY,
    INFURA_API_SECRET: process.env.INFURA_API_SECRET,
  },
  transpilePackages: ["ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
        port: "",
        pathname: "/**",
      },
    ],
  },
};
