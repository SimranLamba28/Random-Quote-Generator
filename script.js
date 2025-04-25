const quoteText= document.getElementById("quote");
const author= document.getElementById("author");
const newQuoteBtn= document.getElementById("new-quote");
const copy = document.querySelector(".bx.bx-copy");
const tweetbtn = document.getElementById("twt-link");


async function fetchQuote() {
    try{
        quoteText.textContent="Loading...";
        author.textContent= "";

        const response= await fetch("https://api.quotable.io/random");
        const data= await response.json();
        quoteText.textContent= `"${data.content}"`;
        author.textContent= `-${data.author}`;
    } catch(error){
        quoteText.textContent="Failed to fetch quote";
        author.textContent="";
        console.error("error fetching quote: ", error);
    }
}

copy.addEventListener("click", () => {
    const textToCopy= `${quoteText.textContent} ${author.textContent}`;
    navigator.clipboard.writeText(textToCopy).then(()=>{
        //alert("quote copied");
    })
    .catch((error) => {
        console.error("clipboard error", error);
    });
});

const updatetweet= () => {
    const text=`${quoteText.textContent} ${author.textContent}`;
    const tweeturl=`https://twitter.com/intent/tweet?text=${text}`;
    tweetbtn.href= tweeturl;
};

newQuoteBtn.addEventListener("click", () =>{
    fetchQuote();
    updatetweet();
});

tweetbtn.addEventListener("click", updatetweet);
