// validate zipcode

export function isValidZip(zip) {
  return /^\d{5}(-\d{4})?$/.test(zip);
}

// display alert message
export function showAlert(message, className) {
  // create div
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));

  // get container
  const container = document.querySelector(".container");
  const form = document.querySelector("#pet-form");

  // insert alert
  container.insertBefore(div, form);

  // close alert after 3 seconds
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
