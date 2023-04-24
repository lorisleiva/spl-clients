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
export type FreezeLutInstructionAccounts = {
  address: PublicKey;
  authority?: Signer;
};

// Data.
export type FreezeLutInstructionData = { discriminator: number };

export type FreezeLutInstructionDataArgs = {};

export function getFreezeLutInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<FreezeLutInstructionDataArgs, FreezeLutInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    FreezeLutInstructionDataArgs,
    FreezeLutInstructionData,
    FreezeLutInstructionData
  >(
    s.struct<FreezeLutInstructionData>([['discriminator', s.u32()]], {
      description: 'FreezeLutInstructionData',
    }),
    (value) => ({ ...value, discriminator: 1 } as FreezeLutInstructionData)
  ) as Serializer<FreezeLutInstructionDataArgs, FreezeLutInstructionData>;
}

// Instruction.
export function freezeLut(
  context: Pick<Context, 'serializer' | 'programs' | 'identity'>,
  input: FreezeLutInstructionAccounts
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
  const data = getFreezeLutInstructionDataSerializer(context).serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
