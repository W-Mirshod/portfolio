import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "icon.icepanel.io" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "docs.pytest.org" },
      { protocol: "https", hostname: "docs.celeryq.dev" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "cursor.sh" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
    ],
  },
};

export default nextConfig;
