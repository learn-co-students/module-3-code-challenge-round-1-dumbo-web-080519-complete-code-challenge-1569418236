document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3448

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let img = document.getElementById("image")
  let titleOfImg = document.getElementById("name")
  let likes = document.getElementById("likes")
  let likeButton = document.getElementById("like_button")
  let imageCard = document.getElementById("image_card")
  let card = document.querySelector(".card")



    ///// FETCH FROM IMG URL//////

    fetch("https://randopic.herokuapp.com/images/3448")
    .then(res => res.json())
    .then(object => { console.log(object)

     let eachComment = object.comments.map(function(comment){
       comment
     })

     console.log(eachComment)

    card.innerHTML =  `<div id="image_card" class="card col-md-4">
          <img  src="${object.url}" id="image" data-id=""/>
          <h4 id="name">${object.name}</h4>
          <span>Likes:
            <span id="likes">${object.like_count}</span>
          </span>
          <button data-id="${object.id}"id="like_button">Like</button>`
    })


    card.addEventListener("click", function(event){
      event.preventDefault()
      let likeAmount = 0
      // console.log(event.target.dataset.id)
        if(event.target.id === "like_button"){
          fetch(`https://randopic.herokuapp.com/likes/${event.target.dataset.id}`,
            {
            method: "PATCH",
            headers: {
              'Content-Type':"application/json",
              'Accept': 'Accept/json'
            },
            body: JSON.stringify(
              {
                like_count:likeAmount ++
              }
            )
          })
        }
  })






})
