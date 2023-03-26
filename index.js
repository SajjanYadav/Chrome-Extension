let arr = []
const text = document.getElementById("input-el")
const clickEl = document.getElementById("input-btn")
const Liss = document.getElementById("list")
const deleteAll = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("arr"))
const saveBtn = document.getElementById("save-btn")


if(leadsFromLocalStorage){
    arr = leadsFromLocalStorage
    renderleads(arr)
}

clickEl.addEventListener("click",function() {
    arr.push(text.value)
    text.value=""
    localStorage.setItem("arr",JSON.stringify(arr))

    renderleads(arr)
    console.log(localStorage.getItem("arr"))
})

saveBtn.addEventListener("click",function(){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        arr.push(tabs[0].url)
        localStorage.setItem("arr", JSON.stringify(arr))
        renderleads(arr)
    });
    
})

function renderleads(arra){
    let allItems = ""
    for (let i = 0; i < arra.length; i++) {
        //Methord-1
        // const li = document.createElement("li")
        // li.textContent = arr[i]
        // Liss.append(li)

        //Mehtord-2
        // allItems += "<li><a target = '_blank' href='" + arr[i] + "'>" + arr[i] + "</a></li>"

        //Methord-3
        //Using Template string
        allItems += `<li>
                            <a target = '_blank' href='${arra[i]}'>
                                ${arra[i]}
                            </a>
                    </li>`
    }
    Liss.innerHTML = allItems
}


deleteAll.addEventListener("click", function() {  // upon clicking the delete all  
    localStorage.clear()                          // we clear the local storage
    arr=[]                                        // make the array empty
    renderleads(arr)                                 // calling the function to print the array
})