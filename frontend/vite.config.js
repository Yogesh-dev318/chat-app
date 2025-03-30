import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import daisyui from "daisyui"
import themes from "daisyui/theme/object";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  daisyui:{
    themes:[
      "light",
      "dark",
      "cupcake",
      "retro"
    ]
  }
});