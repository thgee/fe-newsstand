import { header } from "./components/header/header.js";
import { addSubscribe } from "./components/subscription/addsubscription.js";
import { removeSubscribe } from "./components/subscription/removeSubscription.js";
import { initRollingBar } from "./components/rollingBar/rollingBar.js";
import { setView, viewSwitch } from "./components/viewSwitch/viewSwitch.js";

header();
setView();
viewSwitch();
addSubscribe();
removeSubscribe();
initRollingBar();
