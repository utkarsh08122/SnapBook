/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
