import { ethers, upgrades } from "hardhat";


async function main() {
  const signers = await ethers.getSigners();
  const seller = signers[0];
  const buyer = signers[1];
  const marketplace = await ethers.getContractAt("NFTMarketplace", "0x762E5350B4Da64fc5949bD7C08A5f0bC6F42Fc58");
  const nft = await ethers.getContractAt("MDT721", "0xF4d300391cABcb389A58a76d1Adbae241568C626")
  const paymentToken = await ethers.getContractAt("KenToken", "0x97362c31447e9deDbA679A4812080e7144C2bc9A");

  // await marketplace.setDefaultCollection("0x762E5350B4Da64fc5949bD7C08A5f0bC6F42Fc58", true);
  // await marketplace.setRecipient("0xc12Eb574621c0D0d3Dabce0eF50De395c3695b6A");
  // await marketplace.setFee(50);

  // await nft.connect(seller).safeMint(seller.address, 2, "URI");

  // console.log(await nft.ownerOf(2), seller.address)
  // await nft.connect(seller).approve(marketplace.address, 2);

  // console.log(await nft.getApproved(2), marketplace.address)
  // await marketplace.connect(seller).createOrder(
  //   nft.address, 2, 1, paymentToken.address, 10
  // );

  // console.log(await marketplace.orders(0));
  // console.log(await marketplace.orderInfos(await marketplace.orders(0)))

  // // buy
  // const tx = await paymentToken.connect(seller).mint(buyer.address, 10000);
  // tx.wait();
  // console.log(await paymentToken.balanceOf(buyer.address))
  // const tx = await paymentToken.connect(buyer).approve(marketplace.address, 10000);
  // tx.wait();
  // console.log(await paymentToken.allowance(buyer.address, marketplace.address))

  // const orderId = await marketplace.orders(0);
  // await marketplace.buy(orderId, 1, {value: 0});
  console.log(await nft.ownerOf(2), seller.address)
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// NFTMarketplace was deployed at 0x762E5350B4Da64fc5949bD7C08A5f0bC6F42Fc58
// KenToken was deployed at 0x97362c31447e9deDbA679A4812080e7144C2bc9A
// MDT721 was deployed at 0xF4d300391cABcb389A58a76d1Adbae241568C626