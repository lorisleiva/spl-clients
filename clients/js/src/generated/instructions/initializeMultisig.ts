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
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { addAccountMeta, addObjectProperty } from '../shared';

// Accounts.
export type InitializeMultisigInstructionAccounts = {
  multisig: PublicKey | Pda;
  rent?: PublicKey | Pda;
};

// Data.
export type InitializeMultisigInstructionData = {
  discriminator: number;
  m: number;
};

export type InitializeMultisigInstructionDataArgs = { m: number };

/** @deprecated Use `getInitializeMultisigInstructionDataSerializer()` without any argument instead. */
export function getInitializeMultisigInstructionDataSerializer(
  _context: object
): Serializer<
  InitializeMultisigInstructionDataArgs,
  InitializeMultisigInstructionData
>;
export function getInitializeMultisigInstructionDataSerializer(): Serializer<
  InitializeMultisigInstructionDataArgs,
  InitializeMultisigInstructionData
>;
export function getInitializeMultisigInstructionDataSerializer(
  _context: object = {}
): Serializer<
  InitializeMultisigInstructionDataArgs,
  InitializeMultisigInstructionData
> {
  return mapSerializer<
    InitializeMultisigInstructionDataArgs,
    any,
    InitializeMultisigInstructionData
  >(
    struct<InitializeMultisigInstructionData>(
      [
        ['discriminator', u8()],
        ['m', u8()],
      ],
      { description: 'InitializeMultisigInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 2 })
  ) as Serializer<
    InitializeMultisigInstructionDataArgs,
    InitializeMultisigInstructionData
  >;
}

// Args.
export type InitializeMultisigInstructionArgs =
  InitializeMultisigInstructionDataArgs;

// Instruction.
export function initializeMultisig(
  context: Pick<Context, 'programs'>,
  input: InitializeMultisigInstructionAccounts &
    InitializeMultisigInstructionArgs
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
    multisig: [input.multisig, true] as const,
  };
  const resolvingArgs = {};
  addObjectProperty(
    resolvedAccounts,
    'rent',
    input.rent
      ? ([input.rent, false] as const)
      : ([
          publicKey('SysvarRent111111111111111111111111111111111'),
          false,
        ] as const)
  );
  const resolvedArgs = { ...input, ...resolvingArgs };

  addAccountMeta(keys, signers, resolvedAccounts.multisig, false);
  addAccountMeta(keys, signers, resolvedAccounts.rent, false);

  // Data.
  const data =
    getInitializeMultisigInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
