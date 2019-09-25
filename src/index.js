document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3449 //Enter the id from the fetched image here

  const imageURL = 'https://randopic.herokuapp.com/images/3449'

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let imageCard = document.querySelector("#image_card")
  let image = imageCard.querySelector("#image")
  let nameHeader = imageCard.querySelector("#name")
  let likesSpan = imageCard.querySelector("#likes")
  const likeButton = imageCard.querySelector("#like_button")
  let commentForm = imageCard.querySelector("#comment_form")
  let input = commentForm.querySelector("#comment_input")
  let commentsUL = imageCard.querySelector("#comments")


  	// helpers

	let jsonify = res => res.json()

	// events 

	likeButton.addEventListener("click", event => {
		let likes = parseInt(likesSpan.innerText)
		likes += 1 
		likesSpan.innerText = likes
		updateLikes()
	})

	commentForm.addEventListener("submit", event => {
		event.preventDefault()
		let commentText = event.target.comment.value
		input.value = ""
		updateComments(commentText)
	})

	commentsUL.addEventListener("click", event => {
		if (event.target.id === "delete") {
			commentId = event.target.parentElement.dataset.id
			event.target.parentElement.remove()
			deleteComment(commentId)
		}
	})


	// fetch

	function getImage(){
		return fetch(imageURL)
		.then(jsonify)
		.then(imageObj => {
			slapImage(imageObj)
		})
	}

	function updateLikes(){
		fetch(likeURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify( { "image_id": imageId } )
		})
	}

	function updateComments(txt){
		fetch(commentsURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json"
			},
			body: JSON.stringify( { "image_id": imageId, "content": txt } )
		})
		.then(jsonify)
		.then(commentObj => slapComment(commentObj))
	}

	function deleteComment(commentId){
		fetch(commentsURL + "/" + commentId, {
			method: "DELETE",
			headers: {'Content-Type': 'application/json'},
  			body: JSON.stringify({id: commentId})
		})
	}

	// slap

	function slapImage(img){
		image.src = img.url
		image.dataset.id = img.id

		nameHeader.innerText = img.name
		likesSpan.innerText = img.like_count 
		img.comments.forEach(comment => slapComment(comment) )
	}

	function slapComment(comment){
		let li = document.createElement("li")
		let deleteButton = document.createElement("button")
		li.innerText = comment.content
		li.dataset.id = comment.id
		deleteButton.id = "delete"
		deleteButton.innerText = "💣"
		li.appendChild(deleteButton)
		commentsUL.appendChild(li)
	}

	// get image on load

	getImage()

})

