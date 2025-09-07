import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Setup Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// Predefined FAQs
const faqs = {
  program: "Iron Lady offers leadership programs focused on women empowerment, confidence building, and career growth.",
  duration: "The duration varies, typically between 6 weeks to 3 months depending on the program.",
  online: "The programs are conducted both online 🌐 and offline 📍 for flexibility.",
  certificate: "Yes, certificates are provided upon successful completion of the program.",
  mentor: "The mentors are industry leaders, certified coaches, and experienced professionals.",
  mission: "The mission of Iron Lady is to empower individuals, especially women, to become strong leaders and achieve their fullest potential.",
  eligibility: "There are no strict eligibility criteria. Programs are designed for students, professionals, and aspiring leaders.",
  register: "You can register through the Iron Lady website or contact their admissions team for guidance.",
  fee: "Yes, there is a program fee which depends on the specific course you choose. Scholarships or discounts may be available.",
  skills: "You will learn leadership skills, communication, confidence building, career management, and personal growth strategies.",
  career: "Programs include mentorship, networking, and career guidance.",
  unique: "Iron Lady focuses on practical leadership skills, personalized coaching, and a supportive community.",
  hi: "Hello 👋! Ask me anything about Iron Lady programs.",
  thanks: "You're welcome!",
  bye: "Goodbye! Have a great day "
};

// Define keyword groups for each FAQ
const faqKeywords = {
  program: ["programs", "courses", "offer", "what do you offer","What programs does Iron Lady offer?"],
  duration: ["duration", "how long", "length", "time", "period", "duration of the program","What is the program duration?"],
  online: ["online", "offline", "mode", "format", "virtual", "in-person","Is the program online or offline"],
  certificate: ["certificate", "certificates", "certify", "credential","Are certificates provided?"],
  mentor: ["mentor", "mentors", "coach", "coaches", "guide", "who teaches","Who are the mentors/coaches?"],
  eligibility: ["eligibility", "criteria", "requirement", "who can join"],
  register: ["register", "registration", "sign up", "enroll"],
  fee: ["fee", "cost", "price", "charges", "payment"],
  skills: ["skills", "learning", "knowledge", "what will I learn"],
  career: ["career", "job", "employment", "placement"],
  mission: ["mission", "goal", "purpose", "vision"],
  hi: ["hi", "hello", "hey"],
  thanks: ["thanks", "thank you", "thank"],
  bye: ["bye", "goodbye", "see you"]
};

function findAnswer(userMsg) {
  const msg = userMsg.toLowerCase();

  for (const key in faqKeywords) {
    const keywords = faqKeywords[key];
    for (const word of keywords) {
      if (msg.includes(word)) {
        return faqs[key];
      }
    }
  }

  // fallback answer
  return "I can answer questions about Iron Lady programs. Try asking about program duration, mentors, format, certificates, fees, or registration. 😊";
}

// Chat API
app.post("/chat", (req, res) => {
  const { message } = req.body;
  const answer = findAnswer(message);
  res.json({ reply: answer });
});

// Start server
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
