import { render, html } from "../node_modules/lit-html/lit-html.js";
import { main } from "./utils/domElements.js";
import { renderNavBar } from "./utils/navBar.js";
import { post } from "./api/api.js";

const url = "users/register";
let context;

const pageContent = () => html`<section id="register">
  <div class="form" @submit=${onSubmit}>
    <h2>Register</h2>
    <form class="login-form">
      <input type="text" name="email" id="register-email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
      />
      <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
      />
      <button type="submit">Register</button>
      <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
  </div>
</section>`;

export function showRegister(ctx) {
  renderNavBar();
  context = ctx;
  render(pageContent(), main);
}

async function onSubmit(event) {
  event.preventDefault();

  console.log(event.target);

  const email = event.target.querySelector("#register-email").value;
  const password = event.target.querySelector("#register-password").value;
  const rePass = event.target.querySelector("#repeat-password").value;

  console.log(email, password, rePass);

  if (!email || !password || !rePass) {
    alert("Fields can not be empty!");
    return;
  }

  if (password !== rePass) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const result = await post(url, { email, password });
    sessionStorage.setItem("userData", JSON.stringify(result));

    context.page.redirect("/dashboard");
  } catch (err) {
    alert("Unsuccssesful register!");
    return;
  }
}
