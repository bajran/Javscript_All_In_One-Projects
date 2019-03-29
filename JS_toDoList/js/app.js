//Get Elements

const itemForm = document.getElementById("itemForm");
const itemInput = document.getElementById("itemInput");
const itemList = document.querySelector(".item-list");
const clearBtn = document.getElementById("clear-list");
const feedback = document.querySelector(".feedback");

//Array for Items
//let itemData = [];

let itemData = JSON.parse(localStorage.getItem("list")) || [];
if (itemData.length > 0) {
  itemData.forEach(function(singleItem) {
    itemList.insertAdjacentHTML(
      "beforeend",
      `<div class="item my-3">
        <h5 class="item-name text-capitalize">${singleItem}</h5>
        <div class="item-icons">
              <a href="#" class="complete-item mx-2 item-icon">
                     <i class="far fa-check-circle"></i>
                </a>
                <a href="#" class="edit-item mx-2 item-icon">
                        <i class="far fa-edit"></i>
                  </a>
                   <a href="#" class="delete-item item-icon">
                          <i class="far fa-times-circle"></i>
                    </a
         </div>
      </div>`
    );
    handleItem(singleItem);
  });
}

//FormSubmit
itemForm.addEventListener("submit", function(e) {
  e.preventDefault();
  let textValue = itemInput.value.trim();
  if (textValue === "") {
    //Calling ShowFeedback
    showFeedback("Please enter valid value", "danger");
  } else {
    //Calling AddItem
    addItem(textValue);
    //Clearing Input Value
    itemInput.value = "";
    //Pushing Items to Array
    itemData.push(textValue);
    //local storage
    localStorage.setItem("list", JSON.stringify(itemData));
    //Add Event listeners to icon
    handleItem(textValue);
  }
});

//ShowFeedback method
function showFeedback(msg, action) {
  feedback.classList.add("showItem", `alert-${action}`);
  feedback.innerHTML = msg;
  setTimeout(function() {
    feedback.classList.remove("showItem", "alert-${action}");
  }, 3000);
}

//AddItem function
function addItem(value) {
  const div = document.createElement("div");
  div.classList.add("item", "my-3");
  div.innerHTML = `<h5 class="item-name text-capitalize">${value}</h5>
                        <div class="item-icons">
                        <a href="#" class="complete-item mx-2 item-icon">
                                <i class="far fa-check-circle"></i>
                        </a>
                        <a href="#" class="edit-item mx-2 item-icon">
                                <i class="far fa-edit"></i>
                            </a>
                        <a href="#" class="delete-item item-icon">
                                <i class="far fa-times-circle"></i>
                        </a>
                        </div>`;

  itemList.appendChild(div);
}

//handleItem function
function handleItem(value) {
  const items = itemList.querySelectorAll(".item");
  items.forEach(function(item) {
    if (item.querySelector(".item-name").textContent === value) {
      //Complete Listener
      item
        .querySelector(".complete-item")
        .addEventListener("click", function(event) {
          item.querySelector(".item-name").classList.toggle("completed");
          this.classList.toggle("visibility");
          event.stopPropagation();
        });

      //Edit Event
      item
        .querySelector(".edit-item")
        .addEventListener("click", function(event) {
          itemInput.value = value;
          itemList.removeChild(item);
          itemData = itemData.filter(function(item) {
            return item !== value;
          });
          localStorage.setItem("list", JSON.stringify(itemData));
        });

      //Delete Event
      item
        .querySelector(".delete-item")
        .addEventListener("click", function(event) {
          itemList.removeChild(item);
          itemData = itemData.filter(function(itms) {
            return itms !== value;
          });
          localStorage.setItem("list", JSON.stringify(itemData));
          showFeedback(`${value} deleted successfully`, "success");
        });
    }
  });
}

//ClearBtn
clearBtn.addEventListener("click", function(event) {
  itemData = [];
  itemList.innerHTML = "";
});
