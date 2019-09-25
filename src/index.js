document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
    

  
  let imageId = 3444 
  //Enter the id from the fetched image here 1 was here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const imgElement = document.querySelector('#image')

  const likeURL = `https://randopic.herokuapp.com/likes/`
  const likeElement = document.querySelector('#likes')
  const likeBtn = document.querySelector("#like_button")
  const nameElement = document.querySelector("#name")

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const commentsUl = document.querySelector("#comments")
  const commentForm = document.querySelector('#comment_form')


//initial fetch request
  fetch(imageURL)
  .then(resp => resp.json())
  .then(imageObject => {
    // console.log(imageObject)
    imgElement.src = imageObject.url
    likeElement.innerText = imageObject.like_count
    nameElement.innerText = imageObject.name
    imageObject.comments.forEach(function(comment){
      commentsUl.innerHTML += `
      <li>${comment.content}</li>
      <button data-id=${comment.id}>delete comment</button>`
    })

  })



//like btn add a like
  likeBtn.addEventListener('click', function(evt){
    evt.preventDefault()
    // console.log('i was clicked', evt.target)
    let like = parseInt(likeElement.innerText, 10)
    like++
    likeElement.innerText = like
    fetch(likeURL, {
      method: 'POST',
      headers:  {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id:  imageId,
      })
    })
    .then(resp => resp.json())
  })
  
//add comment
  commentForm.addEventListener('submit', function(evt){
    evt.preventDefault()
    // console.log('this should post a comment')
    let comment = evt.target.comment.value
    commentsUl.innerHTML += `<li>${comment}</li>`
    commentForm.reset()
    fetch(commentsURL, {
      method: 'POST',
      headers:  {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id:  imageId,
        content: comment
      })
    })
    .then(resp => resp.json())

  })

  // //delete comment  - unfinished
  // commentsUl.addEventListener('click', function(evt){
  //   evt.preventDefault()
  //   console.log(evt.target.tagName)
    // let id = evt.target.dataset.id


  })


})