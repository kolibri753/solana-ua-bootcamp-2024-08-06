import { Keypair } from "@solana/web3.js";
import { performance } from "perf_hooks";

function getCaseVariations(prefix: string): string[] {
	const result: string[] = [];
	const chars = prefix.split("");
	const numCombinations = 1 << chars.length;

	for (let i = 0; i < numCombinations; i++) {
		let variation = "";
		for (let j = 0; j < chars.length; j++) {
			variation += i & (1 << j) ? chars[j].toUpperCase() : chars[j].toLowerCase();
		}
		result.push(variation);
	}
	return result;
}

function generateKeypairWithPrefix(prefix: string): {
	keypair: Keypair;
	timeTaken: number;
	attempts: number;
} {
	const start = performance.now();
	let keypair: Keypair;
	let publicKey: string;
	let attempts = 0;
	const variations = getCaseVariations(prefix);

	do {
		keypair = Keypair.generate();
		publicKey = keypair.publicKey.toBase58();
		attempts++;
		if (attempts % 100000 === 0) {
			console.log(`Attempt ${attempts}: ${publicKey}`);
		}
	} while (!variations.some((variation) => publicKey.startsWith(variation)));

	const end = performance.now();
	const timeTaken = end - start;

	return { keypair, timeTaken, attempts };
}

const prefix = "vira";
const { keypair, timeTaken, attempts } = generateKeypairWithPrefix(prefix);

console.log(`The public key is: `, keypair.publicKey.toBase58());
console.log(`The secret key is: `, keypair.secretKey);
console.log(`✅ Finished! Time taken: ${timeTaken.toFixed(2)} milliseconds`);
console.log(`Number of attempts: ${attempts}`);
