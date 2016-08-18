const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');

$(document).ready(() => {
  $(".follow-toggle").each((index, el) => {
    new FollowToggle(el);
  });

  $(".users-search").each((index, user) => {
    new UsersSearch(user);
  });
  $(".tweet-compose").each((index, el) => {
    new TweetCompose(el);
  });

}
);
