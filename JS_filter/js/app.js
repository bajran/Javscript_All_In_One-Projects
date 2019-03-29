//Filter Buttons
(function() {
  //filter Btn
  const filterBtn = document.querySelectorAll(".filter-btn");

  filterBtn.forEach(function(btn) {
    btn.addEventListener("click", function(event) {
      event.preventDefault();
      const value = event.target.dataset.filter;

      //Select All Items
      const items = document.querySelectorAll(".store-item");

      items.forEach(function(item) {
        if (value == "all") {
          item.style.display = "block";
        } else {
          if (item.classList.contains(`${value}`)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });
})();

//Search Input
(function() {
  const searchItems = document.getElementById("search-item");
  searchItems.addEventListener("keyup", function(event) {
    event.preventDefault();
    //Select All Items
    const items = document.querySelectorAll(".store-item");
    let value = searchItems.value.toLowerCase().trim();

    items.forEach(function(item) {
      let type = item.dataset.item;
      let length = value.length;
      let match = type.slice(0, length);
      if (value === match) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
})();
