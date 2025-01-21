#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet_contracts::weights::Weight;

#[ink::contract]
mod buy_contract {

    #[ink(storage)]
    pub struct BuyContract {
        pub price: u128,    // Price of the item in the contract
        pub balance: u128,  // Total balance of the contract
        pub seller_balance: u128, // Seller balance in the contract
    }

    impl BuyContract {
        #[ink(constructor)]
        pub fn new(price: u128) -> Self {
            Self {
                price,
                balance: 0,
                seller_balance: 0,
            }
        }

        #[ink(message)]
        pub fn buy(&mut self, amount: u128) {
            assert!(amount >= self.price, "Insufficient funds.");
            self.balance += amount;
            self.seller_balance += amount;
        }

        #[ink(message)]
        pub fn sell(&mut self, amount: u128) -> Result<(), &'static str> {
            // Ensure the seller has enough balance
            if self.seller_balance < amount {
                return Err("Insufficient seller balance.");
            }
            
            // Deduct the balance from the seller's account
            self.seller_balance -= amount;

            // Transfer the funds back to the seller
            // For this example, we'll assume we just record the transaction and don’t handle the actual transfer of funds.
            // In practice, you'd have to handle fund transfers via your blockchain framework (Substrate).
            self.balance -= amount;

            Ok(())
        }

        #[ink(message)]
        pub fn get_balance(&self) -> u128 {
            self.balance
        }

        #[ink(message)]
        pub fn get_price(&self) -> u128 {
            self.price
        }

        #[ink(message)]
        pub fn get_seller_balance(&self) -> u128 {
            self.seller_balance
        }
    }
}
