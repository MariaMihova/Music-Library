import { render, html } from "../node_modules/lit-html/lit-html.js";
import { repeat } from "../node_modules/lit-html/directives/repeat.js";
import { main } from "./utils/domElements.js";
import { renderNavBar } from "./utils/navBar.js";
import { get } from "./api/api.js";

const url = "data/albums?sortBy=_createdOn%20desc";

const pageContentItems = (data) => html`<section id="dashboard">
  <h2>Albums</h2>
  <ul class="card-wrapper">
    <!-- Display a li with information about every post (if any)-->
    ${repeat(
      data,
      (d, _ownerId) => html`<li class="card">
        <img src=${d.imageUrl} alt="travis" />
        <p>
          <strong>Singer/Band: </strong><span class="singer">${d.singer}</span>
        </p>
        <p>
          <strong>Album name: </strong><span class="album">${d.album}</span>
        </p>
        <p><strong>Sales:</strong><span class="sales">${d.sales}</span></p>
        <a class="details-btn" href="/details/${d._id}">Details</a>
      </li>`
    )}
  </ul>
</section>`;

const pageContentNoItems = () => html`<section id="dashboard">
  <h2>Albums</h2>
  <h2>There are no albums added yet.</h2>
</section>`;

export async function showDashboard() {
  renderNavBar();
  try {
    const data = await get(url);
    console.log(data);
    render(
      data.length > 0 ? pageContentItems(data) : pageContentNoItems(),
      main
    );
  } catch (err) {
    alert("Unable to load dashboard resources");
  }
}
