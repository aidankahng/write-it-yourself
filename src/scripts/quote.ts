const RANDOM_QUOTE_URL = "https://api.quotable.io/random";

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function getNextQuote() {
    const quote = await getRandomQuote()
    console.log(quote)
}

export {getNextQuote}