# 🌿 HerbalChain - Blockchain-based Ayurvedic Herb Traceability

## 📌 Project Overview
HerbalChain is a blockchain-powered system to track Ayurvedic herbs from their source (farmers or wild collectors) to the final formulation. It ensures transparency, geo-tagging, and traceability at every stage of the supply chain, preventing fraud and ensuring authenticity.

## ✨ Key Features
- 🌱 **Geo-tagged Batch Creation:** Collectors create herb batches with GPS location and metadata using a mobile app.
- 🔗 **Blockchain Traceability:** Hyperledger Fabric records batches and events immutably on a distributed ledger.
- 📦 **Processing History:** Every drying, testing, and packaging event is linked to the original batch.
- 🌐 **Consumer Dashboard:** Users can search batch IDs and see the complete history of the herb.
- 📱 **Mobile App:** Collectors can submit batch data directly from the field with real-time location.

## 🛠️ Tech Stack
- **Backend:** Node.js, Express, Fabric Network SDK
- **Blockchain:** Hyperledger Fabric (Chaincode in JavaScript)
- **Mobile:** React Native (Expo), Expo Location
- **Frontend:** React.js, Axios
- **Database:** Hyperledger Fabric Ledger (World State)

## 📲 Project Structure
