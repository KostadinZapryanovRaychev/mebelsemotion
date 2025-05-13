const header = document.querySelector("header");
const sectionOne = document.querySelector(".change-name");

const sectionOneOptions = {
  rootMargin: "-200px 0px 0px 0px",
};

const sectionOneObserver = new IntersectionObserver(function (
  entries,
  sectionOneObserver
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);

function sendEmailWithFormData() {
  const modalForm = document.getElementById("modal-form");
  const name = modalForm?.name?.value;
  const email = modalForm?.email?.value;
  const message = modalForm?.message?.value;

  if (!name || !email || !message) {
    console.error("Missing required fields");
    return;
  }

  try {
    const now = Date.now();
    const EMAIL_COOLDOWN_MS = 5000; // 5 seconds cooldown
    const lastEmailSentAt = 0; // Set this to track cooldown timing

    if (now - lastEmailSentAt < EMAIL_COOLDOWN_MS) {
      console.error("Please wait before sending another message.");
      return;
    }

    emailjs.init("YOUR_PUBLIC_KEY");

    const params = {
      to_email: "YOUR_EMAIL_TO",
      from_name: name,
      from_email: email,
      message: message,
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", params).then(
      () => {
        alert("Message sent successfully!");
      },
      (error) => {
        console.error("Error sending email:", error);
      }
    );
  } catch (e) {
    console.error("Error[sendEmailWithFormData]:", e);
  }
}


document.querySelectorAll(".current-year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
