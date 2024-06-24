const searchChildRegistered = () => {
    const referenceNumber = document
        .getElementById("searchReferenceNumber")
        .value.toLowerCase();
    const lastName = document
        .getElementById("searchLastName")
        .value.toLowerCase();
    const firstName = document
        .getElementById("searchFirstName")
        .value.toLowerCase();
    const dob = document.getElementById("searchDob").value;
    const gender = document.querySelector("#searchGender").value;
    const addressLine1 = document
        .getElementById("searchAddressLine1")
        .value.toLowerCase();
    const city = document.getElementById("searchCity").value.toLowerCase();
    const birthLastName = document
        .getElementById("searchBirthLastName")
        .value.toLowerCase();
    const mothersLastName = document
        .getElementById("searchMothersLastName")
        .value.toLowerCase();

    const submissions =
        JSON.parse(localStorage.getItem("childRegistrationData")) || [];

    const filteredResults = submissions.filter((submission) => {
        return (
            (!referenceNumber ||
                (submission.referenceNumber &&
                    submission.referenceNumber
                        .toLowerCase()
                        .includes(referenceNumber))) &&
            (!lastName ||
                (submission.lastName &&
                    submission.lastName.toLowerCase().includes(lastName))) &&
            (!firstName ||
                (submission.firstName &&
                    submission.firstName.toLowerCase().includes(firstName))) &&
            (!dob || (submission.dob && submission.dob === dob)) &&
            (!gender || (submission.gender && submission.gender === gender)) &&
            (!addressLine1 ||
                (submission.addressLine1 &&
                    submission.addressLine1
                        .toLowerCase()
                        .includes(addressLine1))) &&
            (!city ||
                (submission.city &&
                    submission.city.toLowerCase().includes(city))) &&
            (!birthLastName ||
                (submission.birthLastName &&
                    submission.birthLastName
                        .toLowerCase()
                        .includes(birthLastName))) &&
            (!mothersLastName ||
                (submission.mothersLastName &&
                    submission.mothersLastName
                        .toLowerCase()
                        .includes(mothersLastName)))
        );
    });

    displayResults(filteredResults);
};

const displayResults = (results) => {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    results.forEach((result) => {
        const resultRow = document.createElement("div");
        resultRow.className = "row";

        resultRow.innerHTML = `
            <div class="col">${result.referenceNumber || ""}</div>
            <div class="col">${result.firstName || ""}</div>
            <div class="col">${result.lastName || ""}</div>
            <div class="col">${result.addressLine1 || ""}</div>
            <div class="col">${result.city || ""}</div>
            <div class="col">${result.dob || ""}</div>
        `;

        resultsContainer.appendChild(resultRow);
    });
};

document
    .getElementById("searchButton")
    .addEventListener("click", searchChildRegistered);
document.getElementById("resetButton").addEventListener("click", () => {
    document.getElementById("searchForm").reset();
    document.getElementById("resultsContainer").innerHTML = "";
});
