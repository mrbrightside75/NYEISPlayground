document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("referralForm");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            let data = {};

            // Retrieve existing submissions from localStorage
            let submissions =
                JSON.parse(localStorage.getItem("referralData")) || [];

            // Get the last reference number and increment it
            let lastRefNumber =
                parseInt(localStorage.getItem("lastRefNumber")) || 0;
            let newRefNumber = lastRefNumber + 1;
            data.referenceNumber = newRefNumber;

            // Collect form data
            Array.from(form.elements).forEach((element) => {
                if (element.id && element.value) {
                    if (element.type === "checkbox") {
                        data[element.id] = element.checked;
                    } else if (element.type === "date") {
                        data[element.id] = formatDateForStorage(element.value);
                    } else {
                        data[element.id] = element.value;
                    }
                }
            });

            // Add the new submission to the array
            submissions.push(data);

            // Store the updated array back in localStorage
            localStorage.setItem("referralData", JSON.stringify(submissions));
            localStorage.setItem("lastRefNumber", newRefNumber);

            console.log("Data stored:", data);

            // Clear the form or redirect as necessary
            form.reset(); // Optional: reset the form
            window.location.href = "/"; // Optional: redirect after storing data
        });
    } else {
        console.error("Form not found");
    }
});

const formatDateForStorage = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};
