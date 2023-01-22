import { get } from "./api/api.js";

const url = "users/logout";

export function logout(ctx) {
  get(url);
  sessionStorage.removeItem("userData");
  sessionStorage.removeItem("sesstionToken");
  sessionStorage.removeItem("userId");
  // sessionStorage.clear();
  ctx.page.redirect("/dashboard");
}
