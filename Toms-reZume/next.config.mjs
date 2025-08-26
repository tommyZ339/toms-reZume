import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { fileURLToPath } from "url";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
  images: {
    domains: ["i.scdn.co"],
  }
};

export default withNextIntl(config);
