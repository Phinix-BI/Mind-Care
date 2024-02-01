import withMT from "@material-tailwind/html/utils/withMT";
import flowbitePlugin from 'flowbite/plugin';
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // 'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin// Add Flowbite as a plugin
  ],
});