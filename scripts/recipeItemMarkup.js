"use strict";

const recipeItemMarkup = (item, isFav) => {
  return `
      <div class="ui card five wide column">
        <div class="content">
          <h2 class="header">${item.title}</h2>
          <h5>No. of Ingredients: ${item.ingredients.split(", ").length}</h5>
        </div>
        <div class="content">
          <div class="ui small feed">
            <div class="event">
              <div class="content">
                <img class="ui small rounded image" src="${item.thumbnail}" />
                <p>${item.thumbnail === "" ? "Thumbnail Not Available" : ""}</p>
              </div>
            </div>
            <div class="event">
              <div class="content">
                <div class="summary"><em><strong>Ingredients:</strong></em> ${
                  item.ingredients
                }</div>
              </div>
            </div>
          </div>
        </div>
        <div class="extra content">
          <a href="${
            item.href
          }" target="_blank"><button class="ui button">See Recipe</button></a>
          <button class="ui button likeButton">Add${
            isFav(item.href) ? "ed" : ""
          } To Favorites <i class="like icon
          ${isFav(item.href) ? "active" : ""}
          "></i></button>
        </div>
      </div>
      `;
};
