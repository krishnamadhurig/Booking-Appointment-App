// Write your code below:
function handleFormSubmit(event) {
    event.preventDefault(); // fixed typo 'preveentDefault'
    
    const userDetails = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value
    };

    // POST user details
    axios.post("https://crudcrud.com/api/d823c811570e45ecb3e952f072888032/appointmentData", userDetails)
        .then(response => displayUserOnScreen(response.data))
        .catch(error => console.log(error));

    // Clear input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}

// Fetch all users on page load
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/d823c811570e45ecb3e952f072888032/appointmentData")
        .then(response => {
            response.data.forEach(user => displayUserOnScreen(user));
        })
        .catch(error => console.log(error));
});

// Display user on screen and handle delete/edit
function displayUserOnScreen(userDetails) {
    const userList = document.querySelector("ul");
    const userItem = document.createElement("li");
    userItem.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`;

    // Create Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    // Create Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    userItem.appendChild(deleteBtn);
    userItem.appendChild(editBtn);
    userList.appendChild(userItem);

    // DELETE functionality
    deleteBtn.addEventListener("click", () => {
        axios.delete(`https://crudcrud.com/api/d823c811570e45ecb3e952f072888032/appointmentData/${userDetails._id}`)
            .then(() => userList.removeChild(userItem))
            .catch(error => console.log(error));
    });

    // EDIT functionality
    editBtn.addEventListener("click", () => {
        // Populate form fields
        document.getElementById("username").value = userDetails.username;
        document.getElementById("email").value = userDetails.email;
        document.getElementById("phone").value = userDetails.phone;

        // Delete the old user from backend
        axios.delete(`https://crudcrud.com/api/d823c811570e45ecb3e952f072888032/appointmentData/${userDetails._id}`)
            .then(() => userList.removeChild(userItem))
            .catch(error => console.log(error));
    });
}


module.exports = handleFormSubmit;
