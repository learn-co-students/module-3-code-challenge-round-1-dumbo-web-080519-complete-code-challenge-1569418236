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
    imgName.innerText = res.name
    imgTag.dataset.id = imageId
    imgTag.src = res.url
    numLikes.innerText = res.like_count
    res.comments.forEach(comment => {
      const commentInput = document.querySelector("#comment_input")
      const commentLi = document.createElement("li")
      const commentContent = comment.content
      commentLi.innerHTML = `${commentContent}   <button data-id="${comment.id}" class="delete">X</button>`
      commentUl.append(commentLi)

    })
  })
  
  likeButton.addEventListener("click", function(e){
    
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
    }).then(res => res.json())
      .then(res => {
        commentLi.innerHTML = `${commentContent}<button data-id="${res.id}" class="delete">X</button>`
        commentUl.append(commentLi)
      })
  })

  commentUl.addEventListener("click", function(e){
    if(e.target.className === "delete"){
      console.log("hi")
      fetch(`${commentsURL}/${e.target.dataset.id}`, {
        method: "DELETE"
      }).then(e.target.parentElement.remove())
    }
  })

})

