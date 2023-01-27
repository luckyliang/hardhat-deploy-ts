import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { LANDRegistry, EstateRegistry, LANDRegistryMock, EstateRegistryMock } from "../typechain-types";
import { Deployer } from "../utils/deployer";
import { Diamond } from "../utils/diamond";

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

    beforeEach(async function () {
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

})




  