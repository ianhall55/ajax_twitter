const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor(el) {
    this.el = $(el);
    this.input = this.getInput();
    this.ul = this.getUl();
    this.addInputEvent();
  }

  getInput() {

    return this.el.find("input");
  }

  getUl() {
    return $(this.el.find("ul"));
  }

  addInputEvent() {
    let that = this;
    this.input.on("input", function(event) {
      event.preventDefault();

      let val = that.input.val();

      $.ajax({
        url: `/users/search`,
        type: "GET",
        data: {query: val},
        dataType: "json",
        success(users) {
          that.renderResults($(users));
        }
      });
    });
  }

  renderResults(users) {
    this.ul.children().remove();


    users.each( (idx, user) => {
      let $li = $(`<li><a href="/users/${user.id}">${user.username}</a></li>`);
      let $followTog = $(`<button class="follow-toggle"> </button></li>`);
      let followed;
      if (user.followed) {
        followed = "followed";
      } else {
        followed = "unfollowed";
      }
      let options = {userId: user.id, followState: followed};
      new FollowToggle($followTog, options);
      $li.append($followTog);
      this.ul.append($li);
      this.el.append(this.ul);
    });
  }


} //class

module.exports = UsersSearch;
