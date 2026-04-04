// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };
//

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.pexels.com',
                pathname: '/photo/**', // Matches all photo paths
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com', // Pexels often serves images from this subdomain
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
