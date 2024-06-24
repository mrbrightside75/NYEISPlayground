const referralSourceSubmit = (event) => {
    event.preventDefault();
    let data = {};
    let highestRefNumber = 0;

    // Retrieve existing submissions from localStorage
    let submissions =
        JSON.parse(localStorage.getItem("referralSourceData")) || [];

    // Find the highest reference number
    // Find the highest reference number using a for...of loop
    for (const submission of submissions) {
        if (submission.referralSourceReferenceNumber) {
            const refNumber = parseInt(
                submission.referralSourceReferenceNumber
            );
            if (!isNaN(refNumber) && refNumber > highestRefNumber) {
                highestRefNumber = refNumber;
            }
        }
    }

    // Generate a unique reference number if none is provided
    const referenceNumberField = document.getElementById(
        "referralSourceReferenceNumber"
    );
    if (!referenceNumberField.value) {
        highestRefNumber += 1;
        referenceNumberField.value = highestRefNumber.toString();
    }

    // Collect form data after potetially generating uniqe refnum
    for (const element of event.target.elements) {
        if (element?.value) {
            data[element.id] = element.value;
            element.value = "";
        }
    }

    // Add the new submission to the array
    submissions.push(data);

    // Store the updated array back in localStorage
    localStorage.setItem("referralSourceData", JSON.stringify(submissions));
    window.location.href = "/";
    console.log(data);
};
