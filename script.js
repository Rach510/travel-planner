// 🌙 DARK MODE
function toggleMode() {
    document.body.classList.toggle("dark");
}

// 🧠 GLOBAL FILTER STATE
let currentType = "all";
let currentBudget = "all";
let currentLocation = "all";

// 🎯 APPLY ALL FILTERS
function applyFilters() {
    let cards = document.querySelectorAll(".card");
    let visible = 0;

    cards.forEach(card => {
        let matchType = currentType === "all" || card.dataset.type === currentType;
        let matchBudget = currentBudget === "all" || card.dataset.budget === currentBudget;
        let matchLocation = currentLocation === "all" || card.dataset.location === currentLocation;

        if (matchType && matchBudget && matchLocation) {
            card.style.display = "block";
            visible++;
        } else {
            card.style.display = "none";
        }
    });

    let noResults = document.getElementById("noResults");
    if (noResults) {
        noResults.style.display = visible === 0 ? "block" : "none";
    }
}

// 🎯 FILTER FUNCTIONS
function filterDest(type) {
    currentType = type;
    applyFilters();
}

function filterBudget(level) {
    currentBudget = level;
    applyFilters();
}

function filterLocation(loc) {
    currentLocation = loc;
    applyFilters();
}

function showAll() {
    currentType = "all";
    currentBudget = "all";
    currentLocation = "all";
    applyFilters();
}

// 🧳 TRIP STORAGE
let trip = JSON.parse(localStorage.getItem("trip")) || [];

// ➕ ADD TO TRIP
function addToTrip(place) {
    if (!trip.includes(place)) {
        trip.push(place);
        localStorage.setItem("trip", JSON.stringify(trip));
        displayTrip();
    }
}

// 🧾 DISPLAY TRIP
function displayTrip() {
    let list = document.getElementById("tripList");
    list.innerHTML = "";

    trip.forEach((place, index) => {
        let li = document.createElement("li");
        li.textContent = place + " ";

        let btn = document.createElement("button");
        btn.textContent = "❌";

        btn.onclick = function () {
            trip.splice(index, 1);
            localStorage.setItem("trip", JSON.stringify(trip));
            displayTrip();
        };

        li.appendChild(btn);
        list.appendChild(li);
    });
}

// 🔁 CLEAN DUPLICATES + LOAD
trip = [...new Set(trip)];
localStorage.setItem("trip", JSON.stringify(trip));
displayTrip();

// 🔍 SEARCH (WORKS WITH FILTERS)
document.querySelector(".search-box input").addEventListener("input", function () {
    let value = this.value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let name = card.querySelector("h3").textContent.toLowerCase();

        let matchSearch = name.includes(value);
        let matchType = currentType === "all" || card.dataset.type === currentType;
        let matchBudget = currentBudget === "all" || card.dataset.budget === currentBudget;
        let matchLocation = currentLocation === "all" || card.dataset.location === currentLocation;

        if (matchSearch && matchType && matchBudget && matchLocation) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

// 🎨 ACTIVE BUTTON UI
let filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        filterButtons.forEach(b => b.classList.remove("active"));
        this.classList.add("active");
    });
});

// 🪟 MODAL
function openModal(title, desc, imgSrc) {
    document.getElementById("modal").style.display = "block";
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDesc").textContent = desc;
    document.getElementById("modalImg").src = imgSrc;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// CLICK OUTSIDE MODAL
window.onclick = function (event) {
    let modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// 🚀 INITIAL LOAD
applyFilters();

function generateItinerary(place) {
    let plans = {
        "Goa": [
            "Day 1: Beach visit & sunset",
            "Day 2: Water sports & nightlife",
            "Day 3: Explore markets & relax"
        ],
        "Manali": [
            "Day 1: Local sightseeing",
            "Day 2: Solang Valley adventure",
            "Day 3: Snow activities & cafes"
        ],
        "Hampi": [
            "Day 1: Temple exploration",
            "Day 2: Ruins & heritage walk",
            "Day 3: Sunset viewpoint"
        ],
        "Paris": [
            "Day 1: Eiffel Tower & city tour",
            "Day 2: Museums & cafes",
            "Day 3: Shopping & river cruise"
        ]
    };

    let plan = plans[place] || ["Custom trip plan coming soon"];

    let list = document.getElementById("tripList");
    list.innerHTML = `<h3>${place} Itinerary</h3>`;

    plan.forEach(day => {
        let li = document.createElement("li");
        li.textContent = day;
        list.appendChild(li);
    });
}

function generateItinerary(place) {
    let list = document.getElementById("tripList");

    list.innerHTML = "Generating itinerary... 🤖";

    setTimeout(() => {
        let plans = {
            "Goa": [
                "Day 1: Beach visit & sunset",
                "Day 2: Water sports & nightlife",
                "Day 3: Explore markets & relax"
            ],
            "Manali": [
                "Day 1: Local sightseeing",
                "Day 2: Solang Valley adventure",
                "Day 3: Snow activities & cafes"
            ],
            "Hampi": [
                "Day 1: Temple exploration",
                "Day 2: Ruins & heritage walk",
                "Day 3: Sunset viewpoint"
            ],
            "Paris": [
                "Day 1: Eiffel Tower & city tour",
                "Day 2: Museums & cafes",
                "Day 3: Shopping & river cruise"
            ]
        };

        let plan = plans[place] || ["Custom trip coming soon"];

        list.innerHTML = `<h3>${place} Itinerary</h3>`;

        plan.forEach(day => {
            let li = document.createElement("li");
            li.textContent = day;
            list.appendChild(li);
        });

    }, 1000);
}