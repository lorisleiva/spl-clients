pub use anchor_lang::prelude::*;

pub use crate::errors::CandyGuardError;
pub use crate::instructions::mint::*;
pub use crate::state::CandyGuardData;

pub use bot_tax::BotTax;
pub use lamports_charge::LamportsCharge;
pub use live_date::LiveDate;
pub use spltoken_charge::SPLTokenCharge;
pub use whitelist::Whitelist;

mod bot_tax;
mod lamports_charge;
mod live_date;
mod spltoken_charge;
mod whitelist;

pub trait Condition {
    /// Validate the condition of the guard. When the guard condition is
    /// not satisfied, it will return an error.
    ///
    /// This function should not perform any modification to accounts, since
    /// other guards might fail, causing the transaction to be aborted.
    ///
    /// Intermediary evaluation data can be stored in the `evaluation_context`,
    /// which will be shared with other guards and reused in the `actions` step
    /// of the process.
    ///
    fn validate<'info>(
        &self,
        ctx: &Context<'_, '_, '_, 'info, Mint<'info>>,
        candy_guard_data: &CandyGuardData,
        evaluation_context: &mut EvaluationContext,
    ) -> Result<()>;

    /// Perform the action associated with the guard. This function only
    /// gets called when all guards have been successfuly validated.
    fn actions<'info>(
        &self,
        ctx: &Context<'_, '_, '_, 'info, Mint<'info>>,
        candy_guard_data: &CandyGuardData,
        evaluation_context: &EvaluationContext,
    ) -> Result<()>;
}

pub trait Guard: Condition + AnchorSerialize + AnchorDeserialize {
    /// Return the number of bytes used by the guard configuration.
    fn size() -> usize;

    /// Return the feature mask for the guard.
    fn mask() -> u64;

    /// Returns whether the guards is enabled or not on the specified features.
    fn is_enabled(features: u64) -> bool {
        features & Self::mask() > 0
    }

    /// Enable the guard on the specified `features` value.
    fn enable(features: u64) -> u64 {
        features | Self::mask()
    }

    /// Disable the guard on the specified `features` value.
    fn disable(features: u64) -> u64 {
        features & !Self::mask()
    }

    /// Serialize the guard into the specified data array.
    fn save(&self, data: &mut [u8], offset: usize) -> Result<()> {
        let mut result = Vec::with_capacity(Self::size());
        self.serialize(&mut result)?;

        data[offset..(result.len() + offset)].copy_from_slice(&result[..]);

        Ok(())
    }

    /// Deserializes the guard from a slice of data. Only attempts the deserialization
    /// if the data slice is large enough and the guard is enabled.
    fn load(features: u64, data: &mut [u8], offset: usize) -> Result<Option<Self>> {
        if offset <= data.len() && Self::is_enabled(features) {
            let mut slice = &data[offset - Self::size()..offset];
            let guard = Self::deserialize(&mut slice)?;
            Ok(Some(guard))
        } else {
            Ok(None)
        }
    }
}

pub struct EvaluationContext {
    /// Indicate whether the transaction was sent by the candy guard authority or not.
    pub is_authority: bool,
    /// The counter for the remaining account list. When a guard "consumes" one of the
    /// remaining accounts, it should increment the counter.
    pub remaining_account_counter: usize,
    // > live_date
    /// Indicates whether the transaction started before the live date.
    pub is_presale: bool,
    // > lamports_charge
    /// The amount to charge for the mint (this can be updated by the whitelist guard).
    pub lamports: u64,
    // > spltoken_charge
    /// The amount to charge for the mint (this can be updated by the whitelist guard
    /// when the `lamports_charge` is not in use).
    pub amount: u64,
    /// The index from the remaining accounts to find the token_account and
    /// transfer_authority_account
    pub spltoken_index: usize,
    // > whitelist
    /// Indicates whether the user is whitelisted or not.
    pub whitelist: bool,
    /// The index from the remaining accounts to find the whitelist_token_account,
    /// whitelist_token_mint and whitelist_burn_authority
    pub whitelist_index: usize,
}
