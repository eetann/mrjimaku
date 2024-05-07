import React from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

function main() {
  const url = location.href;
  if (!(url.match("watch"))) {
    return;
  }

  const container = document.createElement("div");
  container.id = "mrjimaku-root";
  const shadowRoot = container.attachShadow({ mode: "open" });

  const timer = setInterval(injectContent,1000);
  setTimeout(() => clearInterval(timer), 10000);

  function injectContent() {
    const anchor = document.querySelector("#bottom-row");
    if (!anchor) {
      return;
    }
    clearInterval(timer);
    anchor.before(container);
    const root = createRoot(shadowRoot);
    root.render(
      <React.StrictMode>
        <p>shado?</p>
        {/* <App /> */}
      </React.StrictMode>,
    )
  }
}
main()
