# 🛡 SafeWalk - AI-Powered Women’s Safety App

> 🚨 Built for the *Triwizardathon National Hackathon 2025*

*SafeWalk* is an AI/ML-powered mobile application designed to enhance personal safety for women in public spaces. Using real-time motion, audio, and camera input, the app intelligently detects distress and immediately triggers SOS alerts with live location sharing.

---

## 🚀 Features

- 🎙 *AI-Powered Distress Detection*  
  Uses sound classification (screams, distress tones) and motion patterns (running, sudden falls) to detect unsafe conditions.

- 📍 *Real-Time Location Tracking*  
  Continuously monitors and shares the user’s live location with trusted emergency contacts during alerts.

- 📞 *One-Tap SOS Trigger*  
  Instantly sends alerts via WhatsApp/SMS with the user’s location and emergency message.

- 👩‍👧‍👦 *Trusted Contact Management*  
  Users can save emergency contacts to notify instantly during threat situations.

- 🔐 *Secure Interface & Local Encryption*  
  Ensures user data privacy and safe local storage of sensitive contacts and history.

---

## 📱 Tech Stack

| Technology        | Purpose                          |
|------------------|----------------------------------|
| *React Native* | Cross-platform mobile development |
| *Firebase*     | Authentication, Realtime DB, Hosting |
| *TensorFlow.js*| AI/ML model inference (audio/motion) |
| *Expo*         | Quick prototyping and development |
| *Google Maps API* | Live geolocation and route sharing |

---

## 💡 Problem Statement

Women in India face safety challenges in public spaces. There's a need for *smart, accessible tech* that can proactively detect danger and *act instantly. SafeWalk bridges that gap using a unique blend of **AI + geolocation + emergency response*.

---

## 🧪 AI/ML Implementation

- *Custom TensorFlow Models* trained for:
  - Audio analysis (scream, panic tone detection)
  - Motion irregularity (fall/running spike)
- Models run directly on-device using *TensorFlow Lite* for speed and privacy.

---

## 🛠 Installation & Run Locally

1. *Clone the repo:*
   ```bash
   git clone https://github.com/NISHANT7-cmd/SAFEWALK.git
   cd safewalk