#![no_std]

use soroban_sdk::{symbol_short, token, Address, IntoVal, Val, Vec};
use soroban_sdk::{contract, contractimpl, Env};

#[contract]
pub struct VoucherEscrowContract;

#[contractimpl]
impl VoucherEscrowContract {

    fn get_usdc_from_user(e: Env, from: Address, usdc_address: Address, amount: i128) {        
        let token = token::Client::new(&e, &usdc_address);
        let contract_address = e.current_contract_address();
        
        token.transfer(&from, &contract_address, &amount);
    }
    
    fn mint_voucher_tokens_to_user(e: Env, to: Address, voucher_token_address: Address, amount: i128) {
        let result: Val = e.invoke_contract(&voucher_token_address, &symbol_short!("mint"), Vec::from_array(&e, [*to.as_val(), amount.into_val(&e)]));
    }
    
    fn get_voucher_tokens_from_user(e: Env, from: Address, voucher_token_address: Address, amount: i128) {
        let token = token::Client::new(&e, &voucher_token_address);
        let contract_address = e.current_contract_address();
        
        token.transfer(&from, &contract_address, &amount);
    }
    
    fn send_usdc_to_user(e: Env, from: Address, usdc_address: Address, amount: i128) {
        let token = token::Client::new(&e, &usdc_address);
        let contract_address = e.current_contract_address();

        token.transfer(&contract_address, &from, &amount);
    }

    pub fn get_usdc_and_mint_voucher_tokens(e: Env, from: Address, usdc_address: Address, voucher_address: Address, amount: i128) {
        from.require_auth();

        assert!(amount > 0, "Amount must be greater than zero");
        
        Self::get_usdc_from_user(e.clone(), from.clone(), usdc_address, amount);
        Self::mint_voucher_tokens_to_user(e, from, voucher_address, amount);
    }
    
    pub fn get_voucher_tokens_and_send_usdc(e: Env, from: Address, usdc_address: Address, voucher_address: Address, amount: i128) {
        from.require_auth();

        assert!(amount > 0, "Amount must be greater than zero");

        Self::get_voucher_tokens_from_user(e.clone(), from.clone(), voucher_address, amount);
        Self::send_usdc_to_user(e, from, usdc_address, amount);
    }

    pub fn get_usdc_balance_contract(e: Env, usdc_address: Address) -> i128 {
        let token = token::Client::new(&e, &usdc_address);
        let contract_address = e.current_contract_address();
        token.balance(&contract_address)
    }

    pub fn get_voucher_balance_contract(e: Env, voucher_address: Address) -> i128 {
        let token = token::Client::new(&e, &voucher_address);
        let contract_address = e.current_contract_address();
        token.balance(&contract_address)
    }
}