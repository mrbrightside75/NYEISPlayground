document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const resetButton = document.getElementById("resetButton");
    const resultsContainer = document.getElementById("resultsContainer");

    searchButton.addEventListener("click", function (event) {
        event.preventDefault();
        searchChildRegistered();
    });

    resetButton.addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("searchForm").reset();
        resultsContainer.innerHTML = "";
    });

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
        const dobInput = document.getElementById("searchDob").value;
        const dob = formatDateForStorage(dobInput);
        const gender = document.getElementById("searchGender").value;
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
            JSON.parse(localStorage.getItem("referralData")) || [];

        const filteredResults = submissions.filter((submission) => {
            return (
                (!referenceNumber ||
                    (submission.referenceNumber &&
                        submission.referenceNumber
                            .toString()
                            .toLowerCase()
                            .includes(referenceNumber))) &&
                (!lastName ||
                    (submission.demoChildLastName &&
                        submission.demoChildLastName
                            .toLowerCase()
                            .includes(lastName))) &&
                (!firstName ||
                    (submission.demoChildFirstName &&
                        submission.demoChildFirstName
                            .toLowerCase()
                            .includes(firstName))) &&
                (!dob || (submission.demoDob && submission.demoDob === dob)) &&
                (!gender ||
                    (submission.demoGender &&
                        submission.demoGender === gender)) &&
                (!addressLine1 ||
                    (submission.demoAddressLine1 &&
                        submission.demoAddressLine1
                            .toLowerCase()
                            .includes(addressLine1))) &&
                (!city ||
                    (submission.demoCity &&
                        submission.demoCity.toLowerCase().includes(city))) &&
                (!birthLastName ||
                    (submission.demoBirthLastName &&
                        submission.demoBirthLastName
                            .toLowerCase()
                            .includes(birthLastName))) &&
                (!mothersLastName ||
                    (submission.demoMotherLastName &&
                        submission.demoMotherLastName
                            .toLowerCase()
                            .includes(mothersLastName)))
            );
        });

        displayResults(filteredResults);
    };

    const displayResults = (results) => {
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
                <div class="col">${result.demoChildFirstName || ""}</div>
                <div class="col">${result.demoChildLastName || ""}</div>
                <div class="col">${result.demoAddressLine1 || ""}</div>
                <div class="col">${result.demoCity || ""}</div>
                <div class="col">${result.demoDob || ""}</div>
            `;

            resultsContainer.appendChild(resultRow);
        });
    };

    const formatDateForStorage = (dateString) => {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };
});
