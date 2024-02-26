/** @type {import('next').NextConfig} */

module.exports = {
  output: 'standalone',
}

// const nextConfig = {
//   reactStrictMode: false,
//   output: 'standalone',
//   // In our continued effort to improve self-hosting Next.js,
//   // we are stabilizing our experimental outputStandalone: true config to output: 'standalone'.
//   // This config reduces deployment sizes drastically by only including necessary files/assets,
//   //  including removing the need for installing all of node_modules in the built deployment package.
//   // This config can be seen in action in our with-docker example.
//   typescript: {
//     ignoreBuildErrors: true,
//   },
// }
