// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.7.0 <0.9.0;

import "../common/SelfAuthorized.sol";

/// @title Fallback Manager - A contract that manages fallback calls made to this contract
/// @author Richard Meissner - <richard@gnosis.pm>
contract FallbackManager is SelfAuthorized {
    event ChangedFallbackHandler(address handler);

    // keccak256("fallback_manager.handler.address")
    bytes32 internal constant FALLBACK_HANDLER_STORAGE_SLOT = 0x6c9a6c4a39284e37ed1cf53d337577d14212a4870fb976a4366c693b939918d5;

    //使用固定储存槽储存回调地址
    function internalSetFallbackHandler(address handler) internal {
        bytes32 slot = FALLBACK_HANDLER_STORAGE_SLOT;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            sstore(slot, handler) //将handler储存到slot槽中
        }
    }

    /// @dev Allows to add a contract to handle fallback calls.
    ///      Only fallback calls without value and with data will be forwarded.
    ///      This can only be done via a Safe transaction.
    ///      修改回调地址
    /// @param handler contract to handle fallback calls.
    function setFallbackHandler(address handler) public authorized {
        internalSetFallbackHandler(handler);
        emit ChangedFallbackHandler(handler);
    }

    // solhint-disable-next-line payable-fallback,no-complex-fallback
    //user or contract => fallbackManager => handlerContract
    fallback() external {
        bytes32 slot = FALLBACK_HANDLER_STORAGE_SLOT;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            let handler := sload(slot) //加载储存在storage中slot槽中的值
            if iszero(handler) {// 判断是否为0值
                return(0, 0) //返回栈中0～0位置的值
            }

            //calldatasize：等于msg.data.size， 交易数据字段大小（函数签名+input参数大小）
            //calldatacopy：calldatasize()大小的数据复制到0位置空闲内存中
            calldatacopy(0, 0, calldatasize())
            // The msg.sender address is shifted to the left by 12 bytes to remove the padding
            // Then the address without padding is stored right after the calldata

            //caller()：msg.sender
            //shl(96, caller()) 左移96位也就是左移12个字节
            //mstore() 将calldatasize大小的数据储存在未填充的地址数据之后
            mstore(calldatasize(), shl(96, caller()))
            // Add 20 bytes for the address appended add the end，为什么要追加20个字节大小
            //call参数：gas	addr	value	argsOffset	argsLength	retOffset	retLength
            //调用回调合约handler的方法
            let success := call(gas(), handler, 0, 0, add(calldatasize(), 20), 0, 0)

            //returndatacopy参数：destOffset	offset	length	
            returndatacopy(0, 0, returndatasize())
            if iszero(success) {//失败则回退
                revert(0, returndatasize())
            }
            return(0, returndatasize())
        }
    }
}
