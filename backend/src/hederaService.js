import {
  Client,
  PrivateKey,
  AccountId,
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
  TokenCreateTransaction,
  TokenMintTransaction,
  TokenType,
  TokenSupplyType,
  TransferTransaction,
  Hbar,
} from "@hashgraph/sdk";
import dotenv from "dotenv";
dotenv.config(); // Load .env first

export class HederaService {
  constructor() {
    // ✅ Read env variables directly
    const accountId = process.env.HEDERA_ACCOUNT_ID;
    const privateKey = process.env.HEDERA_PRIVATE_KEY;

    if (!accountId || !privateKey) {
      throw new Error("HEDERA_ACCOUNT_ID or HEDERA_PRIVATE_KEY missing!");
    }

    // ✅ Convert strings to SDK objects
    this.accountId = AccountId.fromString(accountId);
    this.privateKey = PrivateKey.fromStringED25519(privateKey);

    // ✅ Create client for testnet
    this.client = Client.forTestnet();
    this.client.setOperator(this.accountId, this.privateKey);

    this.topicId = null;
    this.tokenId = null;
  }

  // HCS Topic creation
  async createTopic(memo = "Crisis Solver Topic") {
    if (this.topicId) return this.topicId;

    const tx = new TopicCreateTransaction().setTopicMemo(memo);
    const response = await tx.execute(this.client);
    const receipt = await response.getReceipt(this.client);

    this.topicId = receipt.topicId.toString();
    console.log("✅ HCS Topic Created:", this.topicId);
    return this.topicId;
  }

  // Submit message to HCS
  async submitHcsMessage(message) {
    if (!this.topicId) await this.createTopic();

    const tx = new TopicMessageSubmitTransaction()
      .setTopicId(this.topicId)
      .setMessage(message)
      .execute(this.client);

    const receipt = await tx.getReceipt(this.client);
    return {
      topicId: this.topicId,
      status: receipt.status.toString(),
      consensusTimestamp: receipt.consensusTimestamp.toString(),
    };
  }

  // Create a fungible token
  async createRewardToken() {
    if (this.tokenId) return this.tokenId;

    const tx = await new TokenCreateTransaction()
      .setTokenName("CrisisToken")
      .setTokenSymbol("CRS")
      .setDecimals(0)
      .setInitialSupply(0)
      .setTreasuryAccountId(this.accountId)
      .setTokenType(TokenType.FUNGIBLE_COMMON)
      .setSupplyType(TokenSupplyType.INFINITE)
      .freezeWith(this.client);

    const signedTx = await tx.sign(this.privateKey);
    const txResponse = await signedTx.execute(this.client);
    const receipt = await txResponse.getReceipt(this.client);

    this.tokenId = receipt.tokenId.toString();
    console.log("✅ HTS Token Created:", this.tokenId);
    return this.tokenId;
  }

  // Mint tokens
  async mintToken(amount) {
    if (!this.tokenId) throw new Error("Token not created yet");

    const tx = await new TokenMintTransaction()
      .setTokenId(this.tokenId)
      .setAmount(amount)
      .execute(this.client);

    const receipt = await tx.getReceipt(this.client);
    console.log(`✅ Minted ${amount} CRS tokens`);
    return receipt;
  }

  // Transfer tokens
  async transferToken(fromAccountId, toAccountId, amount) {
    if (!this.tokenId) throw new Error("Token not created yet");

    const tx = await new TransferTransaction()
      .addTokenTransfer(
        this.tokenId,
        AccountId.fromString(fromAccountId),
        -amount
      )
      .addTokenTransfer(this.tokenId, AccountId.fromString(toAccountId), amount)
      .execute(this.client);

    const receipt = await tx.getReceipt(this.client);
    console.log(
      `✅ Transferred ${amount} CRS from ${fromAccountId} to ${toAccountId}`
    );
    return receipt;
  }

  // Send HBAR
  async sendHbar(toAccountId, amountHbar) {
    const tx = await new TransferTransaction()
      .addHbarTransfer(this.accountId, new Hbar(-amountHbar))
      .addHbarTransfer(AccountId.fromString(toAccountId), new Hbar(amountHbar))
      .execute(this.client);

    const receipt = await tx.getReceipt(this.client);
    console.log(`✅ Sent ${amountHbar} HBAR to ${toAccountId}`);
    return receipt;
  }
}
