const colorValue = document.getElementById("color")
const addItemIcon = document.getElementById("+")
const mainContainer = document.getElementsByClassName("main-box-container")[0]

addItemIcon.addEventListener("click", handleAdd)
let newX = 0, newY = 0, oldY = 0, oldX = 0

let newBox = document.createElement("div")

function handleAdd() {
    newBox.innerHTML = `
    <form class="box-container">
        <div class="box-bar">
            <span id="x">&#x2718;</span>
        </div>
        <textarea name="ta" id="ta" placeholder="Enter text..."></textarea>
    </form>
        `
    const boxValue = newBox.querySelector(".box-bar")
    const boxContainer = newBox.querySelector(".box-container")
    console.log(boxContainer)
    const exitElement = newBox.querySelector("#x")
    const txtArea = newBox.querySelector("#ta")

    txtArea.style.background = colorValue.value
    mainContainer.appendChild(newBox)
    exitElement.addEventListener("click", handleRemove)
    console.log(boxValue)
    function handleRemove() {
        boxContainer.parentElement.remove()
    }

    boxValue.addEventListener("mousedown", handleMouseDown)

    function handleMouseDown(e) {
        // ხალი ფანჯარა ან რამე სხვა რომ არ გაიხსნას მაგისთვის ვუწერთ ამა მეთოდს
        e.preventDefault()
        oldX = e.clientX
        oldY = e.clientY
        // console.log(oldX, oldY)

        document.addEventListener("mousemove", handleMove)
        document.addEventListener("mouseup", handleMoveUp)


        function handleMove(e) {
            e.preventDefault()
            newY = oldY - e.clientY
            newX = oldX - e.clientX
            console.log(boxContainer)
            boxContainer.style.top = (boxContainer.getBoundingClientRect().top - newY) + "px"
            boxContainer.style.left = (boxContainer.getBoundingClientRect().left - newX) + "px"
            oldX = e.clientX
            oldY = e.clientY
            console.log(
                { newY: e.clientY },
                { newX: e.clientX },
                { oldY: oldY },
                { oldX: oldX },
                { clientY: e.clientX })
        }
        function handleMoveUp() {
            document.removeEventListener("mousemove", handleMove)
            document.removeEventListener("mouseup", handleMoveUp)

        }
    }
}



