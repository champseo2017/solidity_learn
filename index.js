/* 
https://cryptozombies.io/th/lesson/1/chapter/12 ถึงตรงนี้

หัวข้อ 12: Putting It Together นำทุกอย่างมารวมเข้าไว้ด้วยกัน
มาถึงตอนนี้เราก็ใกล้สำเร็จกับการสร้างตัวสุ่มซอมบี้แล้ว! มาสร้างฟังก์ชันชนิด public ที่จะรวมทุกๆ อย่างเข้าด้วยกันดีกว่า

ในตอนนี้เราก็กำลังจะสร้างฟังก์ชั่นชนิด public ที่จะรับเอาค่า input ต่างๆเช่น ชื่อซอมบี้ และใช้ชื่อซอมบี้นี้ในการสร้างซอมบี้ด้วย DNA ที่สุ่มได้มา

pragma solidity ^0.4.19;

contract ZombieFactory {

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    function _createZombie(string _name, uint _dna) private {
        zombies.push(Zombie(_name, _dna));
    } 

    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }

    // start here
    function createRandomZombie(string _name) public {
        uint randDna = _generateRandomDna(_name);
    }
}

*/