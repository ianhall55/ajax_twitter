class FollowToggle {
  constructor(el, options){

    this.el = $(el);
    this.userId = this.getUserId(this.el) || options.userId;
    this.followState = (this.getfollowState(this.el) || options.followState);
    this.render();
    this.handleClick(this.el);
  }

  getUserId(){
    return this.el.attr("user-id");
  }

  getfollowState(el){
    return el.attr("initial-follow-state");

  }

  render(){
    if (this.followState === "unfollowed"){
      this.el.text('Follow!');
      this.el.prop("disabled", false);
    } else if (this.followState === "followed") {
      this.el.text('Unfollow!');
      this.el.prop("disabled", false);
    } else if (this.followState === "unfollowing") {
      this.el.text('Unfollowing');
      this.el.prop("disabled", true);
    } else {
      this.el.text('Following');
      this.el.prop("disabled", true);
    }
  }

  handleClick(el){

    el.on("click", event => {
      event.preventDefault();
      let that = this;

      if (this.followState === "unfollowed") {
        this.followState = "following";
      } else {
        this.followState = "unfollowing";
      }

      this.render();

      if (this.followState === "following"){
        $.ajax({
          url: `/users/${this.userId}/follow`,
          type: "POST",
          dataType: "json",
          success(follow) {
            that.followState = "followed";
            that.render();
          }
        });
      }

      else {
        $.ajax({
          url: `/users/${this.userId}/follow`,
          type: "DELETE",
          dataType: "json",
          success() {
            that.followState = "unfollowed";
            that.render();
          }
        });
      }
    });

  }

} //class end

module.exports = FollowToggle;
