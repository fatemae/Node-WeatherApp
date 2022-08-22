
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2");
// messageOne.textContent = "From JS";
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOne.textContent = "Loading...";
  const location = search.value;
  console.log(location);

  fetch("/weather?address="+location).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
        console.log(data.error);
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        console.log(data);
      }
    });
  });
});
