import { put, get } from "./api/api.js";
import { render, html } from "../node_modules/lit-html/lit-html.js";
import { main } from "./utils/domElements.js";
import { renderNavBar } from "./utils/navBar.js";

const url = `data/albums/`;
let contex;
let product;
const pageContent = (data) => html`<section id="edit">
<div class="form" @submit=${onSubmit}>
  <h2>Edit Album</h2>
  <form class="edit-form">
    <input
      type="text"
      name="singer"
      id="album-singer"
      value=${data.singer}
    />
    <input type="text" name="album" id="album-album" value=${data.album} />
    <input
      type="text"
      name="imageUrl"
      id="album-img"
      value=${data.imageUrl}
    />
    <input
      type="text"
      name="release"
      id="album-release"
      value=${data.release}
    />
    <input type="text" name="label" id="album-label" value=${data.label} />
    <input type="text" name="sales" id="album-sales" value=${data.sales} />

    <button type="submit">post</button>
  </form>
</div>
</section>
</section>`;
export async function editItem(ctx) {
  renderNavBar();
  contex = ctx;
  product = await get(url + ctx.params.id);
  console.log(ctx.params.id);
  console.log(product._id);
  render(pageContent(product), main);
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
    put(url + product._id, data);
    contex.page.redirect("/details/" + product._id);
  } catch (err) {
    alert("Unsuccssesful edit");
    return;
  }
}
