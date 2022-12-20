通过调试理解EVM汇编：
 https://learnblockchain.cn/article/4913
 该系列包含7篇文章

- [第1篇：理解汇编](https://learnblockchain.cn/article/4913)
- [第2篇：部署智能合约](https://learnblockchain.cn/article/4927)
- [第3篇：存储布局是如何工作的？](https://learnblockchain.cn/article/4943)
- [第4篇：结束/中止执行的5个指令](https://learnblockchain.cn/article/4965)
- [第5篇：执行流 if/else/for/函数](https://medium.com/@TrustChain/reversing-and-debugging-evm-the-execution-flow-part-5-2ffc97ef0b77)
- [第6篇：完整的智能合约布局](https://medium.com/@TrustChain/reversing-and-debugging-part-6-full-smart-contract-layout-f236c3121bd1)
- [第7篇：外部调用和合约部署](https://medium.com/@TrustChain/reversing-and-debugging-theevm-part-7-2a20a44a555e)

操作指令查询：
    https://www.ethervm.io/

### 3. Solidity中的存储

在solidity中有3种类型的存储。

1. 存储（storage），直接存储在区块链中，使用32字节数字 "槽（slot）"来标识，。一个槽的大小是32个字节（或64个十六进制数字）。
2. "内存（memory）"，在智能合约执行结束时被清除，由一个名为 "十六进制数字 "的地址来标识。
3. 还有栈，它是一个LIFO（后进先出）类型的队列，当每个项由一个数字标识(以0开始)。



## 操作指令

- PUSH：入栈操作

- POP：出栈

- MSTORE：需要两个参数（offset、value），将第二个出栈的数据储存在第一个出栈的位置处

  ```assembly
  000 PUSH1 80
  000 PUSH1 40
  MSTORE
  ```

  memory

  ```solidity
  000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080	
  ```

  EVM将**0x80**存储在内存的**0x40**地址，由于内存中的每一个插槽都是32个字节的长度（使用小端序的十六进制0x20），因此插槽40的内存位于0x40和**0x40+0x20=0x60**之间（我们将其记为内存**[0x40:0x60]**）

  这就是为什么0x80在最后（0x5f位置）。

  内存中的 "0x40 "槽在EVM中被命名为空闲内存指针，当需要内存时，它被用来分配内存的新槽。(我将在后面解释为什么它是有用的）。

  **重要的是：注意在一条指令之后，堆栈中所有需要的参数都会从堆栈中清除，并被返回值所取代。**

  由于MSTORE在堆栈中占用了2个参数，在MSTORE指令完成后，这2个参数会从堆栈中删除。

- CALLVALUE

  **CALLVALUE**指令把**msg.value**（发送给智能合约的以太币）放在堆栈中。

- **DUP1**

  复制栈顶数据，压入栈，注意还有DUP2, DUP3...DUPn(直到DUP16)，它们将第n个值(Stack n-1)推到堆栈中。

- **ISZERO**

  判断栈顶值是否等于0，如果是，则把栈顶值改为1

- **JUMPI**（指令使用了两个栈中元素，执行后会删除两个栈元素）

  条件调转指令，如果stack（1）== 1， EVM直接进入字节数stack（0）所在的位置，

  如：stack（0）= 0x0f，(十进制15)，如果Stack（1）== 1，那么EVM直接跳转到第15个指令

  如果不是，EVM继续依次执行它的路径，

- **JUMPDEST**

  没有任何作用，他只是表示一条JUMP或JUMPI指令指向这里，如果EVM跳到一个没有标记为“JUMPDEST”的地址，他就会自动回退

- CALLDATASIZE

  EVM调用**CALLDATASIZE**，等于msg.data.size（以太坊交易中数据字段的大小）, (当一个函数被调用时没有参数msg.data.size = 4，这4个字节被称为函数 "签名")

- **LT**：小于，它比较堆栈上的两个值（如果**Stack(0) < Stack(1)**，那么我们写1，否则写0）。

- **CALLDATALOAD**：储存msg.data到栈（stack(0)）中

  接受1个参数Stack(0)作为偏移量，并将msg.data之后的在参数位置（这里是Stack(0)）的下一个32字节存储在堆栈中Stack(0)

  在此案例中，它存储msg.data的前32字节（因为Stack(0) = 0）。

- **SHR**：位移操作，接收两个参数（stack(0)）

- **EQ**：比较（**Stack(0)\**和\**Stack(1)**）。相等写入1否则写入0到栈中

- **SSTORE**：操作码将Stack(1)存储到Stack(0)槽中（顾名思义）。(所以它使用了2个参数，因此在执行**SSTORE**的第21指令后，它们被从堆栈中移除了)

- **CODECOPY**：是一个特殊的操作码，它可以EVM内存中复制当前智能合约代码

  `CODECOPY`指令的参数(destOffset,offset,size)

  \- Stack(0) 复制代码到哪个内存位置。
  \- Stack(1) 开始复制代码时，在已执行的代码中的偏移量（从哪个位置开始复制）。
  \- Stack(2) 要复制多少字节的代码？

  它需要3个参数：

  - 第一个是Stack(0)，指令复制当前智能合约代码到EVM内存的Stack(0) 位置（这里Stack(0)=0），所以它将复制到内存的0x00槽。
  - 更确切地说，复制智能合约代码从**Stack(2)\**个字节到\**Stack(2)+Stack(1)\**个字节。
    看一下堆栈，这是位于\**0x22（=34的十进制）和（22+3f=61，即97的十进制）之间的代码**。

- **RETURN**：停止代码的执行，并返回内存[Stack(0):Stack(0)+Stack(1)]，这是**[0x00:0x40]**。

  **返回的这个值是存储在区块链中的**

- **MLOAD**：从内存中加载Stack(0)位置的值到堆栈，在内联汇编中是**MLOAD(0x40)**。因此80被推送到堆栈。(因为80在之前被存储在内存0x40处)

- **CODESIZE**：不从堆栈中获取任何参数，在堆栈中保存代码的大小，它是执行的代码的大小（因此这也是交易数据的大小，因为如前所述，要执行的代码位于交易数据中）

  