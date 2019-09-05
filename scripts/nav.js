"use strict";

$(window).ready(() => {
  const nav = $("#nav");
  this.setInterval(() => {
    $("nav .button > span").text(myFavorites().length);
  }, 500);

  nav.append(`
  <nav class="ui secondary menu">
    <a class="${nav.attr("class") === "index" ? "active" : ""} item" href="/">
      Home
    </a>
    <a class="${
      nav.attr("class") === "favorites" ? "active" : ""
    } item" href="/favorites.html">
      Favorites
    </a>
    <a class="${
      nav.attr("class") === "about" ? "active" : ""
    } item" href="/about.html">
      About
    </a>

    <div class="right menu" style="${
      nav.attr("class") === "about" ? "display:none" : ""
    }">
      <div class="ui black button favorite-count"><i class="heart icon"></i><span></span></div>
    </div>

  </nav>
  <div class="ui divider"></div>
`);
});
