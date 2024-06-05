import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";

const ZERO_ADDRESS = ethers.constants.AddressZero;

describe("NFTMarketplace - createOrder", function () {
  before(async function () {
    [this.deployer, this.user_1, this.user_2] = await ethers.getSigners();
    this.marketplace = await ethers.getContractFactory("NFTMarketplace");
    this.marketplace = await this.marketplace.deploy();
    await this.marketplace.deployed();

    this.collection_721 = await ethers.getContractFactory("MDT721");
    this.collection_721 = await this.collection_721.deploy(
      this.user_1.address
    );
    await this.collection_721.deployed();
    this.paymentToken = await ethers.getContractFactory("KenToken");
    this.paymentToken = await this.paymentToken.deploy();
    await this.paymentToken.deployed()

    await this.marketplace.setDefaultCollection(
      this.collection_721.address,
      true
    );

    await this.marketplace.setRecipient(this.deployer.address);

    await this.marketplace.setFee(50);

    // Mint an NFT to user_1
    await this.collection_721
      .connect(this.user_1)
      .safeMint(this.user_1.address, 1, "test-uri");
    
  });

  it("Should create an order successfully", async function () {
    const collection = this.collection_721.address;
    const tokenId = 1;
    const amount = 1;
    const paymentToken = this.paymentToken.address;
    const originalPrice = 1;
    // Approve the marketplace contract for transferring NFT
    await this.collection_721
    .connect(this.user_1)
    .approve(this.marketplace.address, tokenId);
    
    console.log(111, await this.collection_721.ownerOf(1), this.user_1.address);
    console.log(this.marketplace.address, await this.collection_721.getApproved(1))
    // Create order
    const tx = await this.marketplace
      .connect(this.user_1)
      .createOrder(collection, tokenId, amount, paymentToken, originalPrice);
    const txReceipt = await tx.wait();
    // console.log(txReceipt.logs);
    const orderId = await this.marketplace.orders(0);
    console.log(orderId);
    console.log(await this.marketplace.orderInfos(orderId));
    console.log(await this.paymentToken.balanceOf(this.user_2.address))
      await this.paymentToken.mint(this.user_2.address, 10000)
    await this.paymentToken.connect(this.user_2).approve(this.marketplace.address, 10000)
    await this.marketplace.connect(this.user_2).buy(orderId, 1, {value: 0})

    // Verify that the NFT is now owned by the marketplace contract
    // expect(await this.collection_721.ownerOf(tokenId)).to.equal(
    //   this.marketplace.address
    // );
  });

  it("Should fail to create order without approval", async function () {
    const collection = this.collection_721.address;
    const tokenId = 1;
    const amount = 1;
    const paymentToken = ZERO_ADDRESS;
    const originalPrice = 0.1;
    const price = ethers.utils.parseEther(originalPrice.toString());

    // Try to create order without approval
    await expect(
      this.marketplace
        .connect(this.user_2)
        .createOrder(collection, tokenId, amount, paymentToken, price)
    ).to.be.revertedWith("Contract is not approved to transfer this token");
  });
});
