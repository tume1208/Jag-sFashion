document.addEventListener("DOMContentLoaded", function() {
    const sphValues = Array.from({ length: 161 }, (_, i) => (i - 80) * 0.25); // Start from -20 to 20
    const cylValues = Array.from({ length: 161 }, (_, i) => (i - 80) * 0.25); // Start from -20 to 20

    function populateSelect(selectElement, values) {
        values.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = `${value > 0 ? '+' : ''}${value.toFixed(2)}`;
            selectElement.appendChild(option);
        });
    }

    populateSelect(document.getElementById("od-sph"), sphValues);
    populateSelect(document.getElementById("os-sph"), sphValues);
    populateSelect(document.getElementById("od-cyl"), cylValues);
    populateSelect(document.getElementById("os-cyl"), cylValues);

    const submitButton = document.getElementById("submit-prescription");
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();

        const odSph = document.getElementById("od-sph").value;
        const osSph = document.getElementById("os-sph").value;
        const odCyl = document.getElementById("od-cyl").value;
        const osCyl = document.getElementById("os-cyl").value;
        const odAxis = document.getElementById("od-axis").value;
        const osAxis = document.getElementById("os-axis").value;
        const pd = document.getElementById("pd").value;
        const additionalInfo = document.getElementById("additional-info").value;

        const prescription = {
            odSph,
            osSph,
            odCyl,
            osCyl,
            odAxis,
            osAxis,
            pd,
            additionalInfo
        };

        localStorage.setItem("prescription", JSON.stringify(prescription));
        alert("Жор амжилттай илгээгдлээ!");

        // Redirect to user.html
        window.location.href = "user.html";
    });
});
