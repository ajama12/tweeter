/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  let start = Date.now();
  
  //make template
    const createTweetElement = (tweet) => {
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
          ${tweet.content.text}
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
  
  //make tweetbox for tweet
    const renderTweets = (data) => {
      tweetsContainer.empty();
      console.log("Date.now", Date.now() - start);
  
      data.forEach((tweet) => {
        tweetsContainer.append(createTweetElement(tweet));
      });
    };
  
    const area = $("#tweet-text");
  
  //submit tweet
    const submitNewTweet = (area) => {
      const config = {
        method: "POST",
        url: "/tweets",
        data: textArea.serialize(),
        success: (tweet) => {
          console.log("Successfully submitted tweet!", tweet);
          loadTweet();
          area.val("");
        },
        error: (error) => {
          console.log("Error", error);
        },
      };
      $.ajax(config);
    };
  
  //submit new tweet
    $("form").submit((event) => {
      event.preventDefault();
      submitTweet(area);
      console.log(start);
    });
  
  //render tweets into boxes
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
  
  //load preexisting tweets
    loadTweet();
    console.log(Date.now());
  
  });