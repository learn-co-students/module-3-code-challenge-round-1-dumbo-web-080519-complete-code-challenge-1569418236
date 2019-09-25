document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3461 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  const imgElement = document.querySelector('#image')
  const imgTitleh4 = document.querySelector("#name")
  const likeCountSpan = document.querySelector("#likes")
  const commentsUL = document.querySelector("#comments")
  const likeButton = document.querySelector("#like_button")
  // Use the data from the API response to change what's currently on the page (take a look at the already provided `index.html`). You will need to add/update:
  //
  // - the image url
  // - the image name
  // - the number of likes
  // - any comments in an unordered list

  fetch(imageURL)
  .then(res => res.json())
  .then(data => {
    imgElement.src = data.url
    imgTitleh4.innerText = `${data.name}`
    likeCountSpan.innerText = `${data.like_count}`

    commentsUL.innerHTML += `
    <li>${data.comments.content}</li>
    `
    // console.log(data)
  })

  // ## Step 2 - Like Feature (Frontend)
  //
  // The next feature to approach is the functionality to add likes to a picture. First, get this working in the browser only without worrying about persistence.
  //
  // Clicking the 'Like' button should increase the number of likes shown on the page by one.
  //
  // A user can like the same picture multiple times.
likeButton.addEventListener("click", function(evt) {
  console.log("Like Button done been clicked!");
  fetch(imageURL)
  .then(res => res.json())
  .then(data => {
  likeCountSpan.innerText = parseInt(`${data.like_count + 1}`)
  })

//   fetch(`https://randopic.herokuapp.com/likes/${imageId}`)
//     method: "POST",
//     header: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: { image_id: (imageId) }
//
})
})
