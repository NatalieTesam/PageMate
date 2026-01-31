import { dirname, resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        search: resolve(__dirname, "src/search.html"),
        list: resolve(__dirname, "src/list.html"),
        book: resolve(__dirname, "src/book.html")
      }
    }
  }
});
