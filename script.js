/* =========================================================
   PROSOUND KENYA
   PHASE 3 BUSINESS SOFTWARE
========================================================= */


/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {

    whatsappNumber: "254791489541",

    businessName: "ProSound Kenya",

    currency: "KSh"

};


/* =========================================================
   EQUIPMENT DATABASE
========================================================= */

const equipment = [

    {
        id: 1,

        name: "Professional 15\" Speaker",

        category: "speakers",

        price: 3500,

        available: true,

        description:
            "High-power speaker suitable for churches, weddings and outdoor events.",

        image:
            "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80"
    },


    {
        id: 2,

        name: "Powered PA Speaker",

        category: "speakers",

        price: 4500,

        available: true,

        description:
            "Powered PA speaker with built-in amplification for events and presentations.",

        image:
            "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?auto=format&fit=crop&w=900&q=80"
    },


    {
        id: 3,

        name: "16 Channel Mixer",

        category: "mixers",

        price: 3000,

        available: true,

        description:
            "Professional mixer for managing multiple microphones and instruments.",

        image:
            "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80"
    },


    {
        id: 4,

        name: "Wireless Microphone",

        category: "microphones",

        price: 1500,

        available: true,

        description:
            "Reliable wireless microphone system for speeches, worship and performances.",

        image:
            "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80"
    },


    {
        id: 5,

        name: "Power Amplifier",

        category: "amplifiers",

        price: 2500,

        available: true,

        description:
            "Professional power amplifier designed for high-output sound systems.",

        image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80"
    },


    {
        id: 6,

        name: "Professional Keyboard",

        category: "keyboards",

        price: 4000,

        available: true,

        description:
            "Performance keyboard suitable for church services and live events.",

        image:
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80"
    }

];


/* =========================================================
   LOCAL STORAGE
========================================================= */

const STORAGE_KEYS = {

    rentals: "prosound_rentals",

    repairs: "prosound_repairs",

    quotes: "prosound_quotes",

    customers: "prosound_customers"

};


function getData(key) {

    return JSON.parse(
        localStorage.getItem(key)
    ) || [];

}


function saveData(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderEquipment();

        populateRentalEquipment();

        setupNavigation();

        setupEquipmentFilters();

        setupRentalCalculator();

        setupForms();

        setupBackToTop();

    }
);


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

    const menuToggle =
        document.getElementById("menuToggle");

    const nav =
        document.getElementById("mainNav");


    menuToggle.addEventListener(
        "click",
        () => {

            nav.classList.toggle("active");

        }
    );


    nav.querySelectorAll("a").forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove("active");

                }
            );

        }
    );

}


/* =========================================================
   EQUIPMENT RENDER
========================================================= */

let currentCategory = "all";


function renderEquipment(
    search = "",
    category = currentCategory
) {

    const grid =
        document.getElementById("equipmentGrid");


    let filtered =
        equipment.filter(item => {

            const matchesCategory =
                category === "all" ||
                item.category === category;


            const matchesSearch =
                item.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    if (!filtered.length) {

        grid.innerHTML = `
            <div class="empty-state">
                No equipment found.
            </div>
        `;

        return;

    }


    grid.innerHTML =
        filtered.map(item => `

            <article class="equipment-card">

                <div
                    class="equipment-image"
                    style="
                        background-image:
                        url('${item.image}');
                    "
                >

                    <span class="availability">

                        ${
                            item.available
                            ? "● Available"
                            : "● Unavailable"
                        }

                    </span>

                </div>


                <div class="equipment-body">

                    <span class="equipment-category">
                        ${item.category}
                    </span>

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${item.description}
                    </p>


                    <div class="equipment-footer">

                        <span class="price">

                            KSh
                            ${item.price.toLocaleString()}

                            <small>/day</small>

                        </span>


                        <button
                            class="details-btn"
                            onclick="showEquipment(${item.id})"
                        >
                            Details
                        </button>

                    </div>

                </div>

            </article>

        `).join("");

}


/* =========================================================
   EQUIPMENT SEARCH
========================================================= */

function setupEquipmentFilters() {

    const search =
        document.getElementById(
            "equipmentSearch"
        );


    search.addEventListener(
        "input",
        () => {

            renderEquipment(
                search.value,
                currentCategory
            );

        }
    );


    document
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".filter-btn"
                        )
                        .forEach(btn =>
                            btn.classList.remove(
                                "active"
                            )
                        );


                    button.classList.add(
                        "active"
                    );


                    currentCategory =
                        button.dataset.category;


                    renderEquipment(
                        search.value,
                        currentCategory
                    );

                }
            );

        });

}


