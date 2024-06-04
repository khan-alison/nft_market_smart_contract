import { ethers } from "ethers";
import { loadContract } from "./load"; // Assuming you have a similar function to load your contract

const createOrder = async (
  collection: string,
  tokenId: number,
  amount: number,
  paymentToken: string,
  price: number
) => {
  try {
    // Load the contract
    const marketplace = await loadContract(
      "NFTMarketplace",
      "0x737bF66fC9F82AB92795ef73487b20543b013eB4"
    );

    // Create the order
    const orderTx = await marketplace.createOrder(
      collection,
      tokenId,
      ethers.utils.parseUnits(amount.toString(), 18), // Adjust if using different decimals
      paymentToken,
      ethers.utils.parseUnits(price.toString(), 18), // Adjust if using different decimals
      {
        gasLimit: 1000000,
      }
    );

    // Wait for the transaction to be mined
    await orderTx.wait();

    console.log(
      `Order created: Token ID ${tokenId}, Amount ${amount}, Price ${price}`
    );
  } catch (error) {
    console.error("Error creating order:", error);
  }
};
const collectionAddress = "0x80dD4c33FC5db8338542e04652243149CffEaA0E";
const tokenId = 1;
const amount = 1;
const paymentTokenAddress = "0x2BD8A461114B075ce3EC29675e431Ef4e6D3f5ec";
const price = 10000000; 

createOrder(collectionAddress, tokenId, amount, paymentTokenAddress, price);
