import { render, html } from "../node_modules/lit-html/lit-html.js";
import { main } from "./utils/domElements.js";
import { renderNavBar } from "./utils/navBar.js";
import { get } from "./api/api.js";

const url = "data/albums/";
const pageContent = (data) => html`<section id="details">
  <div id="details-wrapper">
    <p id="details-title">Album Details</p>
    <div id="img-wrapper">
      <img src=${data.imageUrl} />
    </div>
    <div id="info-wrapper">
      <p>
        <strong>Band:</strong><span id="details-singer">${data.singer}</span>
      </p>
      <p>
        <strong>Album name:</strong
        ><span id="details-album">${data.album}</span>
      </p>
      <p>
        <strong>Release date:</strong
        ><span id="details-release">${data.release}</span>
      </p>
      <p>
        <strong>Label:</strong><span id="details-label">${data.label}</span>
      </p>
      <p>
        <strong>Sales:</strong><span id="details-sales">${data.sales}</span>
      </p>
    </div>
    <div id="likes">Likes: <span id="likes-count">0</span></div>

    <!--Edit and Delete are only for creator-->

    <div id="action-buttons">
      ${sessionStorage.getItem("userData") &&
      data._ownerId != sessionStorage.getItem("userId")
        ? html`<a href="/like/${data._id}" id="like-btn">Like</a>`
        : ""}
      ${data._ownerId == sessionStorage.getItem("userId")
        ? html` <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a href="/delete/${data._id}" id="delete-btn">Delete</a>`
        : ""}
    </div>
  </div>
</section>`;
//<a href="/like/${data._id}" id="like-btn">Like</a>
export async function showDetails(ctx) {
  renderNavBar();
  try {
    const data = await get(url + ctx.params.id);

    render(pageContent(data), main);
  } catch (err) {
    alert("Profuct not found!");
    ctx.page.redirect("/dashboard");
  }
}
