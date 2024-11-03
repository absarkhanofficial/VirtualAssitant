let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)

    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "hi-GB"
    window.speechSynthesis.speak(text_speak)
}

function wishMe() {
    let day = new Date()
    let hours = day.getHours()
    console.log(hours)
    if (hours >= 0 && hours < 12) {
        speak("Good morning sir")
    }
    else if (hours >= 12 && hours < 18) {
        speak("Good after noon sir")
    }
    else {
        speak("Good evening sir")
    }
}

window.addEventListener('load', () => {
    wishMe()
})

let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    console.log(event)
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click", () => {
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})

function takeCommand(message) {
    btn.style.display = "flex"
    voice.style.display = "none"
    if (message.includes("hello") || message.includes("hey") || message.includes("hi")) {
        speak("Hello Sir what can i help you?")
    }
    else if (message.includes("Who are you?") || (message.includes("Tum kaun ho?"))) {
        speak("I am a virtual assistant made by Absar Sir")
    } else if (message.includes("Open Youtube")) {
        speak("Opening youtube")
        window.open("https://www.youtube.com/", "_blank")
    }
    else if (message.includes("Open Google")) {
        speak("Opening Google")
        window.open("https://www.google.com/", "_blank")
    }
    else if (message.includes("Open Instagram")) {
        speak("Opening Instagram")
        window.open("https://www.instagram.com/", "_blank")
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
        speak(time)
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" })
        speak(date)
    }
    else {
        speak(`This is what i found on internet regarding ${message}`)
        window.open(`https://www.google.com/search?q=${message}`)
    }
}