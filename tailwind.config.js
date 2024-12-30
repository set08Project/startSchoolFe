/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
  	extend: {
  		screens: {
  			brk: '375px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [
    // require("flowbite/plugin")
    require("daisyui"),
      require("tailwindcss-animate")
],

  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
