// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";


contract HTLCSwapERC20 is Initializable, PausableUpgradeable, OwnableUpgradeable, UUPSUpgradeable {

    mapping (bytes32 => LockSwap) public swaps;

    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer  {
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}

    event HTLCERC20New(
        bytes32 indexed swapId,
        address indexed sender,
        address indexed receiver,
        address tokenERC20,
        uint256 amount,
        bytes32 hashlock,
        uint256 timelock
    );

    event HTLCERC20Withdraw(bytes32 indexed swapId);
    event HTLCERC20Refund(bytes32 indexed swapId);

    struct LockSwap {
        address sender;
        address receiver;
        address tokenERC20;
        uint256 amount;
        bytes32 hashlock;
        uint256 timelock;
        bool withdrawn;
        bool refunded;
        bytes32 preimage;
    }

    // modifier tokensTransferable(address _token, address _sender, uint256 _amount) {
    //     require(_amount > 0, "HTLCSwapERC20: token amount must be > 0");
    //     require(
    //         IERC20Upgradeable(_token).allowance(_sender, address(this)) >= _amount,
    //         "HTLCSwapERC20: token allowance must be >= amount"
    //     );
    //     _;
    // }

    //TODO 需不需要设置最小时间
    modifier futureTimelock(uint256 _time) {
        require(_time > block.timestamp, "HTLCSwapERC20: timelock time must be in the future");
        _;
    }

    modifier swapExists(bytes32 _swapId) {
        require(haveSwap(_swapId), "HTLCSwapERC20: swapId does not exist");
        _;
    }

    //验证密码是否正确
    modifier hashlockMatches(bytes32 _swapId, bytes32 _x) {
        require(
            swaps[_swapId].hashlock == keccak256(abi.encodePacked(_x)),
            "HTLCSwapERC20: hashlock hash does not match"
        );
        _;
    }
    modifier withdrawable(bytes32 _swapId) {
        require(swaps[_swapId].receiver == msg.sender, "HTLCSwapERC20 withdrawable: not receiver");
        require(swaps[_swapId].withdrawn == false, "HTLCSwapERC20 withdrawable: already withdrawn");
        require(swaps[_swapId].refunded == false, "HTLCSwapERC20 withdrawable: already refunded");
        _;
    }
    modifier refundable(bytes32 _swapId) {
        require(swaps[_swapId].sender == msg.sender, "HTLCSwapERC20 refundable: not sender");
        require(swaps[_swapId].refunded == false, "HTLCSwapERC20 refundable: already refunded");
        require(swaps[_swapId].withdrawn == false, "HTLCSwapERC20 refundable: already withdrawn");
        require(swaps[_swapId].timelock <= block.timestamp, "HTLCSwapERC20 refundable: timelock not yet passed");
        _;
    }

    // 创建兑换 TUDO 需要增加chainID
    function newSwap(
        address _receiver,
        bytes32 _hashlock,
        uint256 _timelock,
        address _tokenERC20,
        uint256 _amount
    )
        external
        futureTimelock(_timelock)
        whenNotPaused
        returns (bytes32 swapId)
    {

        require(_amount > 0, "HTLCSwapERC20: token amount must be > 0");

        swapId = keccak256(
            abi.encodePacked(
                msg.sender,
                _receiver,
                _tokenERC20,
                _amount,
                _hashlock,
                _timelock
            )
        );

        require(!haveSwap(swapId), "HTLCSwapERC20: swapId already exists");

        // TODU: 代币是转到指定账户，还是放在合约上
        IERC20Upgradeable(_tokenERC20).transferFrom(msg.sender, address(this), _amount);

        swaps[swapId] = LockSwap(
            msg.sender,
            _receiver,
            _tokenERC20,
            _amount,
            _hashlock,
            _timelock,
            false,
            false,
            0x0
        );

        emit HTLCERC20New(
            swapId,
            msg.sender,
            _receiver,
            _tokenERC20,
            _amount,
            _hashlock,
            _timelock
        );
    }

    function haveSwap(bytes32 _swapId) public view returns (bool) {
        return swaps[_swapId].sender != address(0);
    }

    
    function withdraw(bytes32 _swapId, bytes32 _preimage)
        external
        swapExists(_swapId)
        hashlockMatches(_swapId, _preimage)
        withdrawable(_swapId)
        returns (bool)
    {
        LockSwap storage c = swaps[_swapId];
        c.preimage = _preimage;
        c.withdrawn = true;

        //TODU 转出账户是该合约还是账户
        // IERC20Upgradeable(c.tokenERC20).transferFrom(from, c.receiver, c.amount)
        IERC20Upgradeable(c.tokenERC20).transfer(c.receiver, c.amount);
        emit HTLCERC20Withdraw(_swapId);
        return true;
    }

    function refund(bytes32 _swapId)
        external
        swapExists(_swapId)
        refundable(_swapId)
        returns (bool)
    {
        LockSwap storage c = swaps[_swapId];
        c.refunded = true;
        IERC20Upgradeable(c.tokenERC20).transfer(c.sender, c.amount);
        emit HTLCERC20Refund(_swapId);
        return true;
    }

}