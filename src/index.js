document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3459 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

let imagesrc = document.getElementById("image")
let imageName = document.getElementById("name")
let likesElem = document.getElementById("likes")
let commentUL = document.getElementById("comments")
let likeButton = document.getElementById("like_button")
let commentForm = document.getElementById("comment_form")
let textBox = document.getElementById("comment_input")

fetch(imageURL)
.then(r => r.json())
.then(function(data){
  console.log(data)
  imagesrc.src = data.url
  imageName.innerText = data.name
  likesElem.innerText = data.like_count
  data.comments.forEach(function(comment){
    commentUL.innerHTML += `
    <li data-id= ${comment.id}>${comment.content}</li>
    `
    console.log(comment.id)
  })//end of .then
})//end of fetch image


//end of step 1

likeButton.addEventListener('click', () => {
  numoflikes = parseInt(likesElem.innerText)
  numoflikes += 1
  likesElem.innerText = numoflikes
  likedElem = parseInt(likesElem.innerText)

//end of step 2


  fetch(likeURL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      { image_id: imageId,
        like_count: likedElem}
    )//end of body
  })//end of fetch for likes

})// end of eventlistener for likes

// end of step 3

commentForm.addEventListener('submit',(e) => {

  e.preventDefault()

  commentUL.innerHTML += `
  <li>${textBox.value}</li>
  `
  newcomm = textBox.value

  //end of step 4

  fetch(commentsURL, {
    method: 'POST',
    headers: {  'Accept': 'application/json',
      'Content-Type': 'application/json'},
    body: JSON.stringify(
      { image_id: imageId,
        content: newcomm}
    )
  })//end of fetch
textBox.value = ""

} )// end of comment creation

// // // end of step 5
})
