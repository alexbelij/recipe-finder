"use strict";

$(window).ready(() => {
  const input = $(".search input");
  const submitButton = $("button.submit");
  const dimmer = $(".ui.dimmer");
  let recipeRes;

  localStorage.setItem("currentPage", 1);

  const getItem = link => {
    let item;
    recipeRes.some(e => {
      if (e.href === link) {
        item = e;
      }
    });
    return item;
  };
  const getRecipes = (ingredients, pageNum) => {
    $.ajax({
      type: "GET",
      url: `http://www.recipepuppy.com/api/?i=${ingredients}&p=${
        !pageNum ? 1 : pageNum
      }`,
      jsonpCallback: "JSONCALLBACK", //specify callback name
      contentType: "application/json",
      dataType: "jsonp", //specify jsonp
      statusCode: {
        200: () => {
          // do something
        },
        301: () => {
          // do something
        },
        404: () => {
          // do something
        }
      },
      success: response => {
        console.log(response);
        dimmer.removeClass("active");
        if (response.results.length === 0) {
          $(".pagination-wrapper").hide();
          $(".recipes").append(`
            <h2 class="ui message warning">No recipes found for your searched item(s)- ${input.val()}</h2>
          `);
          return null;
        } else {
          $(".pagination-wrapper").show();
          recipeRes = response.results;
          $(".description").append(
            `
            <div class="ui divider"></div>
            <h2 class="description-header">Showing ${
              recipeRes.length
            } recipes for your search ingredients: ${input.val()}</h2>`
          );
          response.results.forEach(item => {
            $(".recipes").append(recipeItemMarkup(item, isFav));
          });

          const likeButton = $(".likeButton");
          likeButton.click(e => {
            const link = $(e.target)
              .parent()
              .find("a")
              .attr("href");

            if (
              !$(e.target)
                .children()
                .hasClass("active")
            ) {
              $(e.target).html(`
            Added To Favorites <i class="like active icon"></i>
            `);
              localStorage.setObj("favorites", [
                ...myFavorites(),
                getItem(link)
              ]);
            } else if (
              $(e.target)
                .children()
                .hasClass("active")
            ) {
              $(e.target).html(`
            Add To Favorites <i class="like icon"></i>
            `);

              // remove the item from localstorage, cuz it's the second time's click
              const filteredFavourites = myFavorites().filter(
                (value, index, array) => {
                  return value.href !== link;
                }
              );
              // localStorage.removeItem("favorites");
              localStorage.setObj("favorites", filteredFavourites);
            }
          });
        }
      },
      error: e => {
        console.log("error", e);
      }
    });
  };

  const handleSubmit = () => {
    if (!input.val()) {
      $(".error").append(`
      <div class="ui negative message">
      <i class="close icon"></i>
        <div class="header">
          Please one or more item(s) in the input field
        </div>
      </div>`);

      $(".close").click(() => {
        $(".ui.negative.message").hide();
      });

      setTimeout(() => {
        $(".ui.negative.message").hide();
      }, 2500);

      return null;
    }
    $(".description").html("");
    localStorage.setItem("currentPage", 1);
    $("#current").text("1");
    $(".recipes").html("");
    getRecipes(input.val());
    dimmer.addClass("active");
  };

  submitButton.click(() => {
    handleSubmit();
  });

  // Execute a function when the user releases a key on the keyboard
  input.on("keyup", event => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      handleSubmit();
    }
  });

  $("#previous").click(() => {
    if (!$("#previous").hasClass("disabled")) {
      $(".recipes").html("");
      getRecipes(input.val(), getCurrentPage() - 1);
      localStorage.setItem("currentPage", getCurrentPage() - 1);
      $("#current").text(getCurrentPage());
    }
    if (getCurrentPage() - 1 <= 0) {
      $("#previous").addClass("disabled");
    }
  });

  $("#next").click(() => {
    if (!$("#next").hasClass("disabled")) {
      $(".recipes").html("");
      getRecipes(input.val(), getCurrentPage() + 1);
      localStorage.setItem("currentPage", getCurrentPage() + 1);
      $("#current").text(getCurrentPage());
    }
    if (getCurrentPage() > 1) {
      $("#previous").removeClass("disabled");
    }
  });
});
