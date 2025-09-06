import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Setup Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

const faqs = {
  "program": "Iron Lady offers leadership programs focused on women empowerment, confidence building, and career growth.",
  "duration": "The duration varies, typically between 6 weeks to 3 months depending on the program.",
  "online": "The programs are conducted both online and offline for flexibility.",
  "offline": "The programs are conducted both online and offline for flexibility.",
  "certificate": "Yes, certificates are provided upon successful completion of the program.",
  "mentor": "The mentors are industry leaders, certified coaches, and experienced professionals.",
  "coach": "The mentors are industry leaders, certified coaches, and experienced professionals.",
  "mission": "The mission of Iron Lady is to empower individuals, especially women, to become strong leaders and achieve their fullest potential.",
  "eligibility": "There are no strict eligibility criteria. The programs are designed for students, professionals, and aspiring leaders at different stages of their journey.",
  "register": "You can register through the Iron Lady website or contact their admissions team for guidance.",
  "fee": "Yes, there is a program fee which depends on the specific course you choose. Scholarships or discounts may be available in some cases.",
  "skills": "You will learn leadership skills, communication, confidence building, career management, and personal growth strategies.",
  "career": "Yes, Iron Lady programs include mentorship, networking, and guidance to help you grow in your career.",
  "unique": "Iron Lady focuses on practical leadership skills, personalized coaching, and a supportive community, making it stand out from traditional leadership courses.",
  "hi": "Hello ! Ask me anything about Iron Lady’s leadership programs.",
  "hello": "Hi there! How can I help you today?",
  "thanks": "You're welcome! ",
  "bye": "Goodbye! Have a great day "
};

// 🔹 Simple keyword search
function findAnswer(userMsg) {
  const lowerMsg = userMsg.toLowerCase();

  for (const keyword in faqs) {
    if (lowerMsg.includes(keyword)) {
      return faqs[keyword];
    }
  }
  return null;
}

// 🔹 Chat API
app.post("/chat", (req, res) => {
  const { message } = req.body;
  const answer = findAnswer(message);

  if (answer) {
    res.json({ reply: answer });
  } else {
    res.json({
      reply:
        "I can answer questions about Iron Lady programs. Try asking about duration, mentors, format, certificates, fees, or registration. 😊"
    });
  }
});

// Start server
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
