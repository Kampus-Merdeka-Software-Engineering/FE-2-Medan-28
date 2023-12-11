const baseUrl = 'https://medan-28-backend.up.railway.app';

const testingUrl = window.location.href;
console.log("Testing URL = " + testingUrl);

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});


function postContactUs(event){
  event.preventDefault();
  // Ambil data dari form
  const form = event.target;
  const name = form.querySelector('[name="name"]').value;
  const email = form.querySelector('[name="email"]').value;
  const instance = form.querySelector('[name="instansi"]').value;
  const message = form.querySelector('[name="message"]').value;

  // simpan ke dalam object javascript
  const data = {
      name: name,
      email: email,
      instantion: instance,
      message: message
    };

  // post ke BE
  fetch(`${baseUrl}/sendContacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  .then(res => res.json())
  .then(data => {
      form.reset();
      alert(data.message);
  });

}

document.querySelector(".contact-form form")
.addEventListener("submit", postContactUs);
