document.addEventListener("DOMContentLoaded", () => {
    fetch('assets/quotes.json')
        .then(response => response.json())
        .then(quotes => {
            const randomQuote = quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)];
            document.querySelector(".quote-text").innerText = `"${randomQuote.quote}"`;
            document.querySelector(".quote-author").innerText = `- ${randomQuote.author}`;
        })
        .catch(error => console.error('Error:', error));
});

document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.1, 
        }
    );

    projectCards.forEach((card) => {
        observer.observe(card);
    });
});