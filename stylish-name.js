function generateStylishNames() {

    const input = document.getElementById("normalName");

    const name = input.value.trim();

    const results = document.getElementById("styleResults");


    if (name === "") {

        results.innerHTML = `
            <div class="empty-message">
                ⚠️ Please enter your name first.
            </div>
        `;

        return;
    }


    const styles = createStyles(name);

    results.innerHTML = "";


    styles.forEach(function (styledName) {

        const item = document.createElement("div");

        item.className = "style-result";


        item.innerHTML = `
            <span class="style-text">
                ${escapeHTML(styledName)}
            </span>

            <button
                class="copy-style-btn"
                onclick="copyStyledName(this)"
            >
                📋 Copy
            </button>
        `;


        results.appendChild(item);

    });

}


function createStyles(name) {

    const styles = [

        `꧁༺ ${name} ༻꧂`,

        `『${name}』`,

        `亗 ${name} 亗`,

        `乂 ${name} 乂`,

        `★彡 ${name} 彡★`,

        `ツ ${name} ツ`,

        `メ ${name} メ`,

        `♛ ${name} ♛`,

        `☬ ${name} ☬`,

        `༒ ${name} ༒`,

        `𒆜 ${name} 𒆜`,

        `『★${name}★』`

    ];


    return styles;

}


function copyStyledName(button) {

    const parent = button.parentElement;

    const name = parent.querySelector(
        ".style-text"
    ).textContent;


    navigator.clipboard.writeText(name)
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