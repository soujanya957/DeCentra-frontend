document.addEventListener("DOMContentLoaded", () => {
    // Handle "Go to Dashboard" button click
    document.getElementById('to-dashboard')?.addEventListener('click', () => {
        console.log("Navigating to Dashboard");
        window.location.href = '/';  // Redirect to the dashboard (index.html)
    });

    // Handle "View Info" button click
    document.getElementById('to-info')?.addEventListener('click', () => {
        console.log("View Info button clicked");
        alert('Information about the project will be displayed here.');
    });

    // Handle "View Info" button click
    document.getElementById('api-function')?.addEventListener('click', () => {
        console.log("Some API function button clicked");
        alert('Information about the project will be displayed here.');
    });
});
});
