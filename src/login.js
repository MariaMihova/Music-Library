import { render, html } from "../node_modules/lit-html/lit-html.js";
import { main } from "./utils/domElements.js";
import { renderNavBar } from "./utils/navBar.js";
import { post } from "./api/api.js";

const url = "users/login";
let context;
const pageContent = () => html`<section id="login">
  <div class="form" @submit=${onSubmit}>
    <h2>Login</h2>
    <form class="login-form">
      <input type="text" name="email" id="email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <button type="submit">Login</button>
      <p class="message">
        Not registered? <a href="/register">Create an account</a>
      </p>
    </form>
  </div>
</section>`;

export function showLogin(ctx) {
  renderNavBar();
  context = ctx;
  render(pageContent(), main);
}

async function onSubmit(event) {
  event.preventDefault();

  console.log(event.target);
  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;

  if (!email || !password) {
    alert("Fields can not be empty.");
    return;
  }

  try {
    const data = await post(url, { email, password });
    sessionStorage.setItem("userData", JSON.stringify(data));
    context.page.redirect("/dashboard");
  } catch (err) {
    alert("Unsuccssesful login");
    return;
  }
}
