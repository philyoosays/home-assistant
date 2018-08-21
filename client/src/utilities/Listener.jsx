const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
// const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList

let recognition = new SpeechRecognition();
recognition.lang = 'en-US'
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const Listener = { recognition, SpeechRecognitionEvent }

export default Listener;
