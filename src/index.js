
  let imageId = 3445 //Enter the id from the fetched image here

  let imageURL = `https://randopic.herokuapp.com/images/3445`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imgTag = document.querySelector("#image")
  const titleTag = document.querySelector("#name")
  const likeTag = document.querySelector("#likes")
  const button = document.querySelector("#like_button")
  const form = document.querySelector("#comment_form")
  const ul = document.querySelector("#comments")
  const card = document.querySelector("#image_card")

//////////  INDEX ///////////

fetch("https://randopic.herokuapp.com/images/3445")
  .then(res => res.json())
  .then((imgObj) => {makeTag(imgObj)}) 

  
function makeTag(img)
{
  imgTag.src = img.url
  titleTag.innerText = img.name
  likeTag.innerText = `${img.like_count}`
  
  card.dataset.id = `${img.id}`
  card.dataset.likes = `${img.likes}`
}



/////LIKE
//near end of code challenge 
//sunderstood POST 'https://randopic.herokuapp.com/likes'
//post to that url with body { id : }, .then() add 1 to the likes 
button.addEventListener("click",function(e)
{

    let id = parseInt(e.target.parentElement.dataset.id)
    let newLikes = (parseInt(e.target.parentElement.dataset.likes)) + 1
    //get number of likes, not getting likes properly
   

    let imgData = 
    {
      likes: newLikes
    }

    let fetchData = {
        method: "PATCH",
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(imgData)
      }

      //index.js:63 PATCH https://randopic.herokuapp.com/images/3445 404 (Not Found)
      //wrong url, tried https://randopic.herokuapp.com/images/3445/likes
      fetch("https://randopic.herokuapp.com/images/3445", fetchData)
        .then(res => json())
        .then(
          e.target.parentElement.querySelector("#likes").innerText = newLikes
        )  
})

///////// ADD COMMENT

function addComment(comment)
{
  let li = document.createElement("li")
  li.innerText = comment
  ul.append(li)
}

form.addEventListener("submit", function(e)
{
  let comment = form.comment.value

  let commentData = 
  {
     comments: comment
  }
  
  let fetchData = 
  {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
      body: JSON.stringify(commentData)
    }

  function push(imgObj){
    imgObj.comments.push(comment)
  }

  fetch(`https://randopic.herokuapp.com/images/${imageId}`, fetchData)
    //   .then((imgObj)=>push(imgObj))
      //didnt have time to console log the object
      //use the ^^ response to push the comment into the array of comments in api
      //
    .then(comment => addComment(comment))
  })
