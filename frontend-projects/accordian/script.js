const accordionData = [
  {
    question: "What is roadmap.sh?",
    answer:
      "roadmap.sh is a community effort to create learning paths, guides, project ideas, and other similar content to help developers grow in their careers.",
  },
  {
    question: "What are the plans for roadmap.sh?",
    answer:
      "The goal of roadmap.sh is to continue providing quality content and expanding into more areas of software development, and adding new features based on community feedback.",
  },
  {
    question: "How is roadmap.sh built?",
    answer:
      "roadmap.sh is built using modern web development technologies, including JavaScript frameworks and libraries, backend technologies, and cloud-based infrastructure.",
  },
  {
    question: "Can I use roadmap.sh in my team?",
    answer:
      "Yes, roadmap.sh is designed to be versatile and team-friendly. Teams can use it to structure their learning and development programs, assign relevant paths to team members, and track their progress in skill-building.",
  },
  {
    question: "How can I create custom roadmaps?",
    answer: "Currently, roadmap.sh offers predefined learning paths, but custom roadmap creation features are in development.",
  },
  {
    question: "Is roadmap.sh really 7th most starred project on GitHub?",
    answer:
      "Yes, roadmap.sh is one of the top-starred projects on GitHub. This recognition reflects the community's appreciation for its usefulness in guiding developers and structuring their learning journeys.",
  },
];

accordionData.forEach((item, index) => {
  // Create article element
  const article = document.createElement("article");
  article.classList.add("accordion-item");

  // Create button element
  const button = document.createElement("button");
  button.classList.add("accordion-btn");
  button.innerHTML = `${item.question} <i class="fa-solid fa-caret-down"></i>`;
  article.appendChild(button);

  // Create content element
  const content = document.createElement("p");
  content.classList.add("accordion-content");
  content.textContent = item.answer;
  article.appendChild(content);

  // Append the article to the accordion container
  document.querySelector(".accordion").appendChild(article);

  // Display first item by default
  if (index === 0) {
    button.classList.add("active");
    content.style.display = "block";
  }

  // Add click event to toggle the content visibility
  button.addEventListener("click", () => {
    const isActive = button.classList.contains("active");
    const icon = button.querySelector("i");

    // Hide all content
    document.querySelectorAll(".accordion-btn").forEach((btn) => {
      btn.classList.remove("active");
      btn.nextElementSibling.style.display = "none";
      icon.classList.replace("fa-caret-up", "fa-caret-down");
    });

    // Display content if it's not active
    if (!isActive) {
      button.classList.add("active");
      content.style.display = "block";
      icon.classList.replace("fa-caret-down", "fa-caret-up");
    }
  });
});
