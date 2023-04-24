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
import { isWritable } from '../shared';

// Accounts.
export type ApproveTokenDelegateInstructionAccounts = {
  source: PublicKey;
  delegate: PublicKey;
  owner: Signer;
};

// Data.
export type ApproveTokenDelegateInstructionData = {
  discriminator: number;
  amount: bigint;
};

export type ApproveTokenDelegateInstructionDataArgs = {
  amount: number | bigint;
};

export function getApproveTokenDelegateInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  ApproveTokenDelegateInstructionDataArgs,
  ApproveTokenDelegateInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    ApproveTokenDelegateInstructionDataArgs,
    ApproveTokenDelegateInstructionData,
    ApproveTokenDelegateInstructionData
  >(
    s.struct<ApproveTokenDelegateInstructionData>(
      [
        ['discriminator', s.u8()],
        ['amount', s.u64()],
      ],
      { description: 'ApproveTokenDelegateInstructionData' }
    ),
    (value) =>
      ({ ...value, discriminator: 4 } as ApproveTokenDelegateInstructionData)
  ) as Serializer<
    ApproveTokenDelegateInstructionDataArgs,
    ApproveTokenDelegateInstructionData
  >;
}

// Args.
export type ApproveTokenDelegateInstructionArgs =
  ApproveTokenDelegateInstructionDataArgs;

// Instruction.
export function approveTokenDelegate(
  context: Pick<Context, 'serializer' | 'programs'>,
  input: ApproveTokenDelegateInstructionAccounts &
    ApproveTokenDelegateInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvingAccounts = {};
  const resolvingArgs = {};
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Source.
  keys.push({
    pubkey: resolvedAccounts.source,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.source, true),
  });

  // Delegate.
  keys.push({
    pubkey: resolvedAccounts.delegate,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.delegate, false),
  });

  // Owner.
  signers.push(resolvedAccounts.owner);
  keys.push({
    pubkey: resolvedAccounts.owner.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.owner, false),
  });

  // Data.
  const data =
    getApproveTokenDelegateInstructionDataSerializer(context).serialize(
      resolvedArgs
    );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