/* =========================================================
   EQUIPMENT MODAL
========================================================= */

function showEquipment(id) {

    const item =
        equipment.find(
            equipment =>
                equipment.id === id
        );


    if (!item) return;


    const modal =
        document.getElementById(
            "equipmentModal"
        );


    const content =
        document.getElementById(
            "modalContent"
        );


    content.innerHTML = `

        <span class="section-label">
            ${item.category}
        </span>

        <h2 style="margin:10px 0;">
            ${item.name}
        </h2>

        <img
            src="${item.image}"
            alt="${item.name}"
            style="
                width:100%;
                height:250px;
                object-fit:cover;
                border-radius:12px;
                margin:15px 0;
            "
        >

        <p style="color:#777;margin-bottom:20px;">
            ${item.description}
        </p>

        <h3 style="margin-bottom:20px;">
            KSh ${item.price.toLocaleString()} / day
        </h3>

        <button
            class="btn btn-primary"
            onclick="
                selectEquipmentForRental(${item.id});
                closeModal();
            "
        >
            Rent This Equipment
        </button>

    `;


    modal.classList.add("active");

}


function closeModal() {

    document
        .getElementById("equipmentModal")
        .classList.remove("active");

}


function selectEquipmentForRental(id) {

    const select =
        document.getElementById(
            "rentalEquipment"
        );


    select.value = id;


    document
        .getElementById("rentals")
        .scrollIntoView({
            behavior: "smooth"
        });


    calculateRental();

}


/* =========================================================
   RENTAL EQUIPMENT SELECT
========================================================= */

function populateRentalEquipment() {

    const select =
        document.getElementById(
            "rentalEquipment"
        );


    equipment.forEach(item => {

        const option =
            document.createElement(
                "option"
            );


        option.value = item.id;

        option.textContent =
            `${item.name} — KSh ${item.price.toLocaleString()}/day`;


        select.appendChild(option);

    });

}


/* =========================================================
   RENTAL CALCULATOR
========================================================= */

function setupRentalCalculator() {

    [
        "rentalEquipment",
        "rentalStart",
        "rentalEnd"
    ].forEach(id => {

        document
            .getElementById(id)
            .addEventListener(
                "change",
                calculateRental
            );

    });

}


function calculateRental() {

    const equipmentId =
        Number(
            document.getElementById(
                "rentalEquipment"
            ).value
        );


    const start =
        document.getElementById(
            "rentalStart"
        ).value;


    const end =
        document.getElementById(
            "rentalEnd"
        ).value;


    const totalElement =
        document.getElementById(
            "rentalTotal"
        );


    if (!equipmentId || !start || !end) {

        totalElement.textContent =
            "KSh 0";

        return;

    }


    const selected =
        equipment.find(
            item =>
                item.id === equipmentId
        );


    const startDate =
        new Date(start);


    const endDate =
        new Date(end);


    const difference =
        endDate - startDate;


    let days =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );


    if (days < 1) days = 1;


    const total =
        selected.price * days;


    totalElement.textContent =
        `KSh ${total.toLocaleString()}`;

}


/* =========================================================
   FORMS
========================================================= */

function setupForms() {

    document
        .getElementById("rentalForm")
        .addEventListener(
            "submit",
            handleRental
        );


    document
        .getElementById("repairForm")
        .addEventListener(
            "submit",
            handleRepair
        );


    document
        .getElementById("quoteForm")
        .addEventListener(
            "submit",
            handleQuote
        );

}


/* =========================================================
   RENTAL REQUEST
========================================================= */

