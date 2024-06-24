const searchReferralSource = () => {
    const referenceNumber = document
        .getElementById("searchReferenceNumber")
        .value.toLowerCase();
    const name = document.getElementById("searchName").value.toLowerCase();
    const address = document
        .getElementById("searchAddress")
        .value.toLowerCase();
    const city = document.getElementById("searchCity").value.toLowerCase();
    const agencyName = document
        .getElementById("searchAgencyName")
        .value.toLowerCase();

    const submissions =
        JSON.parse(localStorage.getItem("referralSourceData")) || [];

    const filteredResults = submissions.filter((submission) => {
        return (
            (!referenceNumber ||
                (submission.referralSourceReferenceNumber &&
                    submission.referralSourceReferenceNumber
                        .toLowerCase()
                        .includes(referenceNumber))) &&
            (!name ||
                (submission.referralSourceName &&
                    submission.referralSourceName
                        .toLowerCase()
                        .includes(name))) &&
            (!address ||
                (submission.referralSourceAddress &&
                    submission.referralSourceAddress
                        .toLowerCase()
                        .includes(address))) &&
            (!city ||
                (submission.referralSourceCity &&
                    submission.referralSourceCity
                        .toLowerCase()
                        .includes(city))) &&
            (!agencyName ||
                (submission.referralSourceAgencyName &&
                    submission.referralSourceAgencyName
                        .toLowerCase()
                        .includes(agencyName)))
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
            <div class="col">${result.referralSourceReferenceNumber || ""}</div>
            <div class="col">${result.referralSourceName || ""}</div>
            <div class="col">${result.referralSourceAddress || ""}</div>
            <div class="col">${result.referralSourceCity || ""}</div>
            <div class="col">${result.referralSourceAgencyName || ""}</div>
        `;

        resultsContainer.appendChild(resultRow);
    });
};

document
    .getElementById("searchButton")
    .addEventListener("click", searchReferralSource);
document.getElementById("resetButton").addEventListener("click", () => {
    document.getElementById("searchForm").reset();
    document.getElementById("resultsContainer").innerHTML = "";
});
