/* 
หัวข้อ 13: การสร้างอีเวนท์

contract ของเราก็จะใกล้เสร็จแล้ว จนถึงตอนนี้ก็ได้ถึงเวลาของการเพิ่ม event เข้าไป

Events คือวิธีหนึ่งสำหรับ contract ของเราที่จะสามารถสื่อสารได้ว่า มีบางสิ่งเกิดขึ้นบนบล็อคเชนของด้านหน้าแอพพลิเคชั่นของเรา (front-end) ซึ่งจะสามารถถูกฟัง (‘listening’) สำหรับบางเหตุการณ์และอาจจะมีการกำหนดให้สร้าง action ขึ้นมาเพื่อนรองรับอีเว้นท์ที่เกิดขึ้น

ตัวอย่าง:
// ประกาศอีเว้นท์
event IntegersAdded(uint x, uint y, uint result); ประกาศ event ให้หน้าบ้านเรียกใช้

function add(uint _x, uint _y) public {
  uint result = _x + _y;
  // สร้าง event ขึ้นมาเพื่อให้แอพพลิเคชั่นรู้ว่าฟังก์ชั่นได้ถูกเรียกแล้ว:
  IntegersAdded(_x, _y, result); // เรียกใช้ event ที่หน้าบ้าน call มาภายใน function ที่อยู่ใน contract
  return result;
}

Events ที่ถูกสร้างจาก contract หน้าบ้าน หรือ front-end ใช้หลักการของ listening ในการฟัง event เหล่านั้น ตัวอย่างของการ listening ผ่าน front-end
YourContract.IntegersAdded(function(error, result) {
  // ทำบางอย่างกับ result
})

pragma solidity ^0.4.19;

contract ZombieFactory {

    // เราจะทำการประกาศอีเวนท์ตรงนี้
    event NewZombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    function _createZombie(string _name, uint _dna) private {
        // and fire it here
        uint id = zombies.push(Zombie(_name, _dna)) - 1; // return index array ล่าสุดที่เพิ่มถูกเพิ่มเข้าไปใน array zombies
        NewZombie(id, _name, _dna); // ส่งค่าไปให้ event NewZombie
    }

    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }

    function createRandomZombie(string _name) public {
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }

}

*/