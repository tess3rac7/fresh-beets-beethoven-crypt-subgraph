import { BigInt } from "@graphprotocol/graph-ts"
import {
  ReaperVaultv1_2,
  Approval,
  DepositsIncremented,
  NewStratCandidate,
  OwnershipTransferred,
  TermsAccepted,
  Transfer,
  UpgradeStrat,
  WithdrawalsIncremented
} from "../generated/ReaperVaultv1_2/ReaperVaultv1_2"
import { ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.spender = event.params.spender

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.PERCENT_DIVISOR(...)
  // - contract.agreeToTerms(...)
  // - contract.allowance(...)
  // - contract.approvalDelay(...)
  // - contract.approve(...)
  // - contract.available(...)
  // - contract.balance(...)
  // - contract.balanceOf(...)
  // - contract.constructionTime(...)
  // - contract.cumulativeDeposits(...)
  // - contract.cumulativeWithdrawals(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.depositFee(...)
  // - contract.getPricePerFullShare(...)
  // - contract.hasReadAndAcceptedTerms(...)
  // - contract.increaseAllowance(...)
  // - contract.initialize(...)
  // - contract.initialized(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.stratCandidate(...)
  // - contract.strategy(...)
  // - contract.symbol(...)
  // - contract.token(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
}

export function handleDepositsIncremented(event: DepositsIncremented): void {}

export function handleNewStratCandidate(event: NewStratCandidate): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTermsAccepted(event: TermsAccepted): void {}

export function handleTransfer(event: Transfer): void {}

export function handleUpgradeStrat(event: UpgradeStrat): void {}

export function handleWithdrawalsIncremented(
  event: WithdrawalsIncremented
): void {}