function handleRental(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "rentalName"
        ).value;


    const phone =
        document.getElementById(
            "rentalPhone"
        ).value;


    const equipmentId =
        Number(
            document.getElementById(
                "rentalEquipment"
            ).value
        );


    const start =
        document.getElementById(
            "rentalStart"
        ).value;


    const end =
        document.getElementById(
            "rentalEnd"
        ).value;


    const location =
        document.getElementById(
            "rentalLocation"
        ).value;


    const selected =
        equipment.find(
            item =>
                item.id === equipmentId
        );


    if (!selected) {

        alert(
            "Please select equipment."
        );

        return;

    }


    const startDate =
        new Date(start);


    const endDate =
        new Date(end);


    let days =
        Math.ceil(
            (endDate - startDate) /
            (1000 * 60 * 60 * 24)
        );


    if (days < 1) days = 1;


    const total =
        selected.price * days;


    const rental = {

        id: Date.now(),

        type: "Rental",

        name,

        phone,

        equipment:
            selected.name,

        start,

        end,

        location,

        days,

        total,

        status: "Pending",

        createdAt:
            new Date().toLocaleString()

    };


    const rentals =
        getData(
            STORAGE_KEYS.rentals
        );


    rentals.push(rental);


    saveData(
        STORAGE_KEYS.rentals,
        rentals
    );


    saveCustomer(
        name,
        phone
    );


    const message = `

Hello ${CONFIG.businessName},

I would like to request equipment rental.

Name: ${name}
Phone: ${phone}

Equipment: ${selected.name}

Start Date: ${start}
End Date: ${end}

Location: ${location || "Not specified"}

Estimated Total:
KSh ${total.toLocaleString()}

Please confirm availability.

    `;


    openWhatsApp(message);


    event.target.reset();


    document.getElementById(
        "rentalTotal"
    ).textContent = "KSh 0";


    alert(
        "Rental request saved successfully."
    );

}


/* =========================================================
   REPAIR REQUEST
========================================================= */

function handleRepair(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "repairName"
        ).value;


    const phone =
        document.getElementById(
            "repairPhone"
        ).value;


    const equipmentType =
        document.getElementById(
            "repairEquipment"
        ).value;


    const problem =
        document.getElementById(
            "repairProblem"
        ).value;


    const repair = {

        id: Date.now(),

        type: "Repair",

        name,

        phone,

        equipment:
            equipmentType,

        problem,

        status: "Received",

        createdAt:
            new Date().toLocaleString()

    };


    const repairs =
        getData(
            STORAGE_KEYS.repairs
        );


    repairs.push(repair);


    saveData(
        STORAGE_KEYS.repairs,
        repairs
    );


    saveCustomer(
        name,
        phone
    );


    const message = `

Hello ${CONFIG.businessName},

I would like to request equipment repair.

Name: ${name}
Phone: ${phone}

Equipment:
${equipmentType}

Problem:
${problem}

Please advise on diagnosis and estimated repair cost.

    `;


    openWhatsApp(message);


    event.target.reset();


    alert(
        "Repair request submitted successfully."
    );

}


/* =========================================================
   QUOTE REQUEST
========================================================= */

function handleQuote(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "quoteName"
        ).value;


    const phone =
        document.getElementById(
            "quotePhone"
        ).value;


    const eventType =
        document.getElementById(
            "eventType"
        ).value;


    const guests =
        document.getElementById(
            "guestCount"
        ).value;


    const message =
        document.getElementById(
            "quoteMessage"
        ).value;


    const selectedEquipment =
        Array.from(
            document.querySelectorAll(
                ".quote-equipment:checked"
            )
        ).map(
            checkbox =>
                checkbox.value
        );


    const quote = {

        id: Date.now(),

        type: "Quote",

        name,

        phone,

        eventType,

        guests,

        equipment:
            selectedEquipment,

        message,

        status: "Pending",

        createdAt:
            new Date().toLocaleString()

    };


    const quotes =
        getData(
            STORAGE_KEYS.quotes
        );


    quotes.push(quote);


    saveData(
        STORAGE_KEYS.quotes,
        quotes
    );


    saveCustomer(
        name,
        phone
    );


    const whatsappMessage = `

Hello ${CONFIG.businessName},

I would like a quotation.

Name: ${name}
Phone: ${phone}

Event Type: ${eventType}

Guests: ${guests || "Not specified"}

Equipment Required:
${
    selectedEquipment.length
        ? selectedEquipment.join(", ")
        : "Not specified"
}

Additional Information:
${message || "None"}

Please provide a quotation.

    `;


    openWhatsApp(
        whatsappMessage
    );


    event.target.reset();


    alert(
        "Quote request saved successfully."
    );

}


/* =========================================================
   CUSTOMER DATABASE
========================================================= */

