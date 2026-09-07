let generatedHashtags = [];


function generateHashtags() {

    const input =
        document.getElementById("gameName");

    const game =
        input.value.trim();

    const platform =
        document.getElementById("platform").value;

    const result =
        document.getElementById("hashtagResult");

    const copyButton =
        document.getElementById("copyAllBtn");


    if (game === "") {

        result.innerHTML = `
            <div class="empty-message">
                ⚠️ Please enter a game or topic first.
            </div>
        `;

        copyButton.classList.add("hidden");

        return;
    }


    const cleanGame =
        game.replace(/[^a-zA-Z0-9]/g, "");


    const lowerGame =
        cleanGame.toLowerCase();


    generatedHashtags = createHashtags(
        cleanGame,
        lowerGame,
        platform
    );


    result.innerHTML = `
        <div class="hashtag-text">
            ${generatedHashtags.join(" ")}
        </div>
    `;


    copyButton.classList.remove("hidden");
}


function createHashtags(game, lowerGame, platform) {

    const common = [

        `#${lowerGame}`,

        `#${lowerGame}gaming`,

        `#gaming`,

        `#gamer`,

        `#gamingcommunity`,

        `#gamingclips`,

        `#gamingvideo`,

        `#gameplay`,

        `#progaming`,

        `#mobilegaming`

    ];


    const youtube = [

        `#youtubegaming`,

        `#youtubeshorts`,

        `#shorts`,

        `#gaming`,

        `#viral`,

        `#viralshorts`,

        `#gamingchannel`,

        `#gamingshorts`,

        `#trending`

    ];


    const instagram = [

        `#instagramgaming`,

        `#reels`,

        `#reelsinstagram`,

        `#viralreels`,

        `#gamingreels`,

        `#explore`,

        `#explorepage`,

        `#trendingreels`,

        `#instagaming`

    ];


    let extra;


    if (platform === "youtube") {

        extra = youtube;

    }

    else if (platform === "instagram") {

        extra = instagram;

    }

    else {

        extra = [

            `#gamingcommunity`,

            `#gamers`,

            `#gamerlife`,

            `#videogames`,

            `#esports`,

            `#gaminglife`,

            `#onlinegaming`

        ];

    }


    const combined = [
        ...common,
        ...extra
    ];


    return [...new Set(combined)];

}


function copyAllHashtags() {

    if (generatedHashtags.length === 0) {
        return;
    }


    const text =
        generatedHashtags.join(" ");


    navigator.clipboard.writeText(text)

        .then(function() {

            const button =
                document.getElementById("copyAllBtn");

            const oldText =
                button.textContent;


            button.textContent =
                "✅ All Hashtags Copied";


            setTimeout(function() {

                button.textContent =
                    oldText;

            }, 1500);

        })

        .catch(function() {

            alert(
                "Copy failed. Please copy manually."
            );

        });

}