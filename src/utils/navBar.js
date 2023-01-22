import { render, html } from "../../node_modules/lit-html/lit-html.js";
import { nav } from "./domElements.js";

const user = () => html`<div><a href="/dashboard">Dashboard</a></div>

  <!-- Logged-in users -->
  <div class="user">
    <a href="/add">Add Album</a>
    <a href="/logout">Logout</a>
  </div>`;

const guest = () => html`<div><a href="/dashboard">Dashboard</a></div>
  <div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  </div>`;

export function renderNavBar() {
  render(sessionStorage.getItem("userData") !== null ? user() : guest(), nav);
}

{
  /* <div> 
<a href="#">Dashboard</a>
</div>

<!-- Logged-in users -->
<div class="user">
<a href="#">Add Album</a>
<a href="#">Logout</a>
</div>

<!-- Guest users -->
<div class="guest">
<a href="#">Login</a>
<a href="#">Register</a>
</div> */
}
