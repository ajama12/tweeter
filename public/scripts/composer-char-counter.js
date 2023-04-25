$(document).ready(function() {
  $("#tweet-text").on("keyup", function (event) {
    const maxCharacters = 140;
    const currentCount = $(this).val().length;
    const remainingCharCount = maxCharacters - currentCount;
    const counter = $(this).parent().find(".counter");
    counter.text(remainingCharCount);
    if (remainingCharCount < 0) {
      counter.css("color", "red");
    }

  });
});