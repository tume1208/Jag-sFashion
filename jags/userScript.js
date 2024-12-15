document.addEventListener("DOMContentLoaded", function() {
    const signInForm = document.getElementById("sign-in-form");
    const signUpForm = document.getElementById("sign-up-form");
    const showSignUpLink = document.getElementById("show-sign-up");
    const showSignInLink = document.getElementById("show-sign-in");
    const signInButton = document.getElementById("sign-in-button");
    const signUpButton = document.getElementById("sign-up-button");
    const logoutButton = document.getElementById("logout-button");
    const prescriptionDetails = document.getElementById("prescription-details");
    const addressSection = document.getElementById("address-section");
    const saveAddressButton = document.getElementById("save-address-button");
    const userNameElement = document.getElementById("user-name");

    function checkLoggedIn() {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            signInForm.style.display = "none";
            signUpForm.style.display = "none";
            logoutButton.style.display = "block";
            prescriptionDetails.style.display = "block";
            addressSection.style.display = "block";
            userNameElement.textContent = user.name;
            displayPrescriptionDetails();
            displayAddress();
        } else {
            signInForm.style.display = "block";
            signUpForm.style.display = "none";
            logoutButton.style.display = "none";
            prescriptionDetails.style.display = "none";
            addressSection.style.display = "none";
            userNameElement.textContent = "User";
        }
    }

    function displayPrescriptionDetails() {
        const prescription = JSON.parse(localStorage.getItem("prescription"));
        if (prescription) {
            prescriptionDetails.innerHTML = `
                <h3>Таны жор:</h3>
                <p>O.D (баруун) SPH: ${prescription.odSph}, CYL: ${prescription.odCyl}, AXIS: ${prescription.odAxis}</p>
                <p>O.S (зүүн) SPH: ${prescription.osSph}, CYL: ${prescription.osCyl}, AXIS: ${prescription.osAxis}</p>
                <p>PD (ПД): ${prescription.pd}</p>
                <p>Нэмэлт мэдээлэл: ${prescription.additionalInfo}</p>
            `;
        }
    }

    function displayAddress() {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser.city && loggedInUser.address) {
            document.getElementById("city").value = loggedInUser.city;
            document.getElementById("address").value = loggedInUser.address;
        }
    }

    showSignUpLink.addEventListener("click", function(event) {
        event.preventDefault();
        signInForm.style.display = "none";
        signUpForm.style.display = "block";
    });

    showSignInLink.addEventListener("click", function(event) {
        event.preventDefault();
        signUpForm.style.display = "none";
        signInForm.style.display = "block";
    });

    signInButton.addEventListener("click", function() {
        const phone = document.getElementById("sign-in-phone").value;
        const password = document.getElementById("sign-in-password").value;

        if (!phone || !password) {
            alert("Бүх талбарыг бөглөнө үү.");
            return;
        }

        // Perform sign-in logic here
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(user => user.phone === phone && user.password === password);

        if (user) {
            alert("Нэвтрэх амжилттай боллоо!");
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            checkLoggedIn();
        } else {
            alert("Утасны дугаар эсвэл нууц үг буруу байна.");
        }
    });

    signUpButton.addEventListener("click", function() {
        const name = document.getElementById("sign-up-name").value;
        const surname = document.getElementById("sign-up-surname").value;
        const phone = document.getElementById("sign-up-phone").value;
        const password = document.getElementById("sign-up-password").value;

        if (!name || !surname || !phone || !password) {
            alert("Бүх талбарыг бөглөнө үү.");
            return;
        }

        // Perform sign-up logic here
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.some(user => user.phone === phone);

        if (userExists) {
            alert("Энэ утасны дугаартай хэрэглэгч аль хэдийн бүртгэгдсэн байна.");
        } else {
            users.push({ name, surname, phone, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Бүртгүүлэх амжилттай боллоо!");
            signUpForm.style.display = "none";
            signInForm.style.display = "block";
        }
    });

    logoutButton.addEventListener("click", function() {
        localStorage.removeItem("loggedInUser");
        alert("Амжилттай гарлаа!");
        checkLoggedIn();
    });

    saveAddressButton.addEventListener("click", function() {
        const city = document.getElementById("city").value;
        const address = document.getElementById("address").value;

        if (!city || !address) {
            alert("Хот болон хаягийн талбарыг бөглөнө үү.");
            return;
        }

        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        loggedInUser.city = city;
        loggedInUser.address = address;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        alert("Хаяг амжилттай хадгалагдлаа!");
    });

    checkLoggedIn();
});
