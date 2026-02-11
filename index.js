
function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value
  };
  //post
  axios.post("https://crudcrud.com/api/d823c811570e45ecb3e952f072888032/appointmentData", userDetails)
    .then(response => displayUserOnScreen(response.data))
    .catch(error => console.log(error));
  //clear input fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}
//fetch data
window.addEventListener("DOMContentLoaded", () => {
  axios.get("https://crudcrud.com/api/d823c811570e45ecb3e952f072888032/appointmentData")
    .then(response => {
      response.data.forEach(user => displayUserOnScreen(user));
    })
    .catch(error => {
      console.log(error)
    })
})
//display deleteit
function displayUserOnScreen(userDetails) {
  const userList = document.querySelector("ul");
  const userItem = document.createElement("li");
  userItem.textContent = `${userDetails.username}-${userDetails.email}-${userDetails.phone}`;
  //create delete butn
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  userItem.appendChild(deleteBtn);

  userList.appendChild(userItem);
  //delete
  deleteBtn.addEventListener("click", () => {
    axios.delete(`https://crudcrud.com/api/d823c811570e45ecb3e952f072888032/appointmentData/${userDetails._id}`)
      .then(() => {
        userList.removeChild(userItem);
      })
      .catch(error => {
        console.log(error);
      })
  })
}


module.exports = handleFormSubmit;
