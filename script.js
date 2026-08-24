// ==========================================
// JOB DATA
// ==========================================

const jobCards = document.querySelectorAll(".job-card");

const jobSearch = document.getElementById("jobSearch");
const locationSearch = document.getElementById("locationSearch");

const searchBtn = document.getElementById("searchBtn");

const jobType = document.getElementById("jobType");
const sortJobs = document.getElementById("sortJobs");

const jobsGrid = document.getElementById("jobsGrid");
const noResults = document.getElementById("noResults");


// ==========================================
// SEARCH JOBS
// ==========================================

function filterJobs() {

    const searchValue =
        jobSearch.value.toLowerCase().trim();

    const locationValue =
        locationSearch.value.toLowerCase().trim();

    const typeValue =
        jobType.value;

    let visibleJobs = 0;

    jobCards.forEach(card => {

        const title =
            card.dataset.title.toLowerCase();

        const location =
            card.dataset.location.toLowerCase();

        const type =
            card.dataset.type;

        const matchesSearch =
            title.includes(searchValue);

        const matchesLocation =
            location.includes(locationValue);

        const matchesType =
            typeValue === "all" ||
            type === typeValue;

        if (
            matchesSearch &&
            matchesLocation &&
            matchesType
        ) {

            card.style.display = "block";

            visibleJobs++;

            card.style.animation =
                "cardIn 0.5s ease both";

        } else {

            card.style.display = "none";

        }

    });


    if (visibleJobs === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


// Search button
searchBtn.addEventListener("click", filterJobs);


// Enter key
jobSearch.addEventListener("keyup", event => {

    if (event.key === "Enter") {
        filterJobs();
    }

});


// Live search
jobSearch.addEventListener("input", filterJobs);

locationSearch.addEventListener("input", filterJobs);

jobType.addEventListener("change", filterJobs);


// ==========================================
// QUICK SEARCH
// ==========================================

function quickSearch(keyword) {

    jobSearch.value = keyword;

    filterJobs();

    document
        .getElementById("jobs")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// SAVE JOB
// ==========================================

const saveButtons =
    document.querySelectorAll(".save-btn");


saveButtons.forEach((button, index) => {

    const savedJobs =
        JSON.parse(
            localStorage.getItem("savedJobs") || "[]"
        );

    if (savedJobs.includes(index)) {

        button.classList.add("saved");

        button.innerHTML =
            '<i class="fa-solid fa-bookmark"></i>';

    }


    button.addEventListener("click", () => {

        button.classList.toggle("saved");

        const isSaved =
            button.classList.contains("saved");


        button.innerHTML = isSaved

            ? '<i class="fa-solid fa-bookmark"></i>'

            : '<i class="fa-regular fa-bookmark"></i>';


        let jobs =
            JSON.parse(
                localStorage.getItem("savedJobs") || "[]"
            );


        if (isSaved) {

            if (!jobs.includes(index)) {
                jobs.push(index);
            }

            showToast("Job saved!");

        } else {

            jobs =
                jobs.filter(item => item !== index);

            showToast("Job removed");

        }


        localStorage.setItem(
            "savedJobs",
            JSON.stringify(jobs)
        );

    });

});


// ==========================================
// APPLY BUTTON
// ==========================================

const applyButtons =
    document.querySelectorAll(".apply-btn");


applyButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.innerHTML =
            '<i class="fa-solid fa-check"></i> Applied';

        button.style.background = "#dcfce7";
        button.style.color = "#16a34a";

        showToast("Application submitted!");

    });

});


// ==========================================
// TOAST
// ==========================================

const toast =
    document.getElementById("toast");


let toastTimer;


function showToast(message) {

    toast.querySelector("span").textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ==========================================
// DARK / LIGHT MODE
// ==========================================

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    const isDark =
        document.body.classList.contains("dark");


    themeBtn.innerHTML = isDark

        ? '<i class="fa-solid fa-sun"></i>'

        : '<i class="fa-solid fa-moon"></i>';


    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

});


// Load saved theme
if (
    localStorage.getItem("theme") === "dark"
) {

    document.body.classList.add("dark");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


// ==========================================
// ANIMATED STATISTICS
// ==========================================

const counters =
    document.querySelectorAll("[data-target]");


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;


                const counter =
                    entry.target;

                const target =
                    Number(counter.dataset.target);

                let current = 0;

                const increment =
                    Math.max(1, Math.ceil(target / 80));


                const updateCounter = () => {

                    current += increment;


                    if (current >= target) {

                        counter.textContent =
                            target.toLocaleString();

                        return;

                    }


                    counter.textContent =
                        current.toLocaleString();


                    requestAnimationFrame(
                        updateCounter
                    );

                };


                updateCounter();

                observer.unobserve(counter);

            });

        },
        {
            threshold: 0.5
        }
    );


counters.forEach(counter => {

    observer.observe(counter);

});


// ==========================================
// SORT JOBS
// ==========================================

sortJobs.addEventListener("change", () => {

    const cards =
        Array.from(
            document.querySelectorAll(".job-card")
        );


    if (sortJobs.value === "salary") {

        cards.sort(
            (a, b) =>
                Number(b.dataset.salary) -
                Number(a.dataset.salary)
        );

    }


    if (sortJobs.value === "latest") {

        cards.reverse();

    }


    cards.forEach(card => {

        jobsGrid.appendChild(card);

    });

});


// ==========================================
// CTA SCROLL
// ==========================================

function scrollToJobs() {

    document
        .getElementById("jobs")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// MOBILE MENU
// ==========================================

const menuBtn =
    document.getElementById("menuBtn");


menuBtn.addEventListener("click", () => {

    showToast("Mobile navigation coming soon!");

});
