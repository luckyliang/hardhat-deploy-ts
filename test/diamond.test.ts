import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { LANDRegistry, EstateRegistry, LANDRegistryMock, EstateRegistryMock, Test1Facet, Test2Facet } from "../typechain-types";
import { Deployer } from "../utils/deployer";
import { Diamond } from "../utils/diamond";
import FacetCutAction = Diamond.FacetCutAction

describe('LandWorks', function () {
    let snapshotId: any
    let loupe: Contract, cut: Contract, ownership: Contract, marketplace: Contract, 
    rent: Contract, fee: Contract, erc721: Contract, decentraland: Contract, diamond: Contract;
    let landRegistry: LANDRegistryMock;
    let estateRegistry: EstateRegistryMock;

    let owner: SignerWithAddress, nonOwner: SignerWithAddress, artificialRegistry: SignerWithAddress,
        administrativeOperator: SignerWithAddress, administrativeConsumer: SignerWithAddress, consumer: SignerWithAddress,
        listReferrer: SignerWithAddress, rentReferrer: SignerWithAddress;
    
    const MAX_RENT_START: number = Date.now(); // This is in milliseconds

    let landWorks: Contract;
    const ERC721_SYMBOL = 'LW';
    const ERC721_NAME = 'LandWorks';
    const ERC721_BASE_URI = 'ipfs://';

    const FEE_PERCENTAGE = 3_000; // 3%
    const FEE_PRECISION = 100_000;
    const ADDRESS_ONE = '0x0000000000000000000000000000000000000001';
    const assetId = 0; // The first minted ERC721 Asset

    before(async () => {

        const signers = await ethers.getSigners();
        owner = signers[0];
        nonOwner = signers[1];
        artificialRegistry = signers[2];
        administrativeOperator = signers[3]; // DecentralandFacet administrative operator
        administrativeConsumer = signers[4];
        consumer = signers[5];
        listReferrer = signers[6];
        rentReferrer = signers[7];

        
        cut = await Deployer.deployContract('DiamondCutFacet');     //切割合约
        loupe = await Deployer.deployContract('DiamondLoupeFacet'); //获取切面的相关合约
        ownership = await Deployer.deployContract('OwnershipFacet'); 
        marketplace = await Deployer.deployContract('MarketplaceFacet');
        rent = await Deployer.deployContract('RentFacet'); //出租合约
        fee = await Deployer.deployContract('FeeFacet');    //费用管理合约
        decentraland = await Deployer.deployContract('DecentralandFacet'); //去中心化土地
        erc721 = await Deployer.deployContract('ERC721Facet');

        //部署钻石合约
        diamond = await Deployer.deployDiamond(
            'LandWorks',
            [cut, loupe, ownership, marketplace, rent, fee, erc721, decentraland],
            owner.address,
        );

        landWorks = await ethers.getContractAt("ILandWorks", diamond.address);
    
        // Init ERC721
        await landWorks.initERC721(ERC721_NAME, ERC721_SYMBOL, ERC721_BASE_URI);

        // Set ETH as payment type
        await landWorks.setTokenPayment(ADDRESS_ONE, 0, true);

        // Deploy Decentraland Registry
        const decentralandProxy = await Deployer.deployContract('LANDProxyMock');
        const decentralandLandRegistry = await Deployer.deployContract('LANDRegistryMock');
        await decentralandProxy.upgrade(decentralandLandRegistry.address, owner.address);

        landRegistry = (await ethers.getContractAt('LANDRegistryMock', decentralandProxy.address)) as LANDRegistryMock;
        estateRegistry = (await Deployer.deployContract('EstateRegistryMock')) as EstateRegistryMock;
        await landRegistry.setEstateRegistry(estateRegistry.address);

        await estateRegistry['initialize(string,string,address)']("ESTATE", "EST", landRegistry.address);

    })

    beforeEach(async function () {     //每次测试完回退到初始状态   
        snapshotId = await ethers.provider.send('evm_snapshot', []);
    });

    afterEach(async function () {
        await ethers.provider.send('evm_revert', [snapshotId]);
    });

    describe('General Diamond Tests', () => {

        it('should have 8 facets', async () => {
            const actualFacets = await landWorks.facetAddresses();
            expect(actualFacets.length).to.be.equal(8);
            expect(actualFacets).to.eql([cut.address, loupe.address, ownership.address, marketplace.address, rent.address, fee.address, erc721.address, decentraland.address]);
        });


        it('has correct function selectors linked to facet', async function () {
            const actualCutSelectors: Array<string> = Diamond.getSelectorsFor(cut);
            expect(await landWorks.facetFunctionSelectors(cut.address)).to.deep.equal(actualCutSelectors);

            const actualLoupeSelectors = Diamond.getSelectorsFor(loupe);
            expect(await landWorks.facetFunctionSelectors(loupe.address)).to.deep.equal(actualLoupeSelectors);

            const actualOwnerSelectors = Diamond.getSelectorsFor(ownership);
            expect(await landWorks.facetFunctionSelectors(ownership.address)).to.deep.equal(actualOwnerSelectors);

            const actualMarketplaceSelectors = Diamond.getSelectorsFor(marketplace);
            expect(await landWorks.facetFunctionSelectors(marketplace.address)).to.deep.equal(actualMarketplaceSelectors);

            const actualRentFacetSelectors = Diamond.getSelectorsFor(rent);
            expect(await landWorks.facetFunctionSelectors(rent.address)).to.deep.equal(actualRentFacetSelectors);

            const actualFeeSelectors = Diamond.getSelectorsFor(fee);
            expect(await landWorks.facetFunctionSelectors(fee.address)).to.deep.equal(actualFeeSelectors);

            const actualErc721Selectors = Diamond.getSelectorsFor(erc721);
            expect(await landWorks.facetFunctionSelectors(erc721.address)).to.deep.equal(actualErc721Selectors);

            const actualDecentralandFacetSelectors = Diamond.getSelectorsFor(decentraland);
            expect(await landWorks.facetFunctionSelectors(decentraland.address)).to.deep.equal(actualDecentralandFacetSelectors);
        });

        it('associates selectors correctly to facets', async function () {
            for (const sel of Diamond.getSelectorsFor(loupe)) {
                expect(await landWorks.facetAddress(sel)).to.be.equal(loupe.address);
            }

            for (const sel of Diamond.getSelectorsFor(cut)) {
                expect(await landWorks.facetAddress(sel)).to.be.equal(cut.address);
            }

            for (const sel of Diamond.getSelectorsFor(ownership)) {
                expect(await landWorks.facetAddress(sel)).to.be.equal(ownership.address);
            }

            for (const sel of Diamond.getSelectorsFor(marketplace)) {
                expect(await landWorks.facetAddress(sel)).to.be.equal(marketplace.address);
            }

            for (const sel of Diamond.getSelectorsFor(rent)) {
                expect(await landWorks.facetAddress(sel)).to.be.equal(rent.address);
            }

            for (const sel of Diamond.getSelectorsFor(fee)) {
                expect(await landWorks.facetAddress(sel)).to.be.equal(fee.address);
            }

            for (const sel of Diamond.getSelectorsFor(erc721)) {
                expect(await landWorks.facetAddress(sel)).to.be.equal(erc721.address);
            }

            for (const sel of Diamond.getSelectorsFor(decentraland)) {
                expect(await landWorks.facetAddress(sel)).to.be.equal(decentraland.address);
            }
        });
       
    })

    describe('DiamondCut Facet', async () => {
        let test1Facet: Contract, test2Facet: Contract
        beforeEach(async () => {
            test1Facet = await Deployer.deployContract("Test1Facet")
            test2Facet = await Deployer.deployContract('Test2Facet');
        })

        it('should fail if not called by contract owner', async function () {
            const _diamondCut = [{
                facetAddress: test1Facet.address,
                action: FacetCutAction.Add,
                functionSelectors: Diamond.getSelectorsFor(test1Facet),
            }]

            await expect(
                landWorks.connect(nonOwner).diamondCut(_diamondCut, ethers.constants.AddressZero, "0x")
                ).to.be.revertedWith("Must be contract owner")
        })

        //添加新的方法
        it('should allow adding new functions', async function () {
            const addTest1Facet = [{
                facetAddress: test1Facet.address,
                action: FacetCutAction.Add,
                functionSelectors: Diamond.getSelectorsFor(test1Facet),
            }];
            await expect(landWorks.connect(owner).diamondCut(addTest1Facet, ethers.constants.AddressZero, '0x')).to.not.be.reverted;

            const facets = await landWorks.facets();
            expect(facets[8].facetAddress).to.eql(test1Facet.address);
            expect(facets[8].functionSelectors).to.eql(Diamond.getSelectorsFor(test1Facet));

            const test1 = (await Diamond.asFacet(diamond, 'Test1Facet')) as Test1Facet;
            await expect(test1.test1Func1()).to.not.be.reverted;
        });

        //替换方法，使用不同合约地址的相同方法去替换
        it('should allow replacing functions', async function () {
            let addTest1Facet = [{
                facetAddress: test1Facet.address,
                action: FacetCutAction.Add,
                functionSelectors: Diamond.getSelectorsFor(test1Facet),
            }];
            await landWorks.connect(owner).diamondCut(addTest1Facet, ethers.constants.AddressZero, '0x');
            //使用Test2Facet中的方法替换test1中的方法
            const replaceTest1WithTest2Facet = [{
                facetAddress: test2Facet.address,
                action: FacetCutAction.Replace,
                functionSelectors: Diamond.getSelectorsFor(test2Facet),
            }];

            await expect(landWorks.connect(owner).diamondCut(replaceTest1WithTest2Facet, ethers.constants.AddressZero, '0x')).to.not.be.reverted;

            const test2 = (await Diamond.asFacet(diamond, 'Test2Facet')) as Test2Facet;
            expect(await test2.test1Func1()).to.be.equal(2);
        });

        it('should allow removing functions', async function () {
            let addTest1Facet = [{
                facetAddress: test1Facet.address,
                action: FacetCutAction.Add,
                functionSelectors: Diamond.getSelectorsFor(test1Facet),
            }];
            await landWorks.connect(owner).diamondCut(addTest1Facet, ethers.constants.AddressZero, '0x');

            //facetAddress = address(0)
            const removeTest1Func = [{
                facetAddress: ethers.constants.AddressZero,
                action: FacetCutAction.Remove,
                functionSelectors: [test1Facet.interface.getSighash('test1Func1()')],
            }];

            await expect(landWorks.connect(owner).diamondCut(removeTest1Func, ethers.constants.AddressZero, '0x')).to.not.be.reverted;

            const test1 = (await Diamond.asFacet(diamond, 'Test1Facet')) as Test1Facet;
            await expect(test1.test1Func1()).to.be.revertedWith('Diamond: Function does not exist');
        });

        //支持所有声明的接口
        it('should support all declared interfaces', async () => {
            const IERC165 = await ethers.getContractAt('IERC165', ethers.constants.AddressZero);
            expect(await landWorks.supportsInterface(Diamond.getInterfaceId(IERC165))).to.be.true;
            expect(await landWorks.supportsInterface(Diamond.getInterfaceId(cut))).to.be.true;

            const IDiamondLoupe = await ethers.getContractAt('IDiamondLoupe', ethers.constants.AddressZero);
            expect(await landWorks.supportsInterface(Diamond.getInterfaceId(IDiamondLoupe))).to.be.true;

            expect(await landWorks.supportsInterface(Diamond.getInterfaceId(ownership))).to.be.true;

            // Calculating the interface id would require an ABI, consisting of all function selectors,
            // **excluding** the inherited ones.
            const IERC721InterfaceId = '0x80ac58cd';
            expect(await landWorks.supportsInterface(IERC721InterfaceId)).to.be.true;

            const IERC721Metadata = '0x5b5e139f';
            expect(await landWorks.supportsInterface(IERC721Metadata)).to.be.true;

            const IERC721Enumerable = '0x780e9d63';
            expect(await landWorks.supportsInterface(IERC721Enumerable)).to.be.true;

            const IERC721Consumable = await ethers.getContractAt('IERC721Consumable', ethers.constants.AddressZero);
            expect(await landWorks.supportsInterface(Diamond.getInterfaceId(IERC721Consumable))).to.be.true;
        });
    })

    //租赁市场
    describe('MarketplaceFacet', async () => {
        const metaverseId = 0;  //市场标识 元宇宙id
        const metaverseName = 'Decentraland';

        describe('setMetaverseName', async () => {

            it('should set metaverse name', async () => {
                // when:
                await landWorks.setMetaverseName(metaverseId, metaverseName);

                // then:
                expect(await landWorks.metaverseName(metaverseId)).to.equal(metaverseName);
            });

            it('should properly set a list of metaverse names', async () => {
                for (let i = 0; i < 5; i++) {
                    const name = `${i}`;
                    await expect(landWorks.setMetaverseName(i, name))
                        .to.emit(landWorks, 'SetMetaverseName')
                        .withArgs(i, name);
                    expect(await landWorks.metaverseName(i)).to.equal(name);
                }
            });
        })

        describe('setRegistry', async () => {
            it('should add registry', async () => {
                // when:
                await landWorks.setRegistry(metaverseId, artificialRegistry.address, true);

                // then:
                expect(await landWorks.supportsRegistry(metaverseId, artificialRegistry.address)).to.be.true;
                expect(await landWorks.totalRegistries(metaverseId)).to.equal(1);
                expect(await landWorks.registryAt(metaverseId, 0)).to.equal(artificialRegistry.address);
            });

            it('should remove registry', async () => {
                // given:
                await landWorks.setRegistry(metaverseId, artificialRegistry.address, true);

                // when:
                await landWorks.setRegistry(metaverseId, artificialRegistry.address, false);

                // then:
                expect(await landWorks.supportsRegistry(metaverseId, artificialRegistry.address)).to.be.false;
                expect(await landWorks.totalRegistries(metaverseId)).to.equal(0);
                await expect(landWorks.registryAt(metaverseId, 0)).to.be.reverted;
            });

            it('should revert when registry is 0x0', async () => {
                const expectedRevertMessage = '_registry must not be 0x0';
                // when:
                await expect(landWorks.setRegistry(metaverseId, ethers.constants.AddressZero, true))
                    .to.be.revertedWith(expectedRevertMessage);
                // and:
                await expect(landWorks.setRegistry(metaverseId, ethers.constants.AddressZero, false))
                    .to.be.revertedWith(expectedRevertMessage);
            });

            it('should revert when registry is already added', async () => {
                // given:
                const expectedRevertMessage = '_registry already added';
                await landWorks.setRegistry(metaverseId, artificialRegistry.address, true);

                // when:
                await expect(landWorks.setRegistry(metaverseId, artificialRegistry.address, true))
                    .to.be.revertedWith(expectedRevertMessage);
            });

            it('should revert when registry is already removed/never added', async () => {
                const expectedRevertMessage = '_registry not found';

                // when:
                await expect(landWorks.setRegistry(metaverseId, artificialRegistry.address, false))
                    .to.be.revertedWith(expectedRevertMessage);
            });

        })

        describe('', async () => {
            let mockERC721Registry: Contract;
            let mockERC20Registry: Contract;

            const metaverseTokenId = 1;  //ERC721 TokenId
            const minPeriod = 1;
            const maxPeriod = 100;
            const maxFutureTime = 120;
            const pricePerSecond = 1337;

            const assetId = 0; // the token id of the to-be-minted asset when listing

            beforeEach(async () => {
                mockERC721Registry = await Deployer.deployContract('ERC721Mock');
                await mockERC721Registry.mint(owner.address, metaverseTokenId);

                // and:
                mockERC20Registry = await Deployer.deployContract('ERC20Mock');

                // and: 登记ERC72合约地址
                await landWorks.setRegistry(metaverseId, mockERC721Registry.address, true);
            });

            describe('list', async () => {
                it('should list successfully', async () => {
                    // given:
                    await mockERC721Registry.approve(landWorks.address, metaverseTokenId);

                    // when:
                    await landWorks.list(metaverseId, mockERC721Registry.address, metaverseTokenId, minPeriod, maxPeriod, maxFutureTime, ADDRESS_ONE, pricePerSecond, ethers.constants.AddressZero);

                    // then:
                    expect(await mockERC721Registry.ownerOf(metaverseTokenId)).to.equal(landWorks.address);
                    expect(await landWorks.ownerOf(assetId)).to.equal(owner.address);
                    // and:
                    const asset = await landWorks.assetAt(assetId);
                    expect(asset.metaverseId).to.equal(metaverseId);
                    expect(asset.metaverseRegistry).to.equal(mockERC721Registry.address);
                    expect(asset.metaverseAssetId).to.equal(metaverseTokenId);
                    expect(asset.paymentToken).to.equal(ADDRESS_ONE);
                    expect(asset.minPeriod).to.equal(minPeriod);
                    expect(asset.maxPeriod).to.equal(maxPeriod);
                    expect(asset.maxFutureTime).to.equal(maxFutureTime);
                    expect(asset.pricePerSecond).equal(pricePerSecond);
                    expect(asset.status).to.equal(0); // Listed
                    expect(asset.totalRents).to.equal(0);
                    expect(await landWorks.totalSupply()).to.equal(1);
                    expect(await landWorks.tokenOfOwnerByIndex(owner.address, assetId)).to.equal(assetId);
                    expect(await landWorks.tokenByIndex(assetId)).to.equal(assetId);
                });

                it('should list successfully with a payment token', async () => {
                    // given:
                    await mockERC721Registry.approve(landWorks.address, metaverseTokenId);
                    // and:
                    await landWorks.setTokenPayment(mockERC20Registry.address, 0, true);

                    // when:
                    await expect(landWorks
                        .list(
                            metaverseId,
                            mockERC721Registry.address,
                            metaverseTokenId,
                            minPeriod,
                            maxPeriod,
                            maxFutureTime,
                            mockERC20Registry.address,
                            pricePerSecond,
                            ethers.constants.AddressZero
                        ))
                        .to.emit(landWorks, 'ConsumerChanged')
                        .withArgs(ethers.constants.AddressZero, ethers.constants.AddressZero, assetId)
                        .to.emit(landWorks, 'Transfer')
                        .withArgs(ethers.constants.AddressZero, owner.address, assetId)
                        .to.emit(landWorks, 'List')
                        .withArgs(0, metaverseId, mockERC721Registry.address, metaverseTokenId, minPeriod, maxPeriod, maxFutureTime, mockERC20Registry.address, pricePerSecond);

                    // then:
                    expect(await mockERC721Registry.ownerOf(metaverseTokenId)).to.equal(landWorks.address);
                    expect(await landWorks.ownerOf(assetId)).to.equal(owner.address);
                    // and:
                    const asset = await landWorks.assetAt(assetId);
                    expect(asset.metaverseId).to.equal(metaverseId);
                    expect(asset.metaverseRegistry).to.equal(mockERC721Registry.address);
                    expect(asset.metaverseAssetId).to.equal(metaverseTokenId);
                    expect(asset.paymentToken).to.equal(mockERC20Registry.address);
                    expect(asset.minPeriod).to.equal(minPeriod);
                    expect(asset.maxPeriod).to.equal(maxPeriod);
                    expect(asset.maxFutureTime).to.equal(maxFutureTime);
                    expect(asset.pricePerSecond).equal(pricePerSecond);
                    expect(asset.status).to.equal(0); // Listed
                    expect(asset.totalRents).to.equal(0);
                });

                it('should revert when max period exceeds max future time', async () => {
                    const expectedRevertMessage = '_maxPeriod more than _maxFutureTime';
                    // when:
                    await expect(landWorks
                        .list(
                            metaverseId,
                            mockERC721Registry.address,
                            metaverseTokenId,
                            minPeriod,
                            maxFutureTime,
                            maxPeriod,
                            ADDRESS_ONE,
                            pricePerSecond,
                            ethers.constants.AddressZero
                        ))
                        .to.be.revertedWith(expectedRevertMessage);
                });

                it('should revert when registry is not supported', async () => {
                    const expectedRevertMessage = '_registry not supported';
                    // when:
                    await expect(landWorks
                        .list(
                            metaverseId,
                            artificialRegistry.address, //必须是登记过的NFT合约地址
                            metaverseTokenId,
                            minPeriod,
                            maxPeriod,
                            maxFutureTime,
                            ADDRESS_ONE,
                            pricePerSecond,
                            ethers.constants.AddressZero
                        ))
                        .to.be.revertedWith(expectedRevertMessage);
                });
                it('should revert when payment token is not supported', async () => {
                    const expectedRevertMessage = 'payment type not supported';
                    // when:
                    await expect(landWorks
                        .list(
                            metaverseId,
                            mockERC721Registry.address,
                            metaverseTokenId,
                            minPeriod,
                            maxPeriod,
                            maxFutureTime,
                            mockERC20Registry.address, //必须是先登记过的Token
                            pricePerSecond,
                            ethers.constants.AddressZero
                        ))
                        .to.be.revertedWith(expectedRevertMessage);
                });

                it('should revert when trying to list a non-existing metaverse token id', async () => {
                    const invalidTokenId = 1234;
                    const expectedRevertMessage = 'ERC721: operator query for nonexistent token';
                    // when:
                    await expect(landWorks
                        .list(
                            metaverseId,
                            mockERC721Registry.address,
                            invalidTokenId, //无效tokenId
                            minPeriod,
                            maxPeriod,
                            maxFutureTime,
                            ADDRESS_ONE,
                            pricePerSecond,
                            ethers.constants.AddressZero
                        ))
                        .to.be.revertedWith(expectedRevertMessage);
                });

                it('should revert when trying to list to a non-contract metaverse registry', async () => {
                    // given:
                    await landWorks.setRegistry(metaverseId, artificialRegistry.address, true);

                    // when:
                    await expect(landWorks
                        .list(
                            metaverseId,
                            artificialRegistry.address, //必须是NFT合约地址
                            metaverseTokenId,
                            minPeriod,
                            maxPeriod,
                            maxFutureTime,
                            ADDRESS_ONE,
                            pricePerSecond,
                            ethers.constants.AddressZero
                        ))
                        .to.be.reverted;
                });

                it('should revert when referrer is not whitelisted', async () => {
                    const expectedRevertMessage = '_referrer not whitelisted';

                    // when:
                    await expect(landWorks
                        .list(
                            metaverseId,
                            mockERC721Registry.address,
                            metaverseTokenId,
                            minPeriod,
                            maxPeriod,
                            maxFutureTime,
                            ADDRESS_ONE,
                            pricePerSecond,
                            nonOwner.address //推荐人不在白名单中
                        ))
                        .to.be.revertedWith(expectedRevertMessage);
                });

            })

        })
    })

})




  