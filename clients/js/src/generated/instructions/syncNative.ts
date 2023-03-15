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
export type SyncNativeInstructionAccounts = {
  account: PublicKey;
};

// Arguments.
export type SyncNativeInstructionData = { discriminator: number };

export type SyncNativeInstructionDataArgs = {};

export function getSyncNativeInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<SyncNativeInstructionDataArgs, SyncNativeInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    SyncNativeInstructionDataArgs,
    SyncNativeInstructionData,
    SyncNativeInstructionData
  >(
    s.struct<SyncNativeInstructionData>([['discriminator', s.u8()]], {
      description: 'SyncNativeInstructionData',
    }),
    (value) => ({ ...value, discriminator: 17 } as SyncNativeInstructionData)
  ) as Serializer<SyncNativeInstructionDataArgs, SyncNativeInstructionData>;
}

// Instruction.
export function syncNative(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: SyncNativeInstructionAccounts
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'splToken',
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
  );

  // Resolved accounts.
  const accountAccount = input.account;

  // Account.
  keys.push({
    pubkey: accountAccount,
    isSigner: false,
    isWritable: isWritable(accountAccount, true),
  });

  // Data.
  const data = getSyncNativeInstructionDataSerializer(context).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
