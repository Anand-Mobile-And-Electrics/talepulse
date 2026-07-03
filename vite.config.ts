export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000, // increase limit
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});