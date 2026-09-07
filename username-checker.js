function checkUsername() {

    const input =
        document.getElementById("usernameInput");

    const username =
        input.value.trim();

    const result =
        document.getElementById("usernameResult");


    if (username === "") {

        alert("Please enter a username.");

        return;
    }


    const length = username.length;

    const validCharacters =
        /^[a-zA-Z0-9_]+$/.test(username);

    const startsWithLetter =
        /^[a-zA-Z]/.test(username);

    const hasNumber =
        /\d/.test(username);

    const hasUppercase =
        /[A-Z]/.test(username);

    const noRepeatedCharacters =
        !/(.)\1\1/.test(username);


    let score = 0;


    if (length >= 4 && length <= 16) {
        score += 25;
    }

    if (validCharacters) {
        score += 20;
    }

    if (startsWithLetter) {
        score += 15;
    }

    if (hasNumber) {
        score += 10;
    }

    if (hasUppercase) {
        score += 10;
    }

    if (noRepeatedCharacters) {
        score += 20;
    }


    let scoreText;


    if (score >= 85) {
        scoreText = "Excellent 🔥";
    }

    else if (score >= 65) {
        scoreText = "Good 👍";
    }

    else if (score >= 45) {
        scoreText = "Average 🙂";
    }

    else {
        scoreText = "Needs Improvement";
    }


    document.getElementById(
        "scoreCircle"
    ).textContent = score;


    document.getElementById(
        "scoreText"
    ).textContent = scoreText;


    const checks =
        document.getElementById("checks");


    checks.innerHTML = "";


    addCheck(
        checks,
        "Length",
        length >= 4 && length <= 16,
        `${length} characters`
    );


    addCheck(
        checks,
        "Allowed Characters",
        validCharacters,
        validCharacters
            ? "Letters, numbers and _"
            : "Special characters found"
    );


    addCheck(
        checks,
        "Starts With Letter",
        startsWithLetter,
        startsWithLetter
            ? "Good"
            : "Should start with a letter"
    );


    addCheck(
        checks,
        "Numbers",
        hasNumber,
        hasNumber
            ? "Contains number"
            : "No number"
    );


    addCheck(
        checks,
        "Capital Letter",
        hasUppercase,
        hasUppercase
            ? "Contains uppercase"
            : "No uppercase"
    );


    addCheck(
        checks,
        "Repeated Characters",
        noRepeatedCharacters,
        noRepeatedCharacters
            ? "Looks clean"
            : "Too many repeats"
    );


    const tips =
        document.getElementById("tips");


    tips.innerHTML = "";


    const tipList = [];


    if (length < 4) {
        tipList.push(
            "Use at least 4 characters."
        );
    }


    if (length > 16) {
        tipList.push(
            "Try keeping the username under 17 characters."
        );
    }


    if (!validCharacters) {
        tipList.push(
            "Avoid spaces and special characters."
        );
    }


    if (!hasNumber) {
        tipList.push(
            "Adding a number can make the name more unique."
        );
    }


    if (!hasUppercase) {
        tipList.push(
            "Try adding a capital letter."
        );
    }


    if (noRepeatedCharacters) {
        tipList.push(
            "Your character pattern looks clean."
        );
    }
    else {
        tipList.push(
            "Avoid repeating the same character too many times."
        );
    }


    tipList.forEach(function(tip) {

        const li =
            document.createElement("li");

        li.textContent = tip;

        tips.appendChild(li);

    });


    result.classList.remove("hidden");
}


function addCheck(
    container,
    name,
    passed,
    detail
) {

    const row =
        document.createElement("div");

    row.className = "check-row";


    row.innerHTML = `
        <span class="check-name">
            ${escapeHTML(name)}
        </span>

        <span class="check-status ${passed ? "good" : "bad"}">
            ${passed ? "✓" : "✕"}
            ${escapeHTML(detail)}
        </span>
    `;


    container.appendChild(row);
}


function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}