import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

// ----------
import { useConnect, useAccount } from 'wagmi'
import { metaMask } from 'wagmi/connectors'

const { connect } = useConnect({
  connector: metaMask(),
})

const { address, isConnected } = useAccount()

if (!isConnected) {
  connect()
} else {
  console.log("User wallet address:", address)
  fetchUserRole(address)  // Once wallet is connected, fetch the user role
}

// ------------------------

async function fetchUserRole(walletAddress) {
    try {
      const response = await fetch('https://your-backend.com/api/getUserRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: walletAddress }),  // Send the wallet address
      })
  
      const data = await response.json()
  
      if (data.role) {
        console.log("User role:", data.role)  // 'buyer' or 'seller'
        // Now, you can update the UI based on the role (e.g., redirect user or show dashboard)
      } else {
        console.log("Role not found in database")
      }
    } catch (error) {
      console.error("Error fetching user role:", error)
    }
  }

  


//   -------

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')

app.use(bodyParser.json())

const uri = 'mongodb://your-mongo-db-uri'
const client = new MongoClient(uri)

app.post('/api/getUserRole', async (req, res) => {
  const { address } = req.body  // Wallet address sent from the frontend

  try {
    await client.connect()
    const db = client.db('your-database')
    const collection = db.collection('users')

    // Find the user by wallet address
    const user = await collection.findOne({ walletAddress: address })

    if (user) {
      res.json({ role: user.role })  // Assuming 'role' is either 'buyer' or 'seller'
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    console.error("Error fetching user role:", error)
    res.status(500).json({ message: 'Server error' })
  } finally {
    await client.close()
  }
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})



// --------------
if (data.role === 'buyer') {
    // Redirect to the buyer's dashboard or show buyer-specific UI
    window.location.href = '/buyer-dashboard'
  } else if (data.role === 'seller') {
    // Redirect to the seller's dashboard or show seller-specific UI
    window.location.href = '/seller-dashboard'
  } else {
    console.log('Role not found, show error message')
  }
  