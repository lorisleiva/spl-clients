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
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { addAccountMeta } from '../shared';

// Accounts.
export type SyncNativeInstructionAccounts = {
  account: PublicKey | Pda;
};

// Data.
export type SyncNativeInstructionData = { discriminator: number };

export type SyncNativeInstructionDataArgs = {};

/** @deprecated Use `getSyncNativeInstructionDataSerializer()` without any argument instead. */
export function getSyncNativeInstructionDataSerializer(
  _context: object
): Serializer<SyncNativeInstructionDataArgs, SyncNativeInstructionData>;
export function getSyncNativeInstructionDataSerializer(): Serializer<
  SyncNativeInstructionDataArgs,
  SyncNativeInstructionData
>;
export function getSyncNativeInstructionDataSerializer(
  _context: object = {}
): Serializer<SyncNativeInstructionDataArgs, SyncNativeInstructionData> {
  return mapSerializer<
    SyncNativeInstructionDataArgs,
    any,
    SyncNativeInstructionData
  >(
    struct<SyncNativeInstructionData>([['discriminator', u8()]], {
      description: 'SyncNativeInstructionData',
    }),
    (value) => ({ ...value, discriminator: 17 })
  ) as Serializer<SyncNativeInstructionDataArgs, SyncNativeInstructionData>;
}

// Instruction.
export function syncNative(
  context: Pick<Context, 'programs'>,
  input: SyncNativeInstructionAccounts
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'splToken',
    'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
  );

  // Resolved inputs.
  const resolvedAccounts = {
    account: [input.account, true] as const,
  };

  addAccountMeta(keys, signers, resolvedAccounts.account, false);

  // Data.
  const data = getSyncNativeInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
