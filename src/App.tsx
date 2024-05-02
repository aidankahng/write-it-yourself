import { useEffect } from "react";
import "./main.css";



const RANDOM_QUOTE_URL = "https://api.quotable.io/random";

function App() {

    const handleInputChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        const currentInputArray: string[] = (document.getElementById('input-text') as HTMLTextAreaElement).value.split('')
        const quoteArray: NodeListOf<HTMLSpanElement> | HTMLSpanElement[] = document.getElementById('target-text')?.querySelectorAll('span') || [document.createElement('span')]
        quoteArray.forEach((charSpan, index) => {
            const char = currentInputArray[index]
            if (char == null) {
                charSpan.className = ''
            } else if (char == charSpan.innerText) {
                charSpan.className = 'correct'
            } else {
                charSpan.className = 'incorrect'
            }
        })

    }


    useEffect(() => {
        function getRandomQuote() {
            return fetch(RANDOM_QUOTE_URL)
                .then(response => response.json())
                .then(data => data.content)
        }
        async function getNextQuote() {
            const quote:string = await getRandomQuote();
            const docQuote: HTMLElement = document.getElementById('target-text')!;
            console.log(docQuote.innerHTML)
            quote.split('').forEach(char => {
                const charSpan:HTMLSpanElement = document.createElement('span');
                charSpan.innerText = char
                docQuote.appendChild(charSpan)
            })
        }
        getNextQuote();
    },[])



    return (
        <>
            <div className="container">
                <p id="target-text" className="target-text not-selectable">
                    
                </p>
                <textarea
                    spellCheck='false'
                    autoFocus
                    name="input-text"
                    id="input-text"
                    className="input-text"
                    onChange={handleInputChange}
                    cols={30}
                    rows={10}
                ></textarea>
            </div>
        </>
    );
}

export default App;
