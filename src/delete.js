import { del } from "./api/api.js";

const url = "data/albums/";

export async function deletItem(ctx) {
  alert("are you sure you want to delite this item");
  try {
    const response = await del(url + ctx.params.id);
    // console.log(response);
    ctx.page.redirect("/dashboard");
  } catch (err) {
    console.log(err.message);
    alert("Item not deleted");
  }
}
