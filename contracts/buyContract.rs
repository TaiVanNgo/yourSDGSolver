#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod buy_contract {
    #[ink(storage)]
    pub struct BuyContract {
        price: Balance,   // Price of the item in the contract
        balance: Balance, // Total balance of the contract
    }

    impl BuyContract {
        /// Constructor to initialize the contract with a price.
        #[ink(constructor)]
        pub fn new(price: Balance) -> Self {
            Self {
                price,
                balance: 0,
            }
        }

        /// A payable function to buy an item. Requires sending at least the set price.
        #[ink(message, payable)]
        pub fn buy(&mut self, amount: Balance) {
            let transferred_value = self.env().transferred_value();
            assert!(transferred_value >= self.price * amount, "Insufficient funds.");
            self.balance += transferred_value;

            self.env().emit_event(Purchase {
                buyer: self.env().caller(),
                amount: transferred_value,
            });
        }

        /// Getter function to retrieve the total balance of the contract.
        #[ink(message)]
        pub fn get_balance(&self) -> Balance {
            self.balance
        }

        /// Getter function to retrieve the price of the item.
        #[ink(message)]
        pub fn get_price(&self) -> Balance {
            self.price
        }

        /// Setter function to update the price of the item.
        #[ink(message)]
        pub fn set_price(&mut self, new_price: Balance) {
            self.price = new_price;
        }
    }

    /// Event emitted when a purchase is made.
    #[ink(event)]
    pub struct Purchase {
        #[ink(topic)]
        buyer: AccountId,
        #[ink(topic)]
        amount: Balance,
    }
}
