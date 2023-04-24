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
  mapSerializer,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { addObjectProperty, isWritable } from '../shared';

// Accounts.
export type DeactivateLutInstructionAccounts = {
  address: PublicKey;
  authority?: Signer;
};

// Data.
export type DeactivateLutInstructionData = { discriminator: number };

export type DeactivateLutInstructionDataArgs = {};

export function getDeactivateLutInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<DeactivateLutInstructionDataArgs, DeactivateLutInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    DeactivateLutInstructionDataArgs,
    DeactivateLutInstructionData,
    DeactivateLutInstructionData
  >(
    s.struct<DeactivateLutInstructionData>([['discriminator', s.u32()]], {
      description: 'DeactivateLutInstructionData',
    }),
    (value) => ({ ...value, discriminator: 3 } as DeactivateLutInstructionData)
  ) as Serializer<
    DeactivateLutInstructionDataArgs,
    DeactivateLutInstructionData
  >;
}

// Instruction.
export function deactivateLut(
  context: Pick<Context, 'serializer' | 'programs' | 'identity'>,
  input: DeactivateLutInstructionAccounts
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'splAddressLookupTable',
      'AddressLookupTab1e1111111111111111111111111'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvingAccounts = {};
  addObjectProperty(
    resolvingAccounts,
    'authority',
    input.authority ?? context.identity
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };

  // Address.
  keys.push({
    pubkey: resolvedAccounts.address,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.address, true),
  });

  // Authority.
  signers.push(resolvedAccounts.authority);
  keys.push({
    pubkey: resolvedAccounts.authority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.authority, false),
  });

  // Data.
  const data = getDeactivateLutInstructionDataSerializer(context).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
