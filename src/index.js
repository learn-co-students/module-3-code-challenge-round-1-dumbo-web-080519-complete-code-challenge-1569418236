document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3451 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

/////////// READ INDEX ////////////
  ///// Helper Method //////
  ////get attributes ////
  let imageCardDiv = document.getElementById('image_card')
  let imageHeader = document.getElementById('name')
  let imageLikes = document.getElementById('likes')
  let imageLink = document.getElementById('image')

  let commentUL = document.getElementById('comments')

  fetch(imageURL)
  .then(res => res.json())
  .then(object => {
    imageLink.src = `${object.url}`
    imageLink.dataset.id = `${object.id}`
    imageHeader.innerText = `${object.name}`
    imageLikes.innerText = `${object.like_count}`
    imageCardDiv.dataset.divId = `${object.id}`
    object.comments.forEach(comment => {
      commentUL.innerHTML += `<li data-comment-id="${comment.id}">${comment.content}</li>`
    })
  })


////////// Like Feature //////////
  let likeBtn = document.getElementById('like_button')
  let likeNum = document.getElementById('likes')

  imageCardDiv.addEventListener('click', function(evt){
    if(evt.target.tagName === 'BUTTON'){
      let image_id = evt.target.dataset.id
      parseInt(likeNum)

      evt.preventDefault()
      fetch(likeURL, {
        method: "POST",
        headers: {
          "Content-Type": "applicaton/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          image_id: 3451
        })
      })
      .then(res => res.json())
      .then(imageObj => {
        
      })
    }

  })



/////// CREATE Comment /////////
    ///// get attributes /////
    let commentForm = document.getElementById('comment_form')
    let commentDiv = document.getElementById('comment-list')

    commentForm.addEventListener('submit', function(evt){
      let content = evt.target.comment.value
      let image_id = evt.target

      evt.preventDefault()
      fetch(commentsURL, {
        method: "POST",
        headers:  {
          "Content-Type": "applicaton/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          content: content,
          image_id: 3451
        })
      })
      .then(res => res.json())
      .then()

    })


//////// DELETE A COMMENT /////////

})
