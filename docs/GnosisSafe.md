Gas计算方式



### GnosisSafeProxyFactory

代理构造合约，使用`create2`部署一个代理合约，实现合约为GonosisSafe

### GonosisSafe

多签钱包实现合约

1. 初始化设置

   主要设置钱包拥有者，验证者数量，初始化module管理、和gas支付

   ```solidity
   function setup(
           address[] calldata _owners,
           uint256 _threshold,
           address to,
           bytes calldata data,
           address fallbackHandler,
           address paymentToken,
           uint256 payment,   
           address payable paymentReceiver
       ) external
   ```

2. 执行交易

   校验签名数组 => 校验交易 => 执行交易

   ```solidity
   function execTransaction(
           address to,
           uint256 value,
           bytes calldata data,
           Enum.Operation operation,
           uint256 safeTxGas,
           uint256 baseGas,
           uint256 gasPrice,
           address gasToken,
           address payable refundReceiver,
           bytes memory signatures
       ) public payable virtual returns (bool success)	
   ```

3. gas估算

   ```solidity
   function requiredTxGas(
           address to,
           uint256 value,
           bytes calldata data,
           Enum.Operation operation
       ) external returns (uint256)
   ```

   

#### OwnerManager

多签钱包拥有者和验证数量合约，使用链表的方式储存拥有者

1. 初始化拥有者和数量

   `function setupOwners(address[] memory _owners, uint256 _threshold) internal `

2. 添加拥有者和重置验证者数量

   `function addOwnerWithThreshold(address owner, uint256 _threshold) public authorized`

3. 移除拥有者和重置验证者数量

   `function removeOwner(address prevOwner, address owner,uint256 _threshold) public authorized `

   - prevOwner：移除拥有者储存的位置，`mapping(address => address) internal owners;`也就是owners的key值

   - owner：需要移除的owner

   - 重置的验证者数量

4. 更换owner

   `function swapOwner(address prevOwner, address oldOwner, address newOwner) public authorized`

   - prevOwner：更换老的owenr所在的储存位置

5. 更改验证者数量

   `function changeThreshold(uint256 _threshold) public authorized`

6. 获取验证者数量

   `function getThreshold() public view returns (uint256)`

7. 判断是否是owner

   `function isOwner(address owner) public view returns (bool)`

8. 获取所有的owner

   `function getOwners() public view returns (address[] memory)`

#### ModuleManager

模块管理合约, 哪些module（合约或钱包地址）可以通过该多签钱包发起交易，采用链表的方式储存module白名单

继承

- `SelfAuthorized`:权限验证合约
- `Executor`:交易执行合约

主要方法

1. 初始化module，并执行交易

   - to：执行合约地址
   - data：交易数据

   ```solidity
   function setupModules(address to, bytes memory data) internal
   ```

2. 添加module

   ```solidity
   function enableModule(address module) public authorized
   ```

3. 移除

   - prevModule：module的储存位置

   ```solidity
    function disableModule(address prevModule, address module) public authorized
   ```

4. 执行交易

   ```solidity
   function execTransactionFromModule(
           address to,
           uint256 value,
           bytes memory data,
           Enum.Operation operation
       ) public virtual returns (bool success)
   ```

5. 执行交易并返回数据

   ```solidity
   function execTransactionFromModuleReturnData(
           address to,
           uint256 value,
           bytes memory data,
           Enum.Operation operation
       ) public returns (bool success, bytes memory returnData)
   ```

6. 判断是否可用

   ```solidity
    function isModuleEnabled(address module) public view returns (bool)
   ```

7. 分页返回

   ```solidity
   function getModulesPaginated(address start, uint256 pageSize) external view returns (address[] memory array, address next)
   ```

   

#### FallbackManager

负责处理回调合约，初始化的时候传入，后期可修改

user or contract => fallbackManager => fallbackManager.delegate => handler

#### GuardManager

交易校验管理合约，储存的校验合约必须支持以下两种校验方法

```solidity
function checkTransaction(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address payable refundReceiver,
        bytes memory signatures,
        address msgSender
    ) external;

    function checkAfterExecution(bytes32 txHash, bool success) external;
```

通过setGuard方法设置校验合约

```solidity
function setGuard(address guard) external authorized
```

