// 앱(Capacitor) 빌드(CAPACITOR_BUILD=true)에서만 정적 export 로 전환한다. 웹(Vercel) 빌드는 이전과 동일.
const isAppBuild = process.env.CAPACITOR_BUILD === "true";

/** @type {import('next').NextConfig} */
const nextConfig = isAppBuild
  ? {
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
      env: { NEXT_PUBLIC_APP_BUILD: "true" },
    }
  : {};

export default nextConfig;
