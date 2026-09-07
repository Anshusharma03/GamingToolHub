const searchInput =
    document.getElementById("toolSearch");

const searchMessage =
    document.getElementById("searchMessage");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const favoriteFilter =
    document.getElementById("favoritesFilter");


let selectedCategory = "all";

let favoritesOnly = false;


/* =========================
   FAVORITES
========================= */

function getFavorites() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "gamingToolsFavorites"
            )
        ) || [];

    }

    catch (error) {

        return [];

    }

}


function saveFavorites(favorites) {

    localStorage.setItem(
        "gamingToolsFavorites",
        JSON.stringify(favorites)
    );

}


function getToolId(card) {

    const link =
        card.querySelector(
            "a[href]"
        );

    if (link) {

        return link.getAttribute("href");

    }


    const title =
        card.querySelector("h3");

    return title
        ? title.textContent.trim()
        : Math.random().toString();

}


/* =========================
   UPDATE FAVORITE BUTTONS
========================= */

function updateFavoriteButtons() {

    const favorites =
        getFavorites();


    document
        .querySelectorAll(".tool-card")
        .forEach(function(card) {

            const id =
                getToolId(card);

            const button =
                card.querySelector(
                    ".favorite-btn"
                );


            if (!button) {
                return;
            }


            if (favorites.includes(id)) {

                button.textContent =
                    "★ Favorited";

                button.classList.add(
                    "is-favorite"
                );

            }

            else {

                button.textContent =
                    "☆ Favorite";

                button.classList.remove(
                    "is-favorite"
                );

            }

        });

}


/* =========================
   TOGGLE FAVORITE
========================= */

document
    .querySelectorAll(".favorite-btn")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                const card =
                    this.closest(".tool-card");

                const id =
                    getToolId(card);


                let favorites =
                    getFavorites();


                if (
                    favorites.includes(id)
                ) {

                    favorites =
                        favorites.filter(
                            function(item) {
                                return item !== id;
                            }
                        );

                }

                else {

                    favorites.push(id);

                }


                saveFavorites(favorites);

                updateFavoriteButtons();

                filterTools();

            }
        );

    });


/* =========================
   SEARCH + CATEGORY +
   FAVORITES
========================= */

function filterTools() {

    const search =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const favorites =
        getFavorites();


    const cards =
        document.querySelectorAll(
            ".tool-card"
        );


    let visible = 0;


    cards.forEach(function(card) {

        const text =
            card.textContent.toLowerCase();


        const category =
            card.dataset.category ||
            "gaming";


        const id =
            getToolId(card);


        const matchesSearch =
            search === "" ||
            text.includes(search);


        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;


        const matchesFavorite =
            !favoritesOnly ||
            favorites.includes(id);


        if (
            matchesSearch &&
            matchesCategory &&
            matchesFavorite
        ) {

            card.style.display = "";

            visible++;

        }

        else {

            card.style.display = "none";

        }

    });


    if (
        search !== "" ||
        selectedCategory !== "all" ||
        favoritesOnly
    ) {

        if (visible === 0) {

            searchMessage.textContent =
                "😕 No matching tools found.";

        }

        else {

            searchMessage.textContent =
                `${visible} tool${visible > 1 ? "s" : ""} found`;

        }

    }

    else {

        searchMessage.textContent = "";

    }

}


/* =========================
   SEARCH
========================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterTools
    );

}


/* =========================
   CATEGORY BUTTONS
========================= */

categoryButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                categoryButtons.forEach(
                    function(btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add(
                    "active"
                );


                selectedCategory =
                    this.dataset.category;


                filterTools();

            }
        );

    }
);


/* =========================
   FAVORITES FILTER
========================= */

if (favoriteFilter) {

    favoriteFilter.addEventListener(
        "click",
        function() {

            favoritesOnly =
                !favoritesOnly;


            this.classList.toggle(
                "active",
                favoritesOnly
            );


            filterTools();

        }
    );

}


/* =========================
   INITIAL LOAD
========================= */

updateFavoriteButtons();

filterTools();
/* =========================
   SHARE TOOLS
========================= */

document
    .querySelectorAll(".share-btn")
    .forEach(function(button) {

        button.addEventListener(
            "click",
            async function() {

                const card =
                    this.closest(".tool-card");


                const titleElement =
                    card.querySelector("h3");


                const linkElement =
                    card.querySelector("a[href]");


                if (
                    !titleElement ||
                    !linkElement
                ) {

                    return;

                }


                const title =
                    titleElement
                        .textContent
                        .trim();


                const toolUrl =
                    new URL(
                        linkElement.getAttribute(
                            "href"
                        ),
                        window.location.href
                    ).href;


                const shareData = {

                    title:
                        title +
                        " - GamingTools Hub",

                    text:
                        "🎮 Check out " +
                        title +
                        " on GamingTools Hub!",

                    url: toolUrl

                };


                try {

                    if (
                        navigator.share
                    ) {

                        await navigator.share(
                            shareData
                        );

                    }

                    else {

                        await navigator.clipboard
                            .writeText(toolUrl);


                        const oldText =
                            this.textContent;


                        this.textContent =
                            "✅ Link Copied";


                        setTimeout(
                            () => {

                                this.textContent =
                                    oldText;

                            },
                            1500
                        );

                    }

                }

                catch (error) {

                    if (
                        error.name !==
                        "AbortError"
                    ) {

                        try {

                            await navigator.clipboard
                                .writeText(toolUrl);

                            alert(
                                "Tool link copied!"
                            );

                        }

                        catch (copyError) {

                            alert(
                                "Unable to share this tool."
                            );

                        }

                    }

                }

            }
        );

    });
    /* =========================
   TOOL COUNT
========================= */

function updateToolCount() {

    const countElement =
        document.getElementById(
            "toolCount"
        );

    if (!countElement) {
        return;
    }

    const cards =
        document.querySelectorAll(
            ".tool-card"
        );

    countElement.textContent =
        cards.length;

}


updateToolCount();