export default {
  import(href) {
    const link = document.createElement("link");
    link.rel = "import";
    link.href = href;
    document.head.appendChild(link);
  },
  stylesheet(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
};
