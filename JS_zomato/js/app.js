const API = "112038dbeabc3759e3ad36ff1f31ab55";

//Zomato CLass
class ZOMATO {
  constructor() {
    this.api = "112038dbeabc3759e3ad36ff1f31ab55";
    this.header = {
      method: "GET",
      headers: {
        "user-key": this.api,
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    };
  }

  async searchAPI(city, categoryID) {
    //Category URL
    const categoryURL = `https://developers.zomato.com/api/v2.1/categories`;
    //City URL
    const cityURL = `https://developers.zomato.com/api/v2.1/cities?q=${city}`;

    //fetching the data of Category
    const cateogryInfo = await fetch(categoryURL, this.header);
    const categoryJSON = await cateogryInfo.json();
    const categories = await categoryJSON.categories;

    //fetching the data of city
    const cityInfo = await fetch(cityURL, this.header);
    const cityJSON = await cityInfo.json();
    const cityLocation = await cityJSON.location_suggestions;

    let cityID = 0;

    if (cityLocation.length > 0) {
      cityID = await cityLocation[0].id;
    }

    //Search Restaurant
    const restaurantURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&category=${categoryID}&sort=rating`;

    ///Fetching data for restaurant info
    const restaurantInfo = await fetch(restaurantURL, this.header);
    const restaurantJSON = await restaurantInfo.json();
    const restaurants = await restaurantJSON.restaurants;

    return {
      categories,
      cityID,
      restaurants
    };
  }
}

//UI Class
class UI {
  constructor() {
    //loader Image
    this.loader = document.querySelector(".loader");
    //RestaurantList
    this.restaurantList = document.getElementById("restaurant-list");
  }

  //AddSelect options
  addSelectOptions(categories) {
    //Search Dropdown
    const search = document.getElementById("searchCategory");
    let output = `<option value ='0' selected>select category</option>`;
    //Catrgories-- Array of Category
    categories.forEach(function(category) {
      output += `<option value='${category.categories.id}'>${
        category.categories.name
      }</option>`;
    });
    //Appending Child element to search
    search.innerHTML = output;
  }

  //Showfeedback
  showFeedback(msg) {
    const feedback = document.querySelector(".feedback");
    feedback.classList.add("showItem");
    feedback.innerHTML = `<p>${msg}</p>`;
    setTimeout(() => {
      feedback.classList.remove("showItem");
    }, 2000);
  }

  showLoader() {
    this.loader.classList.add("showItem");
  }
  hideLoader() {
    this.loader.classList.remove("showItem");
  }

  getRestaurants(restaurants) {
    if (restaurants.length === 0) {
      this.showFeedback("No Restaurant Avaialabel in this category");
    } else {
      this.restaurantList.innerHTML = "";
      restaurants.forEach(restaurant => {
        const {
          thumb: img,
          name,
          location: { address },
          user_rating: { aggregate_rating },
          cuisines,
          average_cost_for_two: cost,
          menu_url,
          url
        } = restaurant.restaurant;

        if (img !== "") {
          this.showRestaurant(
            img,
            name,
            address,
            aggregate_rating,
            cuisines,
            cost,
            menu_url,
            url
          );
        }
      });
    }
    this.hideLoader();
  }

  showRestaurant(
    img,
    name,
    address,
    aggregate_rating,
    cuisines,
    cost,
    menu_url,
    url
  ) {
    const div = document.createElement("div");
    div.classList.add("col-11", "mx-auto", "my-3", "md-4");
    div.innerHTML = ` <div class="card">
    <div class="card">
     <div class="row p-3">
      <div class="col-5">
       <img src="${img}" class="img-fluid img-thumbnail" alt="">
      </div>
      <div class="col-5 text-capitalize">
       <h6 class="text-uppercase pt-2 redText">${name}</h6>
       <p>${address}</p>
      </div>
      <div class="col-1">
       <div class="badge badge-success">
       ${aggregate_rating}
       </div>
      </div>
     </div>
     <hr>
     <div class="row py-3 ml-1">
      <div class="col-5 text-uppercase ">
       <p>cousines :</p>
       <p>cost for two :</p>
      </div>
      <div class="col-7 text-uppercase">
      <p>${cuisines}</p>
      <p>${cost}</p>
      </div>
     </div>
     <hr>
     <div class="row text-center no-gutters pb-3">
      <div class="col-6">
       <a href="${menu_url}" target="_blank" class="btn redBtn  text-uppercase"><i class="fas fa-book"></i> menu</a>
      </div>
      <div class="col-6">
       <a href="${url}" target="_blank" class="btn redBtn  text-uppercase"><i class="fas fa-book"></i> website</a>
      </div>
     </div>
    </div>
    
   </div>`;
    this.restaurantList.appendChild(div);
  }
}

(function() {
  const searchForm = document.getElementById("searchForm");
  const searchCity = document.getElementById("searchCity");
  const searchCategory = document.getElementById("searchCategory");

  //Instance of Zomato Class
  const zomato = new ZOMATO();
  //Instance of UI
  const ui = new UI();

  //onload event
  document.addEventListener("DOMContentLoaded", e => {
    //Calling API
    zomato.searchAPI().then(data => ui.addSelectOptions(data.categories));
  });

  //Form Submission
  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const city = searchCity.value.toLowerCase();
    const categoryID = searchCategory.value;
    if (city === "" || categoryID === 0) {
      ui.showFeedback("Please enter a city and select category");
    } else {
      //logic goes here
      zomato.searchAPI(city).then(cityData => {
        if (cityData.cityID === 0) {
          ui.showFeedback("Please Enter Appropriate City");
        } else {
          ui.showLoader();
          zomato.searchAPI(city, categoryID).then(function(data) {
            ui.getRestaurants(data.restaurants);
          });
        }
      });
    }
  });
})();
