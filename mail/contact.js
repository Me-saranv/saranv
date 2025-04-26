emailjs.init("saranv91@outlook.com"); // Initialize EmailJS with your credentials

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const templateParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    emailjs.send("saranv91@outlook.com", "YOUR_TEMPLATE_ID", templateParams)
    .then(response => {
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset();
    })
    .catch(error => {
        alert("Error sending message. Please try again!");
    });
});
