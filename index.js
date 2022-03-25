/* 
https://cryptozombies.io/th/lesson/2/chapter/9

หัวข้อ 9: เนื้อหาเรื่อง Function Visibility เพิ่มเติม


เมื่อเราพยายามที่จะคอมไพล์มันออกมา จะเห็นได้ว่าจะเกิด error ขึ้น
สาเหตุคือเมื่อเราพยายามที่จะเรียกฟังก์ชั่น _createZombie จากภายใน ZombieFeeding แต่เนื่องจากฟังก์ชั่น _createZombie นั้นมีค่าเป็น private ซึ่งอยู่ภายใน ZombieFactory แปลว่า contract ใดๆ ที่มีการ inherit มาจาก ZombieFactory จะไม่สามารถเข้าถึงได้

Internal และ External
นอกจาก public และ private Solidity ยังมีค่าการมองเห็น (visibility) อีก 2 ค่า: internal และ external

- Internal = internal เหมือนกับ private เว้นเพียงแต่มันยังสามารถเข้าถึง contract อื่น ๆ ที่มีการ inherit มาจาก contract ปัจจุบัน

- external = นั้นคล้ายกับ publicเพียงแต่ว่าฟังก์ชั่นต่างๆ จะสามารถถูกเรียกได้เฉพาะจากด้านนอกของ contract เท่านั้น — ฟังก์ชั่นเหล่านี้ไม่สามารถถูกเรียกโดยฟังก์ชั่นอื่นๆ ที่อยู่ภายใน contract

ในการประกาศฟังก์ชั่น internal หรือ external syntax ที่ใช้จะเหมือนกันกับใน private และ public ทุกประการ:

contract Sandwich {
  uint private sandwichesEaten = 0;

  function eat() internal {
    sandwichesEaten++;
  }
}

contract BLT is Sandwich {
  uint private baconSandwichesEaten = 0;

  function eatWithBacon() public returns (string) {
    baconSandwichesEaten++;
    // We can call this here because it's internal
    eat();
  }
}

มาทดสอบกันดูอีก
เปลี่ยน _createZombie() จาก private ให้เป็น internal แทน เพื่อให้ contract อื่น ๆ ของเราสามารถเข้าถึงฟังก์ชั่นนี้ได้

pragma solidity ^0.4.19;

contract ZombieFactory {

    event NewZombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    mapping (uint => address) public zombieToOwner;
    mapping (address => uint) ownerZombieCount;

    // แก้ไขความหมายของฟังก์ชั่นได้ที่ด้านล่าง
    function _createZombie(string _name, uint _dna) internal {
        uint id = zombies.push(Zombie(_name, _dna)) - 1;
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender]++;
        NewZombie(id, _name, _dna);
    }

    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }

    function createRandomZombie(string _name) public {
        require(ownerZombieCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }

}


*/
