console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

// Constant URLS
let imageId = 3457 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

// Static DOM Elements
const imgCard = document.querySelector("#image_card")
const selectedImg = imgCard.querySelector("#image")
const imgTitle = imgCard.querySelector("#name")
const likes = imgCard.querySelector("#likes") 
const likeBtn = imgCard.querySelector("#like_button")
const commentForm = imgCard.querySelector("#comment_form")
const comments = imgCard.querySelector("#comments")
const commentInput = imgCard.querySelector("#comment_input")

//Initial Fetch
fetch(`${imageURL}`)
	.then(response => response.json())
	.then(imgObj => {
		console.log(imgObj)
		selectedImg.src = imgObj.url
		selectedImg.dataset.id = imageId
		imgTitle.innerText = imgObj.name
		likes.innerText = imgObj.like_count

		commentForm.addEventListener("click", handleComment)
		likeBtn.addEventListener("click", handleLike)
		createCommentList(imgObj)

	})

// DOM Element Creation Helpers
const createCommentList = imgObj => {
	imgObj.comments.map(commentObj => {
		const li = createComment(commentObj)
		li.id = commentObj.id
		const btn =createDelBtn(commentObj)
		li.append(btn)
	})
}

const createComment = commentObj => {
	const li = document.createElement("li")
	li.innerText = commentObj.content
	li.dataset.imgId = imageId
	comments.append(li)
	return li
}

const createDelBtn = li => {
	const btn = document.createElement("button")
	btn.innerText = "X"
	btn.dataset.id = li.id
	btn.style = "margin-left: 30px;"
	btn.addEventListener("click", handleCommentDelete)
	return btn
}

// Event Handlers
const handleLike = event => {
	let numLikes = parseFloat(likes.innerText)
	numLikes++
	likes.innerText = numLikes 
	fetch(likeURL, postLikeObj)
}

const handleComment = event => {
	event.preventDefault()
	if (event.target.type === "submit" && commentInput.value !== "") {
		const commentObj = {content: commentInput.value, image_id: imageId}
		commentInput.value = ""
		commentInput.placeholder="Add Comment"
		const li = createComment(commentObj)

		fetch(commentsURL, postCommentObj(commentObj))
			.then(response => response.json())
			.then(commentObj => {
				li.id = commentObj.id 
				const btn = createDelBtn(li)
				li.append(btn)
			})
	} else if (event.target.type === "submit" && commentInput.value === ""){
		commentInput.placeholder = "Comment can not be blank."
	}
}

const handleCommentDelete = event => {
	event.preventDefault()
	const li = event.target.parentElement
	li.remove()
	fetch(`${commentsURL}/${event.target.dataset.id}`, deleteCommentObj)
}

// Configuration Objects
const postLikeObj = {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json"
	},
	body: JSON.stringify({image_id: imageId})
}

const postCommentObj = commentObj => {
	const obj = {	
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify(commentObj)
	}
	return obj
}

const deleteCommentObj = {method: "DELETE"}
