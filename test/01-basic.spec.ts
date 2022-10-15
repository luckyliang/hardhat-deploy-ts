import { expect } from "chai";
import { ethers, network } from "hardhat";

import { deployContract } from "./utils/contracts";
import {
  convertSignatureToEIP2098,
  defaultAcceptOfferMirrorFulfillment,
  defaultBuyNowMirrorFulfillment,
  getBasicOrderExecutions,
  getBasicOrderParameters,
  getItemETH,
  random128,
  randomBN,
  randomHex,
  toAddress,
  toBN,
  toKey,
} from "./utils/encoding";
import { faucet } from "./utils/faucet";
import { seaportFixture } from "./utils/fixtures";
import { VERSION, minRandom, simulateMatchOrders } from "./utils/helpers";

import type {
  ConduitInterface,
  ConsiderationInterface,
  EIP1271Wallet,
  EIP1271Wallet__factory,
  TestERC20,
  TestERC721,
  TestZone,
} from "../typechain-types";
import type { SeaportFixtures } from "./utils/fixtures";
import type { Wallet } from "ethers";
import { parseEther } from "ethers/lib/utils";

describe(`Basic buy now or accept offer flows (Seaport v${VERSION})`, function () {

    const { provider } = ethers;
    const owner = new ethers.Wallet(randomHex(32), provider)

    let conduitKeyOne: string;
    let conduitOne: ConduitInterface;
    let EIP1271WalletFactory: EIP1271Wallet__factory;
    let marketplaceContract: ConsiderationInterface; //seaport外部调用接口(seaport合约)
    let stubZone: TestZone;
    let testERC20: TestERC20;
    let testERC721: TestERC721;
    
    let checkExpectedEvents: SeaportFixtures["checkExpectedEvents"];
    let createMirrorAcceptOfferOrder: SeaportFixtures["createMirrorAcceptOfferOrder"];
    let createMirrorBuyNowOrder: SeaportFixtures["createMirrorBuyNowOrder"];
    let createOrder: SeaportFixtures["createOrder"];
    let getTestItem1155: SeaportFixtures["getTestItem1155"];
    let getTestItem20: SeaportFixtures["getTestItem20"];
    let getTestItem721: SeaportFixtures["getTestItem721"];
    let mint721: SeaportFixtures["mint721"];
    let mintAndApprove1155: SeaportFixtures["mintAndApprove1155"];
    let mintAndApprove721: SeaportFixtures["mintAndApprove721"];
    let mintAndApproveERC20: SeaportFixtures["mintAndApproveERC20"];
    let set721ApprovalForAll: SeaportFixtures["set721ApprovalForAll"];
    let withBalanceChecks: SeaportFixtures["withBalanceChecks"];

    after(async () => {
        await network.provider.request({
            method: "hardhat_reset"
        })
    })

    before(async () => {
        await faucet(owner.address, provider); //获取代币

        ({
            checkExpectedEvents,
            conduitKeyOne,
            conduitOne,
            createMirrorAcceptOfferOrder,
            createMirrorBuyNowOrder,
            createOrder,
            EIP1271WalletFactory,
            getTestItem1155,
            getTestItem20,
            getTestItem721,
            marketplaceContract,
            mint721,
            mintAndApprove1155,
            mintAndApprove721,
            mintAndApproveERC20,
            set721ApprovalForAll,
            stubZone,
            testERC20,
            testERC721,
            withBalanceChecks,
          } = await seaportFixture(owner));

    })

    let seller: Wallet;
    let buyer: Wallet;
    let zone: Wallet;
    
    //1271智能合约钱包
    let sellerContract: EIP1271Wallet;  
    let buyerContract: EIP1271Wallet;

    beforeEach(async () => {
        // Setup basic buyer/seller wallets with ETH
        seller = new ethers.Wallet(randomHex(32), provider);
        buyer = new ethers.Wallet(randomHex(32), provider);
        zone = new ethers.Wallet(randomHex(32), provider);
    
        sellerContract = await EIP1271WalletFactory.deploy(seller.address);
        buyerContract = await EIP1271WalletFactory.deploy(buyer.address);
    
        for (const wallet of [seller, buyer, zone, sellerContract, buyerContract]) {
          await faucet(wallet.address, provider);
        }

      });

    describe("A single ERC721 is tobe transferred", async () => {

        //用户完成单个订单的卖单
        describe("[Buy now] User fulfills a sell order for a single ERC721", async () => {
            it("ERC721 <=> ETH(standard)", async () => {
                //铸造和授权给市场合约
                const nftId = await mintAndApprove721(seller, marketplaceContract.address)
                //报价
                //提供的物品
                //offerTitem = {itemType: 2(ERC721), token: 721Address, indentifierOrCriteria: nftId, startAmount: 1, endAmount: 1}
                const offer = [getTestItem721(nftId)]

                //需要换回的物品[ConsiderationItem]
                // [
                //     {
                //         itemType: 0(NATIVE), 主链代币
                //         token: AddressZero,  //主链代币地址传0
                //         identifierOrCriteria: 0, //主链代币传0
                //         startAmount: 10,         //换取的代币范围
                //         endAmount: 10,
                //         recipient: seller.address //代币接收地址
                //     }
                // ]
                //10个代币到seller地址，1个到zone地址，1个到owner地址
                const consideration = [
                    getItemETH(parseEther("10"), parseEther("10"), seller.address),
                    getItemETH(parseEther("1"), parseEther("1"), zone.address),
                    getItemETH(parseEther("1"), parseEther("1"), owner.address),
                  ];
                
                //创建订单
                const { order, orderHash, value } = await createOrder(
                    seller,
                    zone,
                    offer,
                    consideration,
                    0 // FULL_OPEN
                );

                console.log(`orderHash = ${orderHash} value = ${value}`);
                
                //买家买入
                await withBalanceChecks([order], 0, undefined, async () => {
                    const tx = marketplaceContract
                      .connect(buyer)
                      .fulfillOrder(order, toKey(0), {
                        value,
                      });
                    const receipt = await (await tx).wait();
                    await checkExpectedEvents(tx, receipt, [
                      {
                        order,
                        orderHash,
                        fulfiller: buyer.address,
                      },
                    ]);
                    return receipt;
                  });

            })

        })
    })


})