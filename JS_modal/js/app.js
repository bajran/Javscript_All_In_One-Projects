//lightbox

(function() {
  //all images
  let imageList = [];
  let counter = 0;

  const images = document.querySelectorAll(".store-img");
  const container = document.querySelector(".lightbox-container");
  const item = document.querySelector(".lightbox-item");
  const closeIcon = document.querySelector(".lightbox-close");
  const btnLeft = document.querySelector(".btnLeft");
  const btnRight = document.querySelector(".btnRight");

  //Add all images to array
  images.forEach(function(image) {
    imageList.push(image.src);
  });

  //Click listener to all Images
  images.forEach(function(image) {
    image.addEventListener("click", function(e) {
      //show Modal
      container.classList.add("show");
      //get source
      let src = e.target.src;
      //get the index of current image
      counter = imageList.indexOf(src);
      //show selected image in modal
      item.style.backgroundImage = `url(${src})`;
    });
  });

  //Close Modal
  closeIcon.addEventListener("click", function(e) {
    container.classList.remove("show");
  });

  //Left Button Click in Modal
  btnLeft.addEventListener("click", function(e) {
    counter--;
    if (counter < 0) {
      counter = imageList.length - 1;
    }
    item.style.backgroundImage = `url(${imageList[counter]})`;
  });

  //Right Button CLick in Modal
  btnRight.addEventListener("click", function(e) {
    counter++;
    if (counter > imageList.length - 1) {
      counter = 0;
    }
    item.style.backgroundImage = `url(${imageList[counter]})`;
  });

  //End of code
})();
