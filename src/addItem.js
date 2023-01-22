import { render, html } from "../node_modules/lit-html/lit-html.js";
import { post } from "./api/api.js";
import { main } from "./utils/domElements.js";
import { renderNavBar } from "./utils/navBar.js";

const url = "data/albums";
let context;
const pageContent = () => html`<section id="create">
  <div class="form" @submit=${onSubmit}>
    <h2>Add Album</h2>
    <form class="create-form">
      <input
        type="text"
        name="singer"
        id="album-singer"
        placeholder="Singer/Band"
      />
      <input type="text" name="album" id="album-album" placeholder="Album" />
      <input
        type="text"
        name="imageUrl"
        id="album-img"
        placeholder="Image url"
      />
      <input
        type="text"
        name="release"
        id="album-release"
        placeholder="Release date"
      />
      <input type="text" name="label" id="album-label" placeholder="Label" />
      <input type="text" name="sales" id="album-sales" placeholder="Sales" />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export function showCreateItem(ctx) {
  renderNavBar();
  context = ctx;
  render(pageContent(), main);
}

async function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const data = Object.fromEntries(formData);

  for (let d in data) {
    if (data[d] === "") {
      alert("All fields must be filled");
      return;
    }
  }

  try {
    post(url, data);
    context.page.redirect("/dashboard");
  } catch (err) {
    alert("Not created");
    return;
  }
}
