document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  
  let imageId = 3447 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  let image = document.querySelector("#image")
  let likes = document.querySelector("#likes")
  let name = document.querySelector("#name")
  let commentsUl = document.querySelector("#comments")
  fetch(imageURL)
  .then(r => r.json())
  .then(imageObj => {
    image.src = imageObj.url
    name.innerText = imageObj.name
    likes.innerText = imageObj.like_count
    imageObj.comments.map(comment => {
      let commentLi = document.createElement("LI")
      let deleteBtn = addDeleteBtn(comment.id)
      commentLi.setAttribute("data-commentid", comment.id)
      commentLi.setAttribute("data-imageid",comment.image_id)
      commentLi.innerText = comment.content
      commentLi.append(deleteBtn)
      commentsUl.append(commentLi)
    })
  })

    function addDeleteBtn(commentId){
      const deleteBtn = document.createElement("BUTTON")
      deleteBtn.setAttribute("data-commentid", commentId)
      deleteBtn.setAttribute("class", "deleteComment")
      deleteBtn.innerText = "🧨"
      return deleteBtn
    }
    let likeBtn = document.querySelector("#like_button")
    likeBtn.addEventListener("click",(evt) =>{
      evt.preventDefault()
      // debugger
      fetch(likeURL,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image_id: imageId })
      })
      .then(r => r.json())
      .then(console.log)
      likes.innerText = parseInt(likes.innerText, 10) + 1
    })

    let commentForm = document.querySelector("#comment_form")
    commentForm.addEventListener("submit",(evt) => {
      evt.preventDefault()
      // debugger
      let newComment = evt.target.comment.value
      if (newComment === ""){return;}
      fetch(commentsURL,{
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          image_id: imageId,
          content: newComment
        })
      }).then(r => r.json())
      .then(newComment => {
        // comment out to do optimistic rendering
        let commentLi = document.createElement("LI")
        let deleteBtn = addDeleteBtn(newComment.id)
        commentLi.setAttribute("data-commentid",newComment.id)
        commentLi.setAttribute("data-imageid",newComment.image_id)
        commentLi.innerText = newComment.content
        commentLi.append(deleteBtn)
        commentsUl.append(commentLi)
      })
      // Uncomment for optimistic rendering
      // let commentLi = document.createElement("LI")
      // commentLi.innerText = newComment
      // comments.append(commentLi)
    })
    commentsUl.addEventListener("click",(evt) => {
        if (evt.target.className = "deleteComment"){
          let id = evt.target.dataset.commentid
          // debugger
          fetch(commentsURL +id,{
            method: 'DELETE'
          })
          evt.target.parentNode.remove()
        }
      })
})
