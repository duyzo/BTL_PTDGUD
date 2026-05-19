import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "placehold.co" },

      { protocol: "https", hostname: "www.thebrickfan.com" },
      { protocol: "https", hostname: "thebrickblogger.com" },
      { protocol: "https", hostname: "media-cdn.brothers-brick.com" },
      { protocol: "https", hostname: "i.ebayimg.com" },
      { protocol: "https", hostname: "product.hstatic.net" },
      { protocol: "https", hostname: "cdn1.fahasa.com" },
      { protocol: "https", hostname: "dochoicholon.com" },
      { protocol: "https", hostname: "dochoitreem.com" },
      { protocol: "https", hostname: "images-na.ssl-images-amazon.com" },
      { protocol: "https", hostname: "hd1.hotdeal.vn" },
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "s.alicdn.com" },
      { protocol: "https", hostname: "cdn.hstatic.net" },
      { protocol: "https", hostname: "www.moby.com.vn" },
      { protocol: "https", hostname: "jola.vn" },
      { protocol: "https", hostname: "cdn.chus.vn" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "imgcdn.thitruongsi.com" },
      { protocol: "https", hostname: "tamiyavietnam.vn" },
      { protocol: "https", hostname: "gundamshop.vn" },
      { protocol: "https", hostname: "rcecho.com" },
      { protocol: "https", hostname: "xedapthongnhat.com.vn" },
      { protocol: "https", hostname: "sieuthixedap.com" },
      { protocol: "https", hostname: "gorobike.com" },
      { protocol: "https", hostname: "changagoidemsonghong.com" },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;