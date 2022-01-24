const allBoxes = document.querySelectorAll('.box')
//for photo columns in slide a
const acol = document.querySelectorAll('.panel')

acol.forEach((col) => {
  //col is the name of the each panel
  col.addEventListener('click', () => {
    collapse()
    col.classList.add('active') //to add active to panels
  })
})

function collapse() {
  acol.forEach((col) => {
    col.classList.remove('active')
  })
}

window.addEventListener('scroll', runScroller)

function runScroller() {
  const low = (window.innerHeight / 6) * 2

  allBoxes.forEach((box) => {
    const boxContent = box.getBoundingClientRect().top

    if (boxContent < low) {
      box.classList.add('visible')
    } else {
      box.classList.remove('visible')
    }
  })
}
