const quoteContainer = document.getElementById('quote-container'); 
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader'); 

let apiQuotes = []; 

// loading function to show loading 
function loading() {
  loader.hidden = false; 
  quoteContainer.hidden = true; 
}
// hide loading 
function complete() {
  quoteContainer.hidden = false; 
  loader.hidden = true; 
}


//show new quote 
function newQuote() {
  loading(); 
  // pick random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // if author field is blank/null
  if (!quote.author) {
    authorText.textContent = "Unknown"; 
  } else {
    authorText.textContent = quote.author; 
  }
  //check quote length for styling 
  if (quote.text.length > 80 ) {
    quoteText.classList.add('long-quote'); 
  } else {
    quoteText.classList.remove('long-quote'); 
  }
  // set quote and hide loader
  quoteText.textContent = quote.text; 
  complete(); 
}

// get quotes from API 
async function getQuotes() {
  loading(); 
  const apiUrl = 'https://type.fit/api/quotes'; 
  try {
    const response = await fetch(apiUrl); 
    apiQuotes = await response.json(); 
    console.log(apiUrl); 
    newQuote(); 
  } catch (error) {
    //catch error here
  }
}

//tweet quoet 
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent} `; 
  window.open(twitterUrl, '_blank'); 
}

//event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener('click', tweetQuote); 

// on load 
getQuotes(); 
//loading(); 
