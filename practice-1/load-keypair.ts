import "dotenv/config";
import { Keypair } from "@solana/web3.js";

const secretKeyString = process.env["SECRET_KEY"] || "[]";
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const keypair = Keypair.fromSecretKey(secretKey);

console.log(
	`✅ Loaded keypair securely! Public key is: ${keypair.publicKey.toBase58()}`
);
