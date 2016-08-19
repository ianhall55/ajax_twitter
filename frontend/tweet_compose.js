class TweetCompose {
  constructor(el) {
    this.el = $(el);

    this.el.on("submit", event => {
      this.submit(event);
    });


    let $textarea = $("textarea");
    $textarea.on("input", e => {
      e.preventDefault();
      let $counter = $(".counter");
      let $ta = $("textarea");

      $counter.text(`${140 - $ta.val().length}`);
      if ($ta.val().length >= 140) {
        $ta.val($ta.val().slice(0, 140));
        $counter.text(`0`);
      }
    });

    $(".add-mentioned-user").on("click", e => {
      e.preventDefault();
      this.addMentionedUser(e);
    });


  }

  addMentionedUser(e) {
    let $script = (this.el.find("script"));
    let $select = $script.html();

    this.el.find(".mentioned").append($select);
    $(".remove-mentioned-user").on("click", ev => {

      e.preventDefault();
      this.removeMentionedUser(ev.currentTarget);
    });
  }

  removeMentionedUser(target) {

    $(target).parent().remove();
  }

  clearInput() {
    $("textarea").val("");
    $("select").val("");
    $(".mentioned").empty();
  }

  handleSuccess(tweet) {
    this.clearInput();
    $(":input").prop("disabled", false);
    let $feed = $("#feed");


    let $li = $(`<li>${tweet.content} -- <a href="/users/${tweet.user.id}">${tweet.user.username}</a> -- ${tweet.created_at}</li>`);
    tweet.mentions.forEach(function(el) {
      let $child = $(`<li><a href="/users/${el.user.id}">${el.user.username}</a></li>`);
      $li.append($child);
    });
    $feed.prepend($li);
  }



  submit(e) {
    e.preventDefault();
    let formData = this.el.serialize();
    let that = this;

    $(":input").prop("disabled", true);

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/tweets",
        data: formData,
        success(tweet) {
          that.handleSuccess(tweet);
        }
    });
  }

  // {"id":295,"content":"next","user_id":10,"created_at":"2016-08-18T22:27:56.800Z","updated_at":"2016-08-18T22:27:56.800Z","user":{"id":10,"username":"ian","password_digest":"$2a$10$x4osIolczsoTcPqsM/oH.e6TwiXPfizYtI.EdpX6qLZe3tW.WqvJe","session_token":"3xJyVMnqO2xLIo8dGrE0lQ","created_at":"2016-08-18T21:39:23.311Z","updated_at":"2016-08-18T21:39:23.334Z"},"mentions":[{"id":15,"tweet_id":295,"user_id":3,"created_at":"2016-08-18T22:27:56.803Z","updated_at":"2016-08-18T22:27:56.803Z","user":{"id":3,"username":"curie","password_digest":"$2a$10$AaC9cB3vDQ6WNxoUuc2BceYqj7X30oYty0cxCriKIwpjLkozS6KEu","session_token":"HMFL6e5Df1f31VdcXDD69A","created_at":"2016-08-18T17:11:15.015Z","updated_at":"2016-08-18T17:11:15.015Z"}}]}"




} //class

module.exports = TweetCompose;
