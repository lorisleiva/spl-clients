/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  checkForIsWritableOverride as isWritable,
  mapSerializer,
  transactionBuilder,
} from '@metaplex-foundation/umi';

// Accounts.
export type ApproveTokenDelegateCheckedInstructionAccounts = {
  source: PublicKey;
  mint: PublicKey;
  delegate: PublicKey;
  owner: Signer;
};

// Arguments.
export type ApproveTokenDelegateCheckedInstructionData = {
  discriminator: number;
  amount: bigint;
  decimals: number;
};

export type ApproveTokenDelegateCheckedInstructionDataArgs = {
  amount: number | bigint;
  decimals: number;
};

export function getApproveTokenDelegateCheckedInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  ApproveTokenDelegateCheckedInstructionDataArgs,
  ApproveTokenDelegateCheckedInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    ApproveTokenDelegateCheckedInstructionDataArgs,
    ApproveTokenDelegateCheckedInstructionData,
    ApproveTokenDelegateCheckedInstructionData
  >(
    s.struct<ApproveTokenDelegateCheckedInstructionData>(
      [
        ['discriminator', s.u8()],
        ['amount', s.u64()],
        ['decimals', s.u8()],
      ],
      { description: 'ApproveTokenDelegateCheckedInstructionData' }
    ),
    (value) =>
      ({
        ...value,
        discriminator: 13,
      } as ApproveTokenDelegateCheckedInstructionData)
  ) as Serializer<
    ApproveTokenDelegateCheckedInstructionDataArgs,
    ApproveTokenDelegateCheckedInstructionData
  >;
}

// Instruction.
export function approveTokenDelegateChecked(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: ApproveTokenDelegateCheckedInstructionAccounts &
    ApproveTokenDelegateCheckedInstructionDataArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'splToken',
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
  );

  // Resolved accounts.
  const sourceAccount = input.source;
  const mintAccount = input.mint;
  const delegateAccount = input.delegate;
  const ownerAccount = input.owner;

  // Source.
  keys.push({
    pubkey: sourceAccount,
    isSigner: false,
    isWritable: isWritable(sourceAccount, true),
  });

  // Mint.
  keys.push({
    pubkey: mintAccount,
    isSigner: false,
    isWritable: isWritable(mintAccount, false),
  });

  // Delegate.
  keys.push({
    pubkey: delegateAccount,
    isSigner: false,
    isWritable: isWritable(delegateAccount, false),
  });

  // Owner.
  signers.push(ownerAccount);
  keys.push({
    pubkey: ownerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(ownerAccount, false),
  });

  // Data.
  const data =
    getApproveTokenDelegateCheckedInstructionDataSerializer(context).serialize(
      input
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
