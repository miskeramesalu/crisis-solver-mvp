// import { Client, AccountBalanceQuery, PrivateKey } from "@hashgraph/sdk";
// import dotenv from "dotenv";
// dotenv.config();

// async function test() {
//   try {
//     const client = Client.forName(process.env.HEDERA_NETWORK);
//     client.setOperator(
//       process.env.HEDERA_ACCOUNT_ID,
//       process.env.HEDERA_PRIVATE_KEY
//     );

//     const balance = await new AccountBalanceQuery()
//       .setAccountId(process.env.HEDERA_ACCOUNT_ID)
//       .execute(client);

//     console.log("✅ Account verified. Balance:", balance.hbars.toString());
//   } catch (error) {
//     console.error("❌ Hedera connection failed:", error);
//   }
// }

// test();