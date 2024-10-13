document.addEventListener("DOMContentLoaded", () => {
    // Auto scroll to the next section after 1 second
    // setTimeout(() => {
    //    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    //}, 10000);

    // Function to be executed when the button is pressed
    function handleButtonClick() {
        // Action to be defined later
        console.log("Button pressed!"); // This will log a message to the console
    }

    // Show the button when scrolling down
    window.onscroll = function() {
        const scrollToTopButton = document.getElementById("scroll-to-top");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopButton.style.display = "block"; // Show button
        } else {
            scrollToTopButton.style.display = "none"; // Hide button
        }
    };

    // Scroll to top function
    document.getElementById("scroll-to-top").addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
    });

    // Add event listener to the button
    document.getElementById('button-api').addEventListener('click', handleButtonClick);

    // Reveal dashboard on scroll and implement sticky header functionality
    window.addEventListener("scroll", () => {
        const dashboard = document.querySelector('.dashboard');
        const modelInfoSection = document.querySelector('.model-info');

        // Check if the user has scrolled past half the height of the modelInfo section
        if (window.scrollY > modelInfoSection.offsetTop - window.innerHeight / 1.5) {
            dashboard.style.display = 'block'; // Show dashboard
            dashboard.classList.add('reveal'); // Add reveal animation
            console.log("Dashboard is now visible.");
        }

        // Add 'sticky' class to header when scrolled down
        const header = document.querySelector("header");
        header.classList.toggle("sticky", window.scrollY > 0);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Model information to display 
    const modelInfo = {
        type: "Convolutional Neural Network",
        lossFunction: "CrossEntropyLoss",
        optimizer: "Adam",
        weights: [0.1, 0.2, 0.3, 0.4]
    };

    // Fallback data for hospital logs in case the fetch request fails
    const hospitalLogsFallback = [
        {
            hospital: "Hospital A",
            modelType: "ResNet",
            lossFunction: "MSELoss",
            optimizer: "SGD",
            weights: [0.05, 0.12, 0.23, 0.45],
            id: 1
        },
    ];

    // Function to update the model information section
    function updateModelInfo() {
        document.getElementById('model-type').textContent = modelInfo.type;
        document.getElementById('loss-function').textContent = modelInfo.lossFunction;
        document.getElementById('optimizer').textContent = modelInfo.optimizer;
        document.getElementById('weights').textContent = modelInfo.weights.join(", ");
    }

async function populateHospitalLogs() {
    const logEntries = document.getElementById('log-entries');
    logEntries.innerHTML = ''; // Clear previous entries

    try {
        console.log("Fetching hospital logs...");
        const response = await fetch('hospital_logs.json'); // Ensure this path is correct
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const logs = await response.json();
        console.log("Fetched logs:", logs);

        if (logs.length === 0) {
            const placeholderRow = document.createElement('tr');
            placeholderRow.innerHTML = `<td colspan="3">No log entries available. Please check back later.</td>`;
            logEntries.appendChild(placeholderRow);
        } else {
            logs.forEach(log => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${log.hospital}</td>
                    <td>${log.id}</td>
                    <td><a href="log-details.html?logId=${log.id}" class="view-more">View More</a></td>
                `;
                logEntries.appendChild(row);
                console.log("Appended log row:", row);
            });
        }
    } catch (error) {
        console.error('Error fetching logs:', error);
        console.log("Using fallback logs");

            // If fetch fails, use fallback data
            if (hospitalLogsFallback.length === 0) {
                const placeholderRow = document.createElement('tr');
                placeholderRow.innerHTML = `<td colspan="3">No log entries available. Please check back later.</td>`;
                logEntries.appendChild(placeholderRow);
            } else {
                hospitalLogsFallback.forEach(log => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${log.hospital}</td>
                        <td>${log.id}</td>
                        <td><a href="log-details.html?logId=${log.id}" class="view-more">View More</a></td>
                    `;
                    logEntries.appendChild(row);
                    console.log("Appended fallback log row:", row);
                });
            }
        }
    }

    // Initialize the page by updating model info and populating logs
    updateModelInfo();
    populateHospitalLogs();
});
