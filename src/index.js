document.addEventListener('DOMContentLoaded', () => {

  // NOTE: Using pessimistic rendering to add new comment on the page so
  // I can access the comment's id when I make the new comment li (for the bonus)

  // The code is still available to render optimistically if you would
  // like to confirm it works for the deliverables (just note that the
  // delete button will not persist the change in the backend).

  // To use the optimistic rendering, comment back in the function calls for
  // showCommentOnPage and addCommentInBackend on lines 53 and 54. Then comment out
  // the function call for renderCommentPessimistically on line 57.


  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

  let imageId = 3450; //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments/`;
  const imageLikes = document.querySelector("#likes");
  const commentsList = document.querySelector("#comments");

  fetch(imageURL)
  .then(res => res.json())
  .then(imageObj => displayImageInfo(imageObj));

  function displayImageInfo(image) {
    const theImage = document.querySelector("#image");
    theImage.src = image.url;
    theImage.dataset.id = image.id;

    const imageName = document.querySelector("#name");
    imageName.innerText = image.name;

    imageLikes.innerText = image["like_count"];

    image.comments.forEach(comment => showCommentOnPage(comment));

    const likeButton = document.querySelector("#like_button");
    likeButton.addEventListener("click", () => {
      addLikeOnPage();
      addLikeInBackend(image);
    });

    const commentForm = document.querySelector("#comment_form");
    commentForm.addEventListener("submit", e => {
      e.preventDefault();
      let commentInput = e.target.comment;
      let commentContent = commentInput.value;

      // Optimistically Render New Comment -- Pre-Bonus
      // showCommentOnPage(commentContent);
      // addCommentInBackend(image, commentContent);

      // Pessimistically Render New Comment -- For Bonus
      renderCommentPessimistically(image, commentContent)

      commentForm.reset();
    });

  };

  function showCommentOnPage(comment) {
    let li = document.createElement("li");

    // Ternary only necessary if optimistically rendering new contents on page
    li.innerText = (typeof comment === "string" ? comment : comment.content);
    commentsList.append(li);

    addDeleteButton(li, comment);
  };

  function addLikeOnPage() {
    let numLikes = parseInt(imageLikes.innerText);
    numLikes++;
    imageLikes.innerText = numLikes;
  };

  function addLikeInBackend(image) {
    fetch(likeURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        image_id: image.id
      })
    });
  };

  // Only necessary if optimistically rendering new comments on page
  function addCommentInBackend(image, commentContent) {
    fetch(commentsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        image_id: image.id,
        content: commentContent
      })
    });
  };

  function renderCommentPessimistically(image, commentContent){
    fetch(commentsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        image_id: image.id,
        content: commentContent
      })
    })
    .then(res => res.json())
    .then(showCommentOnPage)
  };


  function addDeleteButton(li, comment) {
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "x";
    li.append(deleteButton);

    deleteButton.addEventListener("click", e => {
      fetch(`${commentsURL}${comment.id}`, {
        method: "DELETE"
      })
      .then(() => li.remove())
    });
  };

});
