const showError = () => {
  $(".error").append(`
  <div class="ui negative message">
    <i class="close icon"></i>
    <div class="header">
      Please one or more item(s) in the input field
    </div>
  </div>
  `);

  $(".close").click(() => {
    $(".ui.negative.message").hide();
  });

  // hide error after 2.5 seconds
  setTimeout(() => {
    $(".ui.negative.message").hide();
  }, 2500);

  return null;
};

const showWarning = input => {
  $(".recipes").append(`
<h2 class="ui message warning">No recipes found for your searched item(s)- ${input}</h2>
`);
  return null;
};
