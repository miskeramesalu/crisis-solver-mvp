// import dotenv from "dotenv";
// dotenv.config();
// import {
//   Client,
//   PrivateKey,
//   AccountId,
//   TopicCreateTransaction,
// } from "@hashgraph/sdk";

// async function test() {
//   const client = Client.forTestnet();
//   const accountId = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID);
//   const privateKey = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY);
//   client.setOperator(accountId, privateKey);

//   try {
//     const tx = new TopicCreateTransaction().setTopicMemo("Test Topic");
//     const resp = await tx.execute(client);
//     const receipt = await resp.getReceipt(client);
//     console.log("✅ Test topic created:", receipt.topicId.toString());
//   } catch (err) {
//     console.error("❌ Test failed:", err);
//   }
// }

// test();