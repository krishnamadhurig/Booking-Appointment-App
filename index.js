
// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    const userDetails = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
    };

    // POST the new user to CrudCrud
    axios.post("https://crudcrud.com/api/d823c811570e45ecb3e952f072888032/appointmentData", userDetails)
        .then(response => displayUserOnScreen(response.data))
        .catch(error => console.log(error));

    // Clear form fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}

// On page load, GET all users from CrudCrud and display them
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/d823c811570e45ecb3e952f072888032/appointmentData")
        .then(response => {
            response.data.forEach(user => displayUserOnScreen(user));
        })
        .catch(error => console.log(error));
});

// Function to display a user on the screen
function displayUserOnScreen(userDetails) {
    const userList = document.querySelector("ul");

    // Create list item with user details
    const userItem = document.createElement("li");
    userItem.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`;

    // Create Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    // Create Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    // Append buttons to list item
    userItem.appendChild(deleteBtn);
    userItem.appendChild(editBtn);

    // Append list item to UL
    userList.appendChild(userItem);

    // DELETE functionality
    deleteBtn.addEventListener("click", () => {
        axios.delete("https://crudcrud.com/api/d823c811570e45ecb3e952f072888032/appointmentData")
            .then(() => userList.removeChild(userItem))
            .catch(err => console.log(err));
    });

    // EDIT functionality
    editBtn.addEventListener("click", () => {
        // Fill the form with existing details
        document.getElementById("username").value = userDetails.username;
        document.getElementById("email").value = userDetails.email;
        document.getElementById("phone").value = userDetails.phone;

        // Remove old record from server and UI
        axios.delete("https://crudcrud.com/api/d823c811570e45ecb3e952f072888032/appointmentData")
            .then(() => userList.removeChild(userItem))
            .catch(err => console.log(err));
    });
}


module.exports = handleFormSubmit;
