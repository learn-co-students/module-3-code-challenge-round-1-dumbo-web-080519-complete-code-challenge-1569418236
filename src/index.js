document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  // https://randopic.herokuapp.com/images/3446
  let imageId = 3446
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const container = document.querySelector("#image_content")
  const likeButton = document.querySelector("#like_button")
  const likesTag = document.querySelector("#likes")
  const form = document.querySelector("#comment_form")
  const commentList = document.querySelector("#comments")


  
  fetch(imageURL)
    .then(res => res.json())
    .then(imageObject => {
      let imgTag = container.querySelector("#image")
      let nameTag = container.querySelector("#name")

      imgTag.src = imageObject.url
      imgTag.alt = `A picture named: "${imageObject.name}"`
      nameTag.innerText = imageObject.name
      likesTag.innerText = imageObject.like_count
      likeButton.dataset.id = imageObject.id
      form.dataset.id = imageObject.id
      
      imageObject.comments.forEach( comment=> {
        slapComment(comment)
      })

    })


    likeButton.addEventListener("click", (evt) => {
      let id = likeButton.dataset.id
      let newLikes = parseInt(likesTag.innerText) + 1
      likesTag.innerText = newLikes

      let likeData = {
        image_id: id
      }
      let fetchData = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(likeData)
      }

      fetch(likeURL, fetchData)
        // Optimistic rendering, leave blank. Note: feels wrong
    })


    form.addEventListener("submit", (evt) => {
      evt.preventDefault()
      let id = parseInt(evt.target.dataset.id)
      let commentElement = document.querySelector("#comment_input")
      let content = commentElement.value
      // grabbed value from comment_input above, safe to clear below
      commentElement.value = ""

      let commentData = {
        image_id: id,
        content: content
      }
      
      let fetchData = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
      }

        fetch(commentsURL, fetchData)
          .then(res => res.json())
          .then(commentObject => {
            //pessimistic rendering due to bonus
            slapComment(commentObject)
        })

    })

    commentList.addEventListener("click", (evt) => {
      if (evt.target.className == "delete_button") {
        let commentId = evt.target.dataset.id
        let liToDelete = evt.target.parentElement

        let fetchData = {
          method: "DELETE"
        }
        fetch(`https://randopic.herokuapp.com/comments/${commentId}`, fetchData)
          .then( () => {
            liToDelete.remove()
          })

      }
    })

    function slapComment(comment) {
      let li = document.createElement("li")
      li.innerText = comment.content
      commentList.append(li)

      // bonus stuff
      let deleteButton = document.createElement("button")
      // I know I'm not supposed to style like this, but the delete button
      // being close was bothering me
      deleteButton.style = "margin: 5px"
      deleteButton.innerText = "X"
      deleteButton.className = "delete_button"
      deleteButton.dataset.id = comment.id
      li.append(deleteButton)
    }
    
})