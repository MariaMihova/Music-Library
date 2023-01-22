import page from "../node_modules/page/page.mjs";

import { showHomePge } from "./home.js";
import { showDashboard } from "./dashboard.js";
import { showDetails } from "./details.js";
import { editItem } from "./edit.js";
import { deletItem } from "./delete.js";
// import { apply } from "./apply.js";
import { showCreateItem } from "./addItem.js";
import { logout } from "./logout.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
// import { notFound } from "./notFound.js";

page("/index.html", "/");
page("/", showHomePge);
page("/home", showHomePge);
page("/dashboard", showDashboard);
page("/details/:id", showDetails);
// page("/apply/:id", apply);
page("/delete/:id", deletItem);
page("/edit/:id", editItem);
page("/add", showCreateItem);
page("/logout", logout);
page("/login", showLogin);
page("/register", showRegister);
// page("*", notFound);

page.start();
