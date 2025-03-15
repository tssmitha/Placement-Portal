// Define interfaces for better type-checking and scalability
export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

export interface SubTopic {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

export interface Section {
  id: string;
  name: string;
  description: string;
  icon: string;
  subTopics?: SubTopic[]; // Optional as some sections may not have sub-topics
}

// Define the sections with nested sub-topics and questions
const sections: Section[] = [
  {
    id: "aptitude",
    name: "Aptitude",
    description: "Various aptitude-related quizzes.",
    icon: "calculator-outline",
    subTopics: [
      {
        id: "math",
        name: "Math",
        description: "Basic arithmetic and number problems.",
        questions: [
          {
            id: "q1",
            question: "What is 5 + 7?",
            options: ["10", "11", "12", "13"],
            answer: "12",
          },
          {
            id: "q2",
            question: "What is 15 * 3?",
            options: ["30", "45", "60", "50"],
            answer: "45",
          },
        ],
      },
      {
        id: "logic",
        name: "Logic",
        description: "Logical reasoning and patterns.",
        questions: [
          {
            id: "q1",
            question: "Which shape comes next in the sequence?",
            options: ["Circle", "Square", "Triangle", "Hexagon"],
            answer: "Triangle",
          },
          {
            id: "q2",
            question: "If 2 is to 4, then 3 is to?",
            options: ["6", "8", "7", "5"],
            answer: "6",
          },
        ],
      },
      // Add other sub-topics as needed
    ],
  },
  {
    id: "os",
    name: "Operating Systems",
    description: "Test your knowledge of OS fundamentals.",
    icon: "desktop-outline",
  },
  {
    id: "cn",
    name: "Computer Networks",
    description: "Explore the world of networks and protocols.",
    icon: "wifi-outline",
  },
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    description: "Strengthen your problem-solving skills.",
    icon: "code-slash-outline",
  },
];

export default sections;
