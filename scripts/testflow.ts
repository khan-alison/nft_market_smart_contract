import { ethers, upgrades } from "hardhat";


async function main() {
  const signers = await ethers.getSigners();
  const seller = signers[0];
  const buyer = signers[1];
  const marketplace = await ethers.getContractAt("NFTMarketplace", "0xE5227a47C09C793F6D0Af7f819167E9CB30ddBb1");
  const nft = await ethers.getContractAt("MDT721", "0xdFe59eFc8543fb79f5699600c6687bd4bca7468C")
  const paymentToken = await ethers.getContractAt("KenToken", "0x6d8AC4b62F8DF7e7E51dd4A09b413c6ED8bD75dc");

  // await marketplace.setDefaultCollection("0xE5227a47C09C793F6D0Af7f819167E9CB30ddBb1", true);


  // await marketplace.setRecipient("0x6d8AC4b62F8DF7e7E51dd4A09b413c6ED8bD75dc");
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

  const orderId = await marketplace.orders(2);

  
  try {
    await marketplace.connect(buyer).buy(orderId, 1, {value: 0});
  } catch(err) {
    console.error(err)
  }
  // console.log(await nft.ownerOf(2), seller.address)
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// NFTMarketplace was deployed at 0xE5227a47C09C793F6D0Af7f819167E9CB30ddBb1
// KenToken was deployed at 0x6d8AC4b62F8DF7e7E51dd4A09b413c6ED8bD75dc
// MDT721 was deployed at 0xdFe59eFc8543fb79f5699600c6687bd4bca7468C