
const SHA256 = require('crypto-js/sha256');
class block{
    constructor(index , timestamp , data ,previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash() ;
        this.nonce = 0 ;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring( 0 , difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++ ;
            this.hash = this.calculateHash();
        }         
        console.log('Block mined' + this.hash);
    }
}

class blockChain {
    constructor() {
        this.chain = [this.createGenisiBlock()];
        this.difficulty = 4;
    }

    createGenisiBlock() {
        return new block( 0 , '01/01/2019' , 'Genisis block' , '0');
    }

    getLatestBlock () {
        return this.chain[this.chain.length - 1];
    }

    addBlock (newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    isChainValid() {
        for (let i = 1 ; i < this.chain.length ; i++ ) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let cjcoin = new blockChain();
console.log('mining block 1');
cjcoin.addBlock(new block( 1 , '05-01-2019' , {amount : 4}));
console.log('mining block 2');
cjcoin.addBlock(new block( 2 , '10-01-2019' , {amount : 18}));

console.log(JSON.stringify( cjcoin , null , '\t'));
