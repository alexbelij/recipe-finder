"use strict";

$(window).ready(() => {
  const favorites = localStorage.getObj("favorites");
  favorites.forEach(item => {
    $(".selection.list").append(`
    <div class="item">
          <div class="detail">
            <img
              class="ui thumbnail rounded image"
              src="${item.thumbnail}"
            />
            <div class="content">
              <div class="header">${item.title}</div>
              <p class="ingredients"><em>ingredients:</em> ${item.ingredients}</p>
              <a href="${item.href}" target="blank">More Info</a>
            </div>
          </div>
          <button class="ui button removeButton circular">
            Remove
          </button>
        </div>
        <div class="ui divider"></div>
    `);
  });

  $("span.favorite-count").text(favorites.length);
  $(".removeButton").click(e => {
    const link = $(e.target)
      .parent()
      .find("a")
      .attr("href");
    // remove the item from localstorage, cuz it's the second time's click
    const filteredFavourites = myFavorites().filter((value, index, array) => {
      return value.href !== link;
    });
    // localStorage.removeItem("favorites");
    localStorage.setObj("favorites", filteredFavourites);

    location.reload();
  });
});
