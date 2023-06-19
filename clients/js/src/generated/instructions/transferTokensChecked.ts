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
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { addAccountMeta, addObjectProperty } from '../shared';

// Accounts.
export type TransferTokensCheckedInstructionAccounts = {
  source: PublicKey | Pda;
  mint: PublicKey | Pda;
  destination: PublicKey | Pda;
  authority?: Signer;
};

// Data.
export type TransferTokensCheckedInstructionData = {
  discriminator: number;
  amount: bigint;
  decimals: number;
};

export type TransferTokensCheckedInstructionDataArgs = {
  amount: number | bigint;
  decimals: number;
};

/** @deprecated Use `getTransferTokensCheckedInstructionDataSerializer()` without any argument instead. */
export function getTransferTokensCheckedInstructionDataSerializer(
  _context: object
): Serializer<
  TransferTokensCheckedInstructionDataArgs,
  TransferTokensCheckedInstructionData
>;
export function getTransferTokensCheckedInstructionDataSerializer(): Serializer<
  TransferTokensCheckedInstructionDataArgs,
  TransferTokensCheckedInstructionData
>;
export function getTransferTokensCheckedInstructionDataSerializer(
  _context: object = {}
): Serializer<
  TransferTokensCheckedInstructionDataArgs,
  TransferTokensCheckedInstructionData
> {
  return mapSerializer<
    TransferTokensCheckedInstructionDataArgs,
    any,
    TransferTokensCheckedInstructionData
  >(
    struct<TransferTokensCheckedInstructionData>(
      [
        ['discriminator', u8()],
        ['amount', u64()],
        ['decimals', u8()],
      ],
      { description: 'TransferTokensCheckedInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 12 })
  ) as Serializer<
    TransferTokensCheckedInstructionDataArgs,
    TransferTokensCheckedInstructionData
  >;
}

// Args.
export type TransferTokensCheckedInstructionArgs =
  TransferTokensCheckedInstructionDataArgs;

// Instruction.
export function transferTokensChecked(
  context: Pick<Context, 'programs' | 'identity'>,
  input: TransferTokensCheckedInstructionAccounts &
    TransferTokensCheckedInstructionArgs
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
    source: [input.source, true] as const,
    mint: [input.mint, false] as const,
    destination: [input.destination, true] as const,
  };
  const resolvingArgs = {};
  addObjectProperty(
    resolvedAccounts,
    'authority',
    input.authority
      ? ([input.authority, false] as const)
      : ([context.identity, false] as const)
  );
  const resolvedArgs = { ...input, ...resolvingArgs };

  addAccountMeta(keys, signers, resolvedAccounts.source, false);
  addAccountMeta(keys, signers, resolvedAccounts.mint, false);
  addAccountMeta(keys, signers, resolvedAccounts.destination, false);
  addAccountMeta(keys, signers, resolvedAccounts.authority, false);

  // Data.
  const data =
    getTransferTokensCheckedInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
