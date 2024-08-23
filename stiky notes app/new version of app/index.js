// ამ კოდში ვიღებთ ელემენტებს HTML დოკუმენტიდან მათი ID ან კლასი სახელების გამოყენებით
const colorValue = document.getElementById("color") // იღებს ელემენტს, რომელსაც აქვს ID "color", ეს შესაძლოა იყოს input ელემენტი ფერის ასარჩევად
const addItemIcon = document.getElementById("+") // იღებს ელემენტს, რომელსაც აქვს ID "+"
const mainContainer = document.getElementsByClassName("main-box-container")[0] // იღებს ელემენტს კლასი სახელით "main-box-container", ეს ალბათ არის მთავარი კონტეინერი

// აქ ვამატებთ Event Listener-ს, რომელიც ირთვება ელემენტის addItemIcon დაჭერისას. 
// ის ამუშავებს handleAdd ფუნქციას.
addItemIcon.addEventListener("click", handleAdd)

// ვაცხადებთ ცვლადებს, რომლებიც გამოიყენება box-container-ის გადაადგილებისას
let newX = 0, newY = 0, oldY = 0, oldX = 0

function handleAdd() {
    // ვქმნით ახალ div ელემენტს
    let newBox = document.createElement("div")
    // ვსვამთ მასში HTML კოდს, რომელიც მოიცავს ფორმას, box-bar ელემენტს და textarea ელემენტს
    newBox.innerHTML = `
    <form class="box-container">
        <div class="box-bar">
            <span id="x">&#x2718;</span> <!-- ეს არის "დახურვის" ღილაკი -->
        </div>
        <textarea name="ta" id="ta" placeholder="Enter text..."></textarea>
    </form>
    `
    // ვიღებთ საჭირო ელემენტებს ახალ შექმნილი newBox-დან
    const boxValue = newBox.querySelector(".box-bar") // ეს არის box-bar, რომელიც იქნება დივის ზედა ნაწილში
    const boxContainer = newBox.querySelector(".box-container") // ეს არის მთლიანი ბლოკის კონტეინერი
    const exitElement = newBox.querySelector("#x") // "დახურვის" ღილაკი
    const txtArea = newBox.querySelector("#ta") // ტექსტის ასაწერი ველი

    // ვაყენებთ ტექსტის ველის ფონს იმ ფერის მიხედვით, რომელიც ავირჩიეთ colorValue input-ში
    txtArea.style.background = colorValue.value
    // ახალ დივს ვამატებთ მთავარ კონტეინერში
    mainContainer.appendChild(newBox)
    // ვამატებთ Event Listener-ს, რომელიც დაჭერისას დივის წაშლას უზრუნველყოფს
    exitElement.addEventListener("click", handleRemove)

    // ეს ფუნქცია იშლება დივის კონტეინერი
    function handleRemove() {
        boxContainer.parentElement.remove()
    }

    // ვამატებთ Event Listener-ს, რომელიც boxValue ელემენტის "mousedown"-ისას გააქტიურდება
    boxValue.addEventListener("mousedown", handleMouseDown)

    function handleMouseDown(e) {
        // ვწყვეტთ სტანდარტულ მოქმედებებს, მაგალითად ახალი ფანჯარის გახსნას
        e.preventDefault()
        // ვაფიქსირებთ ძველ კოორდინატებს, სადაც მაუსი იყო დაჭერისას
        oldX = e.clientX
        oldY = e.clientY

        // ვამატებთ Event Listener-ს დოკუმენტზე, რომელიც "mousemove"-ისას გააქტიურდება
        document.addEventListener("mousemove", handleMove)
        // ასევე ვამატებთ "mouseup" მოვლენას, რომელიც გააუქმებს მაუსის გადაადგილების თვალყურის დევნებას
        document.addEventListener("mouseup", handleMoveUp)

        function handleMove(e) {
            // აქაც ვწყვეტთ სტანდარტულ მოქმედებებს
            e.preventDefault()
            console.log(boxContainer.getBoundingClientRect())
            // ვიანგარიშებთ კოორდინატების ცვლილებას, ანუ რამდენად გადაადგილდა მაუსი
            newY = oldY - e.clientY
            newX = oldX - e.clientX
            // boxContainer-ს ვცვლით მის კოორდინატებს გვერდის ზომის მიხედვით
            boxContainer.style.top = (boxContainer.getBoundingClientRect().top - newY) + "px"
            boxContainer.style.left = (boxContainer.getBoundingClientRect().left - newX) + "px"
            // ვაფიქსირებთ ახალ კოორდინატებს, როგორც ძველ კოორდინატებს შემდეგი ნაბიჯისთვის
            oldX = e.clientX
            oldY = e.clientY
        }

        function handleMoveUp() {
            // როგორც კი მაუსის ღილაკი ავუშვით, ვწყვეტთ Event Listener-ს 
            document.removeEventListener("mousemove", handleMove)
            document.removeEventListener("mouseup", handleMoveUp)
        }
    }
}