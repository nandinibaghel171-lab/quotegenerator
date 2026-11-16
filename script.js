
let history = JSON.parse(localStorage.getItem("quoteHistory")) || [];

// Generate random quote
async function getQuote() {

    const quoteElement = document.getElementById("quote");
    const authorElement = document.getElementById("author");

    quoteElement.innerText = "Loading...";
    authorElement.innerText = "";

    try {

        const response = await fetch(
            "https://dummyjson.com/quotes/random"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch quote");
        }

        const data = await response.json();

        quoteElement.innerText = data.quote;
        authorElement.innerText = "— " + data.author;

        // Save quote in history
        let newQuote = {
            quote: data.quote,
            author: data.author
        };

        history.unshift(newQuote);

        localStorage.setItem(
            "quoteHistory",
            JSON.stringify(history)
        );

        displayHistory();

    } catch (error) {

        quoteElement.innerText =
            "Something went wrong! Please try again.";

        authorElement.innerText = "";

        console.log(error);
    }
}


// Display quote history
function displayHistory() {

    const historyDiv = document.getElementById("history");

    historyDiv.innerHTML = "";

    if (history.length === 0) {
        historyDiv.innerHTML =
            '<p class="empty">Your saved quotes will appear here.</p>';
        return;
    }

    history.forEach(function(item) {

        let div = document.createElement("div");

        div.className = "history-item";

        let quoteText = document.createElement("p");
        quoteText.innerText = "❝ " + item.quote;

        let authorText = document.createElement("h4");
        authorText.innerText = "— " + item.author;

        div.appendChild(quoteText);
        div.appendChild(authorText);

        historyDiv.appendChild(div);

    });
}


// Copy quote
function copyQuote() {

    const quote = document.getElementById("quote").innerText;
    const author = document.getElementById("author").innerText;

    if (author === "" || quote === "Loading...") {
        return;
    }

    navigator.clipboard.writeText(
        quote + "\n" + author
    ).then(function() {
        alert("Quote copied successfully!");
    });

}


// Load saved history
displayHistory();