function saveCustomer(
    name,
    phone
) {

    const customers =
        getData(
            STORAGE_KEYS.customers
        );


    const exists =
        customers.some(
            customer =>
                customer.phone === phone
        );


    if (!exists) {

        customers.push({

            id: Date.now(),

            name,

            phone,

            createdAt:
                new Date().toLocaleString()

        });


        saveData(
            STORAGE_KEYS.customers,
            customers
        );

    }

}


/* =========================================================
   WHATSAPP
========================================================= */

function openWhatsApp(message) {

    const encoded =
        encodeURIComponent(
            message.trim()
        );


    const url =
        `https://wa.me/${CONFIG.whatsappNumber}?text=${encoded}`;


    window.open(
        url,
        "_blank"
    );

}


/* =========================================================
   DASHBOARD
========================================================= */

function openDashboard() {

    updateDashboard();


    document
        .getElementById(
            "dashboardOverlay"
        )
        .classList.add("active");

}


function closeDashboard() {

    document
        .getElementById(
            "dashboardOverlay"
        )
        .classList.remove("active");

}


/* =========================================================
   DASHBOARD STATISTICS
========================================================= */

function updateDashboard() {

    const rentals =
        getData(
            STORAGE_KEYS.rentals
        );


    const repairs =
        getData(
            STORAGE_KEYS.repairs
        );


    const quotes =
        getData(
            STORAGE_KEYS.quotes
        );


    const revenue =
        rentals.reduce(
            (
                total,
                rental
            ) =>
                total +
                Number(
                    rental.total || 0
                ),
            0
        );


    document.getElementById(
        "dashboardEquipment"
    ).textContent =
        equipment.length;


    document.getElementById(
        "dashboardRentals"
    ).textContent =
        rentals.length;


    document.getElementById(
        "dashboardRepairs"
    ).textContent =
        repairs.length;


    document.getElementById(
        "dashboardQuotes"
    ).textContent =
        quotes.length;


    document.getElementById(
        "dashboardRevenue"
    ).textContent =
        `KSh ${revenue.toLocaleString()}`;


    renderActivity(
        rentals,
        repairs,
        quotes
    );

}


/* =========================================================
   DASHBOARD ACTIVITY
========================================================= */

function renderActivity(
    rentals,
    repairs,
    quotes
) {

    const container =
        document.getElementById(
            "activityList"
        );


    const activities = [

        ...rentals.map(item => ({
            type: "Rental",
            name: item.name,
            description:
                item.equipment,
            date:
                item.createdAt
        })),

        ...repairs.map(item => ({
            type: "Repair",
            name: item.name,
            description:
                item.equipment,
            date:
                item.createdAt
        })),

        ...quotes.map(item => ({
            type: "Quote",
            name: item.name,
            description:
                item.eventType,
            date:
                item.createdAt
        }))

    ];


    activities.sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );


    const latest =
        activities.slice(0, 10);


    if (!latest.length) {

        container.innerHTML = `

            <div class="empty-state">
                No business activity yet.
            </div>

        `;

        return;

    }


    container.innerHTML =
        latest.map(item => `

            <div class="activity-item">

                <div>

                    <strong>
                        ${item.type}
                    </strong>

                    <div>
                        ${item.name}
                        — ${item.description}
                    </div>

                </div>

                <small>
                    ${item.date}
                </small>

            </div>

        `).join("");

}


/* =========================================================
   CLEAR DEMO DATA
========================================================= */

function clearBusinessData() {

    const confirmed =
        confirm(
            "Delete all demo rentals, repairs, quotes and customers?"
        );


    if (!confirmed) return;


    Object.values(
        STORAGE_KEYS
    ).forEach(key => {

        localStorage.removeItem(
            key
        );

    });


    updateDashboard();


    alert(
        "Demo business data cleared."
    );

}


/* =========================================================
   BACK TO TOP
========================================================= */

function setupBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.classList.add(
                    "show"
                );

            } else {

                button.classList.remove(
                    "show"
                );

            }

        }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =========================================================
   CLOSE MODAL ON BACKGROUND CLICK
========================================================= */

document.addEventListener(
    "click",
    event => {

        const modal =
            document.getElementById(
                "equipmentModal"
            );


        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModal();

            closeDashboard();

        }

    }
);