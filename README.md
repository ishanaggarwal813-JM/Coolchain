# ❄️ CoolChain – Solar-Powered Micro Cold Storage

> **Store Smarter. Sell Better. Waste Less.**

CoolChain is a solar-powered micro cold-storage prototype designed to help smallholder farmers store perishable agricultural produce and manage storage bookings through a simple digital platform.

The project demonstrates a web-based cold-storage dashboard, an estimated storage cost calculator, a basic mandi price forecast, and a reservation management system backed by Node.js, Express.js and SQLite.

**Project Type:** AgriTech | Climate Resilience | Hackathon Prototype

---

## 🌱 Problem Statement

Smallholder farmers often have limited access to affordable cold-storage facilities. Perishable fruits and vegetables may need to be sold soon after harvesting because farmers lack suitable storage options.

This can lead to post-harvest losses and limit farmers' ability to choose when to sell their produce.

CoolChain proposes a distributed network of small, solar-powered cold-storage units near farming communities, supported by a digital booking and monitoring platform.

## 💡 Our Solution

CoolChain aims to make cold storage more accessible through:

* ☀️ Solar-powered micro cold-storage units
* ❄️ Temperature-controlled storage concept
* 📦 Pay-per-use storage booking
* 📊 Storage monitoring dashboard
* 📈 Basic mandi price forecast demonstration
* 🚚 Multiple delivery options
* 🗄️ Digital booking and reservation management
* 🔋 Solar power and battery monitoring concept

The broader project concept proposes modular storage units with capacities of approximately **500 kg to 2 MT**, deployed near farm clusters.

## 🚀 Features

### 1. 📊 Storage Monitoring Dashboard

The web dashboard displays storage-related parameters, including:

* Temperature
* Humidity
* Solar power generation
* Battery percentage

The current prototype uses simulated sensor readings to demonstrate the dashboard. Physical IoT sensors and real-time telemetry are planned for future versions.

### 2. 📈 Mandi Price Forecast

The prototype provides a basic price forecast demonstration.

Users can:

* Select a crop.
* Enter its current market price.
* View an estimated future price.

The current implementation applies a fixed 10% increase to the entered price. It is a simple JavaScript calculation, **not a trained AI or machine learning model**.

### 3. 📦 Cold Storage Booking

Farmers can submit their storage requirements using the booking form.

Booking information includes:

* Farmer name
* Crop type
* Quantity in kilograms
* Storage duration
* Delivery mode
* Estimated total cost

The frontend calculates the estimated cost using the selected quantity, duration and delivery option.

### 4. 🗄️ Online Booking Management

The application connects the frontend to a Node.js and Express.js backend through REST API endpoints.

When a booking is submitted:

1. The frontend collects the booking details.
2. JavaScript sends the information to the Express API.
3. The backend processes the request.
4. Booking information is stored in SQLite.
5. The application receives a booking confirmation.
6. The reservation table refreshes to display saved bookings.

### 5. 📋 Reservation Dashboard

The Recent Reservations section retrieves booking records from the SQLite database and displays:

* Booking ID
* Farmer name
* Crop
* Quantity
* Storage duration
* Delivery mode
* Total cost
* Displayed booking status

### 6. 📱 Mobile-First UI Concept

A separate mobile-oriented prototype demonstrates a farmer-facing interface with home, booking, storage tracking, mandi prices and operator screens.

This is a separate frontend concept and does not currently share the main application's backend booking integration.

## 🛠️ Technology Stack

| Component         | Technology       |
| ----------------- | ---------------- |
| Frontend          | HTML5            |
| Styling           | CSS3             |
| Client-side logic | JavaScript       |
| UI utilities      | Tailwind CSS CDN |
| Icons             | Font Awesome     |
| Backend           | Node.js          |
| Web framework     | Express.js       |
| Database          | SQLite3          |
| Communication     | REST API         |
| Data format       | JSON             |

## 🏗️ System Architecture

```text
        Farmer / User
              |
              v
       HTML + CSS UI
              |
              v
        JavaScript
              |
              v
       Express.js API
              |
              v
        Node.js Server
              |
              v
        SQLite Database
              |
              v
       Saved Bookings
              |
              v
    Reservation Dashboard
```

The mandi price calculation and sensor simulation currently run in the frontend and are separate from the booking API.

## 📁 Project Structure

```text
CoolChain/
│
├── public/
│   └── index.html
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
│
└── coolchain.db
```

The `coolchain.db` file is generated by the application when the database is initialized. It is not necessary to commit a local database containing test or personal booking information.

## ⚙️ Installation and Setup

### Prerequisites

Install the following:

* Node.js
* npm
* Git (optional, for cloning the repository)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/CoolChain.git
cd CoolChain
```

### 2. Initialize the Project

If `package.json` is not already included:

```bash
npm init -y
```

### 3. Install Dependencies

```bash
npm install express sqlite3
```

### 4. Configure the Project

Make sure the project follows this structure:

```text
CoolChain/
├── public/
│   └── index.html
├── server.js
└── package.json
```

The Express server serves the frontend from the `public` directory.

### 5. Start the Server

```bash
node server.js
```

The application will run locally at:

**http://localhost:3000**

Open the URL in your browser to access the CoolChain dashboard.

## 🔗 REST API

### Get All Bookings

**Endpoint**

```http
GET /api/bookings
```

Returns the stored booking records from the SQLite database in JSON format.

### Create a Booking

**Endpoint**

```http
POST /api/bookings
```

**Content-Type**

```http
application/json
```

**Example Request**

```json
{
  "farmer_name": "Rahul",
  "crop_type": "Tomato",
  "quantity": 100,
  "duration": 48,
  "delivery_mode": "farm_pickup",
  "total_cost": 300
}
```

**Successful Response**

The backend returns HTTP `201 Created` with a confirmation message and the newly created booking details, including its booking ID.

**Error Handling**

The current backend returns an HTTP `400` response when required fields are missing and an HTTP `500` response when a database operation fails.

## 💰 Estimated Cost Calculation

The main prototype uses the following storage pricing concept:

**Storage cost = Quantity × (Duration / 24)**

The current storage rate is ₹1 per kg per 24 hours.

Delivery charges in the current frontend are:

| Delivery Mode   | Charge |
| --------------- | -----: |
| Farm Pickup     |   ₹100 |
| Self Drop-off   |     ₹0 |
| Local Transport |   ₹150 |

**Example**

For 100 kg of produce stored for 48 hours with self drop-off:

```text
Storage Cost = 100 × (48 / 24)
             = ₹200

Delivery Cost = ₹0

Estimated Total = ₹200
```

These are prototype estimates, not confirmed commercial tariffs.

## 🔄 How CoolChain Works

1. **Book Storage:** The farmer enters the crop and storage requirements.
2. **Calculate Cost:** The frontend estimates the storage and delivery charges.
3. **Submit Booking:** The booking information is sent to the Express API.
4. **Save Data:** The backend inserts the booking into SQLite.
5. **Generate Booking ID:** A unique booking reference is generated.
6. **View Reservation:** The dashboard retrieves the saved booking and displays it in the reservation table.

The broader project vision also includes dropping off produce, monitoring storage conditions and choosing an appropriate selling time based on market information.

## 🌍 Expected Impact

CoolChain is designed to support:

* Smallholder farmers growing perishable crops
* Local mandi traders and aggregators
* Farmer Producer Organizations (FPOs)
* Village-level cold-storage operators

The proposed distributed model aims to reduce spoilage, improve storage access, support informed selling-time decisions and encourage solar-powered operation.

These are intended outcomes of the concept and have not yet been measured through a real-world deployment.

## 🔮 Future Scope

The following features are planned for future development:

* 🌡️ Real IoT temperature and humidity sensors
* 📡 Live sensor telemetry and automatic alerts
* 🤖 A trained ML-based mandi price prediction model
* 📱 A dedicated farmer mobile application
* 📞 IVR support for feature-phone users
* 💳 UPI payment integration
* 📍 GPS-based nearest cold-storage discovery
* 🚚 Route optimization for produce pickup
* ☁️ Cloud database and deployment
* 🔐 User authentication and role-based access
* 📊 Advanced analytics and operator dashboard
* 🔋 Real-time solar energy and battery monitoring

## 🔒 Current Limitations

CoolChain is currently a hackathon prototype, not a production-ready cold-storage management system.

* Sensor readings are simulated rather than obtained from physical IoT devices.
* Price forecasting uses a fixed percentage calculation instead of a trained ML model.
* Payments are not processed through a real payment gateway.
* User authentication and role-based permissions are not implemented.
* The displayed reservation status does not represent a verified physical storage state.
* Storage availability and market prices are not connected to live external data sources.

## 👨‍💻 Project Status

**Status: Prototype / Hackathon Project**

The current implementation demonstrates the frontend dashboard, booking form, estimated cost calculation, basic price forecast, simulated monitoring, Express REST API and SQLite-based booking storage.

The broader solar cold-storage network, physical sensor integration and machine learning capabilities remain part of the future development plan.

## 🎯 Vision

> **Store Smarter. Sell Better. Waste Less.**

CoolChain aims to bring affordable, solar-powered micro cold storage closer to farming communities and help smallholder farmers manage their perishable produce more effectively.

---

## 🤝 Contributing

Contributions and suggestions are welcome.

You can help improve the project by working on:

* Frontend and mobile UI
* Backend API and database
* IoT sensor integration
* Data analytics and price forecasting
* Security and validation
* Documentation and testing

For significant changes, please open an issue to discuss the proposed improvement before submitting a pull request.

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub.

**CoolChain — Smart Storage • Solar Energy • Better Prices**
