/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const createTweetElement = (tweet) => {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    return `
    <div class="tweet-container">
      <header class="tweet-header">
        <span class="left-tweet-container">
          <img class="userImg" src=${tweet.user.avatars}/>
          <span class="userName">
            ${tweet.user.name}
          </span>
        </span>
        <span class="userId">
          ${tweet.user.handle}
        </span>
      </header>
      <p class="tweetInfo">
      ${escape(tweet.content.text)}
      </p>
      <footer class="tweet-footer">
        <span class="date">
          ${timeago.format(tweet.created_at)}
        </span>
        <span>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </span>
      </footer>
    </div>
    `;
  };

  const tweetsContainer = $(".tweets-container");

  const renderTweets = (data) => {
    tweetsContainer.empty();
    data.reverse();
    data.forEach((tweet) => {
      tweetsContainer.append(createTweetElement(tweet));
    });
  };

  const showError = (errorMessage) => {
    const errorMsg = `
      <p class="error">
        <i class="fa-solid fa-triangle-exclamation"></i></span>
        <span class="message">${errorMessage}</span>
        <i class="fa-solid fa-triangle-exclamation"></i>
      </p>
    `;
    $(".errorContainer").html(errorMsg).slideDown();

    setTimeout(() => {
      $(".errorContainer").slideUp();
    }, 5000);
  };

  $("form").submit((event) => {
    event.preventDefault();

    const textArea = $("#tweet-text");
    const tweetText = textArea.val().trim();

    if (tweetText === "" || tweetText.length > 140) {
      const errorMessage = tweetText === "" ? "Sorry, your tweet can't be blank!" : "Sorry, your tweet is over 140 characters!";
      showError(errorMessage);
      return;
    }

    const config = {
      method: "POST",
      url: "/tweets",
      data: textArea.serialize(),
      success: (tweet) => {
        console.log("Successfully submitted tweet!", tweet);
        loadTweet();
        textArea.val("");
        $(".counter").text(140);
      },
      error: (error) => {
        console.log("Error", error);
      },
    };
    $.ajax(config);
  });

  const loadTweet = () => {
    const config = {
      method: "GET",
      url: "/tweets",
      success: (tweets) => {
        console.log("Successfully retrieved!", tweets);
        renderTweets(tweets);
      },
      error: (error) => {
        console.log("Error", error);
      },
    };
    $.ajax(config);
  };

  loadTweet();
  console.log(Date.now());
});
