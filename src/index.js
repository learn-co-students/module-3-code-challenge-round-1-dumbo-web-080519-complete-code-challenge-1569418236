document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3454 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let JSONify = (res) => res.json()
  let img = document.querySelector("#image")
  let imgName = document.querySelector("#name")
  let likes = document.querySelector('#likes')
  let comments = document.querySelector('#comments')
  //STEP 1
  fetch(imageURL)
    .then(JSONify)
    .then((Image) => {
      
      
      img.src = `${Image.url}`
      imgName.innerText = `${Image.name}`
      // comments.innerHTML += `<li src="${commentsURL} ${Image.comments} </li>`
      comments.innerHTML += `<li> "${commentsURL}"</li>` //COME BACK TO THIS
      
     
    })

})


let likesButton = document.querySelector("#like_button")

likesButton.addEventListener("click", (evt) => {
  console.log(evt.target)
  if(evt.target.tagName === "BUTTON"){
      let currentLikes = parseInt(evt.target.previousElementSibling.innerText) + 1
      let id = evt.target.id
      
  }
    fetch(imageURL,{
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        likes: currentLikes
      })
    })
    .then(JSONify)
    .then((likes) => {
      
      likes = currentLikes
    })

})
//SUBMIT FORM
let submitComment= document.querySelector('#comment_input')

submitComment.addEventListener("submit", (evt) => {
  evt.preventDefault()
  fetch(commentsURL, {
    method: "Post",
    headers: {
      "content-type" :"application/json"
    },
    body: JSON.stringify({
      comments: evt.target.comment
      
    })
    .then(JSONify)
    .then((newComment) => {
      comments.innerHTML += `<li data-id="${newCommnent.id}>${newComment}/li>`
      debugger
    })
    
  })
})