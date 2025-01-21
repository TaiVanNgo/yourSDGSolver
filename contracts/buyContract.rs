#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet_contracts::weights::Weight;

#[ink::contract]
mod buy_contract {

    #[ink(storage)]
    pub struct BuyContract {
        pub price: u128,    // Price of the item in the contract
        pub balance: u128,  // Total balance of the contract
    }

    impl BuyContract {
        #[ink(constructor)]
        pub fn new(price: u128) -> Self {
            Self {
                price,
                balance: 0,
            }
        }

        #[ink(message)]
        pub fn buy(&mut self, amount: u128) {
            assert!(amount >= self.price, "Insufficient funds.");
            self.balance += amount;
        }

        #[ink(message)]
        pub fn get_balance(&self) -> u128 {
            self.balance
        }

        #[ink(message)]
        pub fn get_price(&self) -> u128 {
            self.price
        }
    }
}
