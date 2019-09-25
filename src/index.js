console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
let imageId = 3452 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const imageCard = document.querySelector("#image_card")



fetch(imageURL)
  .then(res => res.json())
  .then(resObj => {
    handleImage(resObj);
  })

  function handleImage(image) {
    let chosenImage = document.createElement("li")
    chosenImage.innerHTML = `<img src="${image.url}" id="image" data-id=""/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
      <span id="likes">${image.like_count}</span>
    </span>
    <button data-likes-for-image=${image.id} id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
         <!-- <li> for each comment goes here -->
         <li> ${comments.content}</li>
    </ul>`
    imageCard.append(chosenImage)
    let commentsUl = document.querySelector("#comments")
    let commentLi = document.createElement("li")
    comments = image.comments
    comments.forEach(comment => {
      commentLi.innerHTML = comment.content
      console.log(comment.content);
      commentsUl.prepend(comment.content)
    })


  }

  addEventListener("click", evt => {
    evt.preventDefault()
    if (evt.target.id === "like_button") {
      let likesRef = document.querySelector("#likes")
      fetch(likeURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          like_count: likesRef + 1,
          image_id: imageId
        })
      })
      .then(res => res.json())
      .then(resObj => {
        handleLikes(resObj)
      })
    }
  })

  function handleLikes(image) {
    fetch(imageURL)
      .then(res => res.json())
      .then(resObj => {
        handleImage(resObj);
      })
  }

  function handleImageLikes(image) {
    let chosenImage = document.querySelector("")
    chosenImage.innerHTML = ""
    chosenImage.innerHTML = `<img src="${image.url}" id="image" data-id=""/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
      <span id="likes">${image.like_count}</span>
    </span>
    <button data-likes-for-image=${image.id} id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
         <!-- <li> for each comment goes here -->

    </ul>`
    imageCard.append(chosenImage)




  }

  addEventListener("click", evt => {
    evt.preventDefault()
    if (evt.target.value === "Submit") {
     let userInput = document.querySelector("#comment_input")
      fetch(commentsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          content: userInput,
          image_id: imageId
        })
      })
      .then(res => res.json())
      .then(resObj => {
        handleComments(resObj)
      })
    }
  })

  function handleComments(image) {
    fetch(imageURL)
      .then(res => res.json())
      .then(resObj => {
        handleImage(resObj);
      })
  }
