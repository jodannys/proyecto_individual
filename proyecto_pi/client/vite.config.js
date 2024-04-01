// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde el archivo .env

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env // Hace que las variables de entorno estén disponibles en tu aplicación
  }
});

