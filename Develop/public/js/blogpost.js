var replyButton = document.querySelector("#reply");

replyButton.addEventListener("click", function (event) {
  document.location.replace(`/single-blogpost/${event.target.dataset.blogid}`);
  //console.log(`${event.target.dataset.blogid}`);
});