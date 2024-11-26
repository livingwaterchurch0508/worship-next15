import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig = withPWA({
  dest: "public", // PWA 파일이 생성될 위치
  register: true, // 서비스 워커 자동 등록
  skipWaiting: true, // 대기 중인 서비스 워커 즉시 활성화
  disable: process.env.NODE_ENV !== "production", // 개발 환경에서 PWA 비활성화
})({
  reactStrictMode: true,
  swcMinify: true,
}) as NextConfig;

export default nextConfig;
