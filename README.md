# 🎤 VoiceBuddy: Real-Time Voice Auction System

**VoiceBuddy** is a real-time, voice-powered auction system powered by the **OmniDimension Voice Agent**. Users can browse auction items, hear item details, and place bids using natural language.

## 🧠 Features

- 🔊 Voice assistant powered by OmniDimension
- 📦 Product listings with dynamic bid updates
- 🗳️ Real-time bid placement via API or voice
- 📈 Admin dashboard to monitor live bids and auctions
- 📡 Deployed on Render.com

## 🚀 Live Demo

**Backend**: [https://voice-auction-backend.onrender.com](https://voice-auction-backend.onrender.com)

### API Endpoints

| Method | Endpoint                        | Description                          |
|--------|----------------------------------|--------------------------------------|
| GET    | `/products`                     | List all auction products            |
| POST   | `/bid`                          | Place a bid on a product             |
| GET    | `/bids?user=VoiceUser`          | Get bids placed by a user            |

## 📁 Project Structure

```
voice-auction-backend/
├── models/
│   └── productModel.js
├── routes/
│   └── auctionRoutes.js
├── public/
│   └── dashboard.html
├── scripts/
│   └── dashboard.js
├── data/
│   └── products.json
├── server.js
├── package.json
└── README.md
```

## 📦 Installation

```bash
git clone https://github.com/your-username/voice-auction-backend.git
cd voice-auction-backend
npm install
npm start
```

Make sure your `products.json` file exists inside the `/data` folder with sample products.

## 🎯 Sample Product Format

```json
[
  {
    "productId": "P001",
    "name": "iPhone 15 Pro",
    "description": "Latest Apple flagship phone",
    "startingPrice": 75000,
    "currentBid": 78000
  }
]
```

## 🛠️ Tech Stack

- Node.js + Express.js
- JSON file for data persistence
- OmniDimension Voice Agent
- Render.com for deployment
- HTML/CSS Dashboard UI

## 🧠 Voice Agent Integration (OmniDimension)

Webhook used:
- **GET**: `/products` for available items
- **POST**: `/bid` with `productId` and `bidAmount` as strings

Example request:
```json
{
  "productId": "P001",
  "bidAmount": "80000"
}
```

## 🧪 Testing (Example cURL)

```bash
curl -X POST https://voice-auction-backend.onrender.com/bid   -H "Content-Type: application/json"   -d "{"productId":"P001","bidAmount":"90000"}"
```

## 🖼️ Dashboard

Visit the `/` route on your deployed Render backend to see a live bid dashboard.

---

## ✅ To Improve

- [ ] Add MongoDB or PostgreSQL for data persistence
- [ ] Implement authentication
- [ ] Support bid history per user
- [ ] Add countdown timer for auctions

## 📬 Contact

For any queries or help, reach out via [LinkedIn](https://linkedin.com/kanimozhi-kathirvel) or drop a GitHub issue.
