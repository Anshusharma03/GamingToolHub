function formatUID() {

    const input = document.getElementById("uidInput");

    const rawUID = input.value.trim();

    const results = document.getElementById("uidResults");


    if (rawUID === "") {

        results.innerHTML = `
            <div class="empty-message">
                ⚠️ Please enter a UID first.
            </div>
        `;

        return;
    }


    // Keep only numbers.
    const uid = rawUID.replace(/\D/g, "");


    if (uid === "") {

        results.innerHTML = `
            <div class="empty-message">
                ⚠️ Please enter a valid numeric UID.
            </div>
        `;

        return;
    }


    const formats = [

        {
            label: "Normal",
            value: uid
        },

        {
            label: "Spaced",
            value: addSpaces(uid)
        },

        {
            label: "Grouped",
            value: groupUID(uid)
        },

        {
            label: "Gaming Tag",
            value: `UID: ${uid}`
        },

        {
            label: "Profile Format",
            value: `🎮 ${uid}`
        }

    ];


    results.innerHTML = "";


    formats.forEach(function (item) {

        const result = document.createElement("div");

        result.className = "uid-result";


        result.innerHTML = `
            <div class="uid-result-info">

                <span class="uid-result-label">
                    ${escapeHTML(item.label)}
                </span>

                <span class="uid-result-value">
                    ${escapeHTML(item.value)}
                </span>

            </div>

            <button
                class="copy-uid-btn"
                onclick="copyUID(this)"
            >
                📋 Copy
            </button>
        `;


        results.appendChild(result);

    });

}


function addSpaces(uid) {

    return uid.match(/.{1,3}/g).join(" ");

}


function groupUID(uid) {

    const groups = [];

    let end = uid.length;


    while (end > 0) {

        const start = Math.max(0, end - 3);

        groups.unshift(
            uid.substring(start, end)
        );

        end = start;

    }


    return groups.join("-");

}


function copyUID(button) {

    const parent = button.parentElement;

    const value = parent.querySelector(
        ".uid-result-value"
    ).textContent;


    navigator.clipboard.writeText(value)
        .then(function () {

            const oldText = button.textContent;

            button.textContent = "✅ Copied";

            setTimeout(function () {

                button.textContent = oldText;

            }, 1200);

        })
        .catch(function () {

            alert("Copy failed. Please copy manually.");

        });

}


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}