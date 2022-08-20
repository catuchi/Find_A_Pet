// import fetchJsonp from "fetch-jsonp";
import { isValidZip, showAlert } from "./validate";

// visit petfinde.com to generate a new token
const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ5TWkyUTVzdHBNV1ZBMFVvcFZ6ZzRnS1dLOThtR3EyM2NlVkNTbE84dERBbFhvVFBwTCIsImp0aSI6ImIwNzJiZGZiZmRiZDBhZDI0ZTk2MTU3NjUyMzA4NzgzYzY1Nzg5Y2ZlNTA4ZjE3ZWZhMjRmMjNlNDYzNzBkMmU3OWYxMTYyYTQ2ZDBmNGYwIiwiaWF0IjoxNjYwOTU0OTU3LCJuYmYiOjE2NjA5NTQ5NTcsImV4cCI6MTY2MDk1ODU1Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.Cem6Lvthiipvey0RVg6Dn39NqUpb9kp1LEvjCxj5gajfzYIfWOlwvZCXYat5WZiBNLRI8Xgz_869_IxDqpksKXG99Ppt73fQiBslILUgZl_YgdMzkunrM22Hdo9km6W66OT6a4afuHB79JBmF_labLF9VjiF3y6qsFe34EOVvUJFktc99bHCcOyvbUJoGRyC0tU49b4WQnmIKuixVfy1wb7eeKYVD9fF0iU8MN6Ct8sJtMV6Hhu3Gs5_iQfAJk34tYjv0pc_x08t0H1DpqEtjUzVA6Eyce01GMXjj3G1vUVEeMZ1CJodu-S8BER70ZT-607r-gAAS1KJvqmeigBsjQ";

const petForm = document
  .querySelector("#pet-form")
  .addEventListener("submit", fetchAnimals);

// fetch animals from API
function fetchAnimals(e) {
  e.preventDefault();

  // get user input
  const animal = document.querySelector("#animal").value;
  const zip = document.querySelector("#zip").value;

  // validate zip
  if (!isValidZip(zip)) {
    showAlert("Please enter a valid zipcode", "danger");
    return;
  }

  const url = `https://api.petfinder.com/v2/animals?type=${animal}&location=${zip}`;

  // fetch pets

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => showAnimals(data.animals))
    .catch((err) => console.log(err));
}

// show listings of pets
function showAnimals(pets) {
  console.log(pets);
  const results = document.querySelector("#results");

  // clear first
  results.innerHTML = "";

  // loop through pets
  pets.forEach((pet) => {
    const breed = () => {
      if (pet.breeds.mixed && pet.breeds.secondary) {
        return `Primary: ${pet.breeds.primary}, Secondary: ${pet.breeds.secondary}`;
      } else {
        return `${pet.breeds.primary}`;
      }
    };

    const photoSrc = () => {
      if (pet.photos.length > 0) {
        return pet.photos[0].medium;
      } else {
        return `https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d279cd32-39f6-45cf-a294-c4840e7284b3/dduhy74-1ba8f610-5f73-4083-afe4-5f419794521a.png/v1/fill/w_1024,h_926,q_80,strp/cat_by_cat_with_horns_dduhy74-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTI2IiwicGF0aCI6IlwvZlwvZDI3OWNkMzItMzlmNi00NWNmLWEyOTQtYzQ4NDBlNzI4NGIzXC9kZHVoeTc0LTFiYThmNjEwLTVmNzMtNDA4My1hZmU0LTVmNDE5Nzk0NTIxYS5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.-poQDvmySi637N3_xRXISFIxDvtw3fyk3CgJdopSrco`;
      }
    };

    const div = document.createElement("div");
    div.classList.add("card", "card-body", "mb-3");
    div.innerHTML = `
      <div class="row">
        <div class="col-sm-6">
          <h4>${pet.name} (${pet.age})</h4>
          <p class="text-secondary">${breed()}</p>
          <p>${
            pet.contact.address.address1 ? pet.contact.address.address1 : ""
          } ${pet.contact.address.city} ${pet.contact.address.state} ${
      pet.contact.address.postcode
    }</p>
          <ul class="list-group">
            <li class="list-group-item">Phone: ${pet.contact.phone}</li>
            ${
              pet.contact.email
                ? `<li class="list-group-item">Email: ${pet.contact.email}</li>`
                : ``
            }
            <li class="list-group-item">Shelter ID: ${pet.organization_id}</li>
          </ul>
        </div>
        <div class="col-sm-6">
          <img class="img-fluid rounded-circle mt-2" src="${
            pet.photos[0] ? pet.photos[0].medium : ""
          }">
        </div>
      </div>
    `;

    results.appendChild(div);
  });
}
