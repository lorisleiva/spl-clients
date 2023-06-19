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
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  string,
  struct,
} from '@metaplex-foundation/umi/serializers';

// Data.
export type AddMemoInstructionData = { memo: string };

export type AddMemoInstructionDataArgs = AddMemoInstructionData;

/** @deprecated Use `getAddMemoInstructionDataSerializer()` without any argument instead. */
export function getAddMemoInstructionDataSerializer(
  _context: object
): Serializer<AddMemoInstructionDataArgs, AddMemoInstructionData>;
export function getAddMemoInstructionDataSerializer(): Serializer<
  AddMemoInstructionDataArgs,
  AddMemoInstructionData
>;
export function getAddMemoInstructionDataSerializer(
  _context: object = {}
): Serializer<AddMemoInstructionDataArgs, AddMemoInstructionData> {
  return struct<AddMemoInstructionData>([['memo', string()]], {
    description: 'AddMemoInstructionData',
  }) as Serializer<AddMemoInstructionDataArgs, AddMemoInstructionData>;
}

// Args.
export type AddMemoInstructionArgs = AddMemoInstructionDataArgs;

// Instruction.
export function addMemo(
  context: Pick<Context, 'programs'>,
  input: AddMemoInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'splMemo',
    'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'
  );

  // Resolved inputs.
  const resolvingArgs = {};
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Data.
  const data = getAddMemoInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
