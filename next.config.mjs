/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Allow video files served from /public */
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/blog-coming-soon",
        permanent: false,
      },
      {
        source: "/blog/:slug*",
        destination: "/blog-coming-soon",
        permanent: false,
      },
    ];
  }
};

export default nextConfig;
