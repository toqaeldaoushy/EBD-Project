# Cashly (Milestone 0)

**Course:** Electronic Business Development (BINF 503)  
**Semester:** Winter 2025  
**Instructor:** Dr. Nourhan Hamdi  
**Teaching Assistants:** Mr. Nour Gaser, Mr. Omar Alaa  

---

## 1. Team Members

| Name             | Student ID | Tutorial Group | GitHub Username               |
|------------------|------------|----------------|-------------------------------|
| Toqa Eldaoushy   | 13007068   | T3             | @toqaeldaoushy                |
| Alya Mandour     | 13007246   | T3             | @alyamandour                  |
| Sara Samer       | 13002628   | T3             | @sarasamersamir               |
| Sarah Ahmed      | 13007752   | T7             | @Sarah19queen                 |
| Malak Abdelnabi  | 13002687   | T7             | @malakabdelnabi               |
| Sarah Samy       | 13006900   | T7             | @sarahhsamyy2000-a11y         |

---

## 2. Project Description

### **Concept**
 
**Cashly** is a digital wallet and card-based FinTech application inspired by *Telda*. The platform enables users to create an account, manage their wallet balance, track spending, send and receive money, and control a virtual/physical debit card. The app aims to simplify financial management for young users by offering a secure, fast, and intuitive way to make payments and monitor financial activity.

The project focuses on delivering a clean and responsive MERN-stack implementation with proper data handling, authentication, card logic, and transaction management.
### **Link to Fin-Tech Course Document**
- *https://fintech-egypt.com/FinTechEgypt2023/Landscape-Report-2023-En-digital.pdf*  
- *https://telda.app/*

---

## 3. Feature Breakdown

### **3.1 Full Scope (Complete Product Vision)**

- User registration & secure login  
- Wallet dashboard (balance, outgoing/incoming analytics)  
- Send & receive money instantly  
- Transaction history with filtering  
- Card management (freeze/unfreeze, view card details)  
- Virtual card creation  
- Spending categories & monthly budget insights  
- Add money / top up (bank transfer, card)  
- Notifications (transactions, warnings)  
- Profile settings (update personal info)  
- Security center (2FA, device management)  
- Request money / split payments  
- In-app customer support chat  
- Admin dashboard (fraud detection, logs)  

---

### **3.2 Selected MVP Use Cases (Course Scope)**

The MVP includes **6 use cases**:

## 3.3 User Stories for MVP Use Cases

### **1. User Authentication (Registration/Login)**
- **As a new user, I want to create an account, so that I can start using Cashly.**
- **As a returning user, I want to log in securely, so that I can access my wallet and card.**
- **As a user, I want my password to be encrypted, so that my data remains safe.**
- **As a user, I want to stay logged in using a token, so that I don’t have to log in every time.**

---

### **2. Wallet Dashboard (Balance + Basic Analytics)**
- **As a user, I want to see my current wallet balance, so that I always know how much money I have.**
- **As a user, I want to view a summary of my recent transactions, so that I can understand my financial activity.**
- **As a user, I want simple insights (incoming vs outgoing), so that I can track my spending habits.**

---

### **3. Send Money (P2P Transfer Between Users)**
- **As a user, I want to send money to another user, so that I can make quick peer-to-peer payments.**
- **As a user, I want the app to validate the transfer amount, so that I cannot send more money than I have.**
- **As a user, I want to confirm the receiver’s identity, so that I do not send money to the wrong person.**

---

### **4. Transaction History (View, Filter, Sort)**
- **As a user, I want to view all my past transactions, so that I can track my financial activity.**
- **As a user, I want to filter transactions by type (sent/received), so that I can easily find what I need.**
- **As a user, I want to sort transactions by date, so that I can review my spending over time.**

---

### **5. Card Management (Freeze/Unfreeze + Last 4 Digits)**
- **As a user, I want to freeze my card, so that I can secure it if it is lost or stolen.**
- **As a user, I want to unfreeze my card easily, so that I can use it again when needed.**
- **As a user, I want to see only the last four digits of my card, so that my full card number stays private.**

---

### **6. User Profile Management (Update Name/Email/Password)**
- **As a user, I want to update my personal information, so that I can keep my account details accurate.**
- **As a user, I want to change my password, so that I can maintain my account security.**
- **As a user, I want to edit my email or phone number, so that I can stay reachable and verify my identity.**

---

## 4. Feature Assignments (Accountability)

| Team Member      | Assigned Use Case         | Responsibility Description                                       |
|------------------|---------------------------|------------------------------------------------------------------|
| Toqa Eldaoushy   | User Authentication       | Register, Login, JWT auth, password hashing, validation.         |
| Sarah Samy       | Wallet Dashboard          | Fetch balance, basic analytics, show recent activity.            |
| Alya Mandour     | Send Money                | Transfer logic, balance update, validation, create transactions. |
| Malak Abdelnabi  | Transaction History       | Fetch transactions, filtering by type/date, sorting.             |
| Sarah Ahmed      | Card Management           | Freeze/unfreeze card, display last 4 digits securely.            |
| Sara Samer       | User Profile Management   | Update user info, change password, input validation.             |

---

## 5. Data Model (Initial Schemas)

### **User Schema**

```javascript
const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  card: {
    numberLast4: { type: String },
    isFrozen: { type: Boolean, default: false }
  },
}, { timestamps: true });

const TransactionSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["send", "receive"], required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const CardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  numberLast4: { type: String, required: true },
  isFrozen: { type: Boolean, default: false }
}, { timestamps: true });


