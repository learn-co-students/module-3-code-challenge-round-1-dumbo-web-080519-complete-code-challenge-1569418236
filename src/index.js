document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3460 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imgTag = document.querySelector("#image")

  const likeButton = document.querySelector("#like_button")
  let numLikes = document.querySelector("#likes")
  const commentForm = document.querySelector("#comment_form")
  const commentUl = document.querySelector("#comments")
  
  fetch(imageURL)
  .then(res => res.json())
  .then(res => {
    const imgName = document.querySelector("#name")
    res.comments.forEach(comment => {
      // debugger
      const commentInput = document.querySelector("#comment_input")
      const commentLi = document.createElement("li")
      const commentContent = comment.content
      commentLi.innerText = commentContent
      commentUl.append(commentLi)

      imgName.innerText = res.name
      imgTag.dataset.id = imageId
      imgTag.src = res.url
      numLikes.innerText = res.like_count
    })

    // debugger
  })
  
  likeButton.addEventListener("click", function(e){
    // debugger
    let currentLikes = parseInt(numLikes.innerText, 10)
    let newLikes = currentLikes + 1
    numLikes.innerText = newLikes
    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })

  })

  commentForm.addEventListener("submit", function(e){
    e.preventDefault()
    const commentInput = document.querySelector("#comment_input")
    const commentLi = document.createElement("li")
    const commentContent = commentInput.value
    commentLi.innerText = commentContent
    commentUl.append(commentLi)
    // debugger

    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentContent
      })
    })
  })
})

