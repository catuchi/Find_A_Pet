import fetchJsonp from "fetch-jsonp";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJ5TWkyUTVzdHBNV1ZBMFVvcFZ6ZzRnS1dLOThtR3EyM2NlVkNTbE84dERBbFhvVFBwTCIsImp0aSI6IjI1N2MxYjAwNWI2OGNhNDk5YWZmNTU5ZWE1MDFmZjA3MDcwNDRlOTU3MTlkNWNkZThkODFlNjFiYmFlYmY1YjFkMDIxZTczNjM3MzU5ZWJlIiwiaWF0IjoxNjYwOTM2MDc3LCJuYmYiOjE2NjA5MzYwNzcsImV4cCI6MTY2MDkzOTY3Nywic3ViIjoiIiwic2NvcGVzIjpbXX0.gp42edKecNwjHmPjSgexlGJCg3nftH6JJ_BCpLP4mNHVk3jxDTbie_LwVfAvZmN-rndFPZEEKn5EZ8VHc3a-WBIrN_iS6hLTP3bssYAA6OnIfkib-z32INB5fwQLF_Dmxs-yt6tjLwabkIJO9SEEj7TsUorHDkzXOXegp_xUbQtsxArYdYMZ5QshP5-t5lvvyiyLAOvXL_r0Ol-pQdtTEY9nE3ROMVgrP1OjxNv2iYElXvV0IN9228JLonhm3MbGSaQhdr_wB26IUYKzkRp_9IITJSxZg67p-hZUuRH19UBqPRX5OyUt04TRlH9_i05-th82uBawBPYFtd-ceogesA";

const petForm = document
  .querySelector("#pet-form")
  .addEventListener("submit", fetchAnimals);

// fetch animals from API
function fetchAnimals(e) {
  e.preventDefault();

  // get user input
  const animal = document.querySelector("#animal").value;
  const zip = document.querySelector("#zip").value;

  const url = `https://api.petfinder.com/v2/animals?type=${animal}&location=${zip}`;

  // fetch pets

  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
