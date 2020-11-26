console.log('%c Hello, World!', 'color: orange')
const imgContainer = document.querySelector('#container')




dankMemes.forEach(function(memeUrlString) {
  // const newImgTag = document.createElement('img') //create a new img tag
  // newImgTag.src = memeUrlString //set the src for that img
  // imgContainer.appendChild(newImgTag) //add the img tag to the DOM
  addImageToList(memeUrlString)
  // console.error(newImgTag);
  // logNumbers();
})

// document.querySelectorAll('img').forEach(function(img){
//   img.addEventListener('click', function(e) { 
//     console.warn(e.target.src)
//   })
// })

document.addEventListener('click', function(event) {
  let target = event.target;
  if (target.matches('img')) {
    console.warn(target.src)
  }
})

document.addEventListener('submit', function(event) {
  let target = event.target;
  if(target.matches("#newImage")) {
    event.preventDefault();
    let url = event.target.children[0].value;
    addImageToList(url)
  }
})

let form = document.querySelector("#newImage")
console.dir(form)
form.addEventListener('submit', function(event){
  event.preventDefault();
  let url = event.target.children[0].value;
  addImageToList(url)
})
// document.querySelectorAll('img').forEach(img => img.addEventListener('click', (e) => console.warn(e.target.src)))

function addImageToList(memeUrlString) {
  const newImgTag = document.createElement('img') //create a new img tag
  newImgTag.src = memeUrlString //set the src for that img
  imgContainer.appendChild(newImgTag) //add the img tag to the DOM
}

function logNumbers() {
  for(let i = 0 ; i < 1000 ; i++) {
    console.log(i);
  }
}

let names = ["Ty", "Dakota", "Samantha"]
let greetings = []
let answer = names.map(function(name) {
  greetings.push(`Hi, my name is ${name}`)
  return `Hi, my name is ${name}`
})

debugger