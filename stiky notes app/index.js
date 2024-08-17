const colorValue = document.getElementById("color")
const addColor = document.getElementById("+")
const mainContainer = document.getElementsByClassName("main-container")[0]

let newX = 0, newY = 0, oldX = 0, oldY = 0

addColor.addEventListener("click", handleAdd)

function handleAdd() {
    let newChild = document.createElement("div")
    newChild.innerHTML = `
    <form class="box">
        <div id="box-value" class="boxes">
            <span class="x">&#x2718</span>
        </div>
        <textarea name="textarea" class="textarea" placeholder="Enter text..."></textarea>
    </form>`
    mainContainer.appendChild(newChild)

    // Get the newly added elements
    const newBox = newChild.querySelector(".boxes")
    const closeButton = newChild.querySelector(".x")
    const textArea = newChild.querySelector(".textarea")
    const mainBox = newChild.querySelector(".box")
    const boxGrab = newChild.querySelector("#box-value")

    // Set textarea background color
    textArea.style.backgroundColor = colorValue.value

    // Handle the close button functionality
    closeButton.addEventListener("click", () => {
        newBox.parentElement.remove()
    })

    // Set an initial z-index for the new box
    mainBox.style.zIndex = 0

    // Handle dragging functionality
    boxGrab.addEventListener("mousedown", mouseDown)

    function mouseDown(e) {
        e.preventDefault()

        oldX = e.clientX
        oldY = e.clientY

        document.addEventListener("mousemove", mouseMove)
        document.addEventListener("mouseup", mouseUp)

        const mainBoxAll = document.querySelectorAll(".box")

        for (let i = 0; i < mainBoxAll.length; i++) {
            mainBoxAll[i].style.zIndex = 0
        }

        // Update z-index to bring the current box to the front
        mainBox.style.zIndex = 999
    }

    function mouseMove(e) {
        e.preventDefault()
        newX = oldX - e.clientX
        newY = oldY - e.clientY
        mainBox.style.top = (mainBox.getBoundingClientRect().top - newY) + "px"
        mainBox.style.left = (mainBox.getBoundingClientRect().left - newX) + "px"
        console.log(
            mainBox.getBoundingClientRect().left - newX,
            mainBox.getBoundingClientRect().left,
            { newY: newY },
            { newX: newX },
            { oldY: oldY },
            { oldX: oldX },


            { clientY: e.clientX })
        oldX = e.clientX
        oldY = e.clientY

    }

    function mouseUp(e) {
        document.removeEventListener("mousemove", mouseMove)
        document.removeEventListener("mouseup", mouseUp)
    }
}
