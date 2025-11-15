// backend/seed.js
require("dotenv").config();
const connectDB = require("./config/db");
const Query = require("./models/Query");

async function seed() {
  try {
    await connectDB();

    const sample = [
      {
        name: "Udhaya",
        email: "udhaya@example.com",
        channel: "email",
        message: "I need a refund for order #123, please help",
        type: "refund",
        priority: "high",
      },
      {
        name: "Shri",
        email: "shri@example.com",
        channel: "twitter",
        message: "App crashes when I login, please fix",
        type: "bug",
        priority: "urgent",
      },
      {
        name: "Prasanth",
        email: "prasanth@example.com",
        channel: "website",
        message: "How to change my shipping address?",
        type: "question",
        priority: "medium",
      },
      {
        name: "Dharaneesh",
        email: "dharaneesh@example.com",
        channel: "instagram",
        message: "Feature request: please add dark mode",
        type: "feature_request",
        priority: "low",
      },
      {
        name: "Karthi",
        email: "karthi@example.com",
        channel: "whatsapp",
        message: "Payment failed but money deducted - urgent",
        type: "payment_issue",
        priority: "urgent",
      },

      {
        name: "Meena",
        email: "meena@example.com",
        channel: "facebook",
        message: "Where can I download my invoices?",
        type: "question",
        priority: "medium",
      },
      {
        name: "Arun",
        email: "arun@example.com",
        channel: "email",
        message: "Tracking link not updating for 5 days",
        type: "complaint",
        priority: "high",
      },
      {
        name: "Nandhini",
        email: "nandhu@example.com",
        channel: "live_chat",
        message: "I want to upgrade my subscription plan",
        type: "request",
        priority: "medium",
      },
      {
        name: "Deepak",
        email: "deepak@example.com",
        channel: "twitter",
        message: "Great product! But the UI is confusing.",
        type: "feedback",
        priority: "low",
      },
      {
        name: "Monish",
        email: "monish@example.com",
        channel: "website",
        message: "Forgot password link not working",
        type: "bug",
        priority: "high",
      },

      {
        name: "Varsha",
        email: "varsha@example.com",
        channel: "instagram",
        message: "Can I change my email in the account?",
        type: "question",
        priority: "medium",
      },
      {
        name: "Sriram",
        email: "sriram@example.com",
        channel: "email",
        message: "Your support team has not replied yet",
        type: "complaint",
        priority: "high",
      },
      {
        name: "Lavanya",
        email: "lavanya@example.com",
        channel: "linkedin",
        message: "Do you offer API access for developers?",
        type: "question",
        priority: "low",
      },
      {
        name: "Kavin",
        email: "kavin@example.com",
        channel: "whatsapp",
        message: "I placed two orders accidentally, cancel one",
        type: "cancellation",
        priority: "urgent",
      },
      {
        name: "Rohit",
        email: "rohit@example.com",
        channel: "twitter",
        message: "The new update made the app very slow",
        type: "complaint",
        priority: "high",
      },

      {
        name: "Harini",
        email: "harini@example.com",
        channel: "email",
        message: "Is cash on delivery available?",
        type: "question",
        priority: "low",
      },
      {
        name: "Sathish",
        email: "sathish@example.com",
        channel: "website",
        message: "My account got locked, need recovery",
        type: "account_issue",
        priority: "high",
      },
      {
        name: "Vicky",
        email: "vicky@example.com",
        channel: "facebook",
        message: "Do you have a student discount program?",
        type: "question",
        priority: "low",
      },
      {
        name: "Gokul",
        email: "gokul@example.com",
        channel: "instagram",
        message: "Your ad has a spelling mistake 😅",
        type: "feedback",
        priority: "low",
      },
      {
        name: "Preethi",
        email: "preethi@example.com",
        channel: "live_chat",
        message: "Need immediate support for business account",
        type: "priority_support_request",
        priority: "urgent",
      },

      {
        name: "Akash",
        email: "akash@example.com",
        channel: "email",
        message: "I want to delete my account permanently",
        type: "request",
        priority: "medium",
      },
      {
        name: "Janani",
        email: "janani@example.com",
        channel: "twitter",
        message: "My coupon code is not working",
        type: "complaint",
        priority: "medium",
      },
      {
        name: "Sujith",
        email: "sujith@example.com",
        channel: "instagram",
        message: "App freezes when uploading a photo",
        type: "bug",
        priority: "high",
      },
      {
        name: "Sangeetha",
        email: "sangee@example.com",
        channel: "email",
        message: "I want GST invoice for my last purchase",
        type: "request",
        priority: "medium",
      },
      {
        name: "Bharath",
        email: "bharath@example.com",
        channel: "whatsapp",
        message: "Refund still not processed after 7 days",
        type: "refund",
        priority: "high",
      },

      {
        name: "Naveen",
        email: "naveen@example.com",
        channel: "twitter",
        message: "Why am I getting too many notification emails?",
        type: "complaint",
        priority: "low",
      },
      {
        name: "Sona",
        email: "sona@example.com",
        channel: "linkedin",
        message: "Can we collaborate for a marketing project?",
        type: "request",
        priority: "low",
      },
      {
        name: "Harish",
        email: "harish@example.com",
        channel: "email",
        message: "Order delivered but product missing",
        type: "complaint",
        priority: "urgent",
      },
      {
        name: "Nisha",
        email: "nisha@example.com",
        channel: "facebook",
        message: "Can I reschedule my delivery date?",
        type: "request",
        priority: "medium",
      },
      {
        name: "Ragul",
        email: "ragul@example.com",
        channel: "website",
        message: "My search results are not loading",
        type: "bug",
        priority: "medium",
      },

      {
        name: "Divya",
        email: "divya@example.com",
        channel: "instagram",
        message: "Love the app! But please add wishlist sync.",
        type: "feature_request",
        priority: "low",
      },
      {
        name: "Sarath",
        email: "sarath@example.com",
        channel: "email",
        message: "I need help with login via Google",
        type: "account_issue",
        priority: "high",
      },
      {
        name: "Kishore",
        email: "kishore@example.com",
        channel: "live_chat",
        message: "I want bulk pricing details for enterprise",
        type: "priority_support_request",
        priority: "urgent",
      },
      {
        name: "Mithra",
        email: "mithra@example.com",
        channel: "twitter",
        message: "I found a typo in your pricing page",
        type: "feedback",
        priority: "low",
      },
    ];

    await Query.deleteMany({});
    const inserted = await Query.insertMany(sample);

    console.log(`Seed complete → Inserted ${inserted.length} records`);
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();
