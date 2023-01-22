import { render, html } from "../node_modules/lit-html/lit-html.js";
import { main } from "./utils/domElements.js";
import { renderNavBar } from "./utils/navBar.js";

const pageContent = () => html`<section id="home">
  <img src="/images/landing.png" alt="home" />

  <h2 id="landing-text">
    <span>Add your favourite albums</span> <strong>||</strong>
    <span>Discover new ones right here!</span>
  </h2>
</section>`;

export function showHomePge() {
  renderNavBar();
  render(pageContent(), main);
}
