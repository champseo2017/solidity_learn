/* 
หัวข้อ 3: Msg.sender
ใน Solidity มีตัวแปรชนิด global อยู่หลายชนิด
msg.sender
ใน Solidity มีตัวแปรชนิด global อยู่หลายชนิด ซึ่งสามารถถูกนำไปใช้ได้ในทุกฟังก์ชั่น หนึ่งในนั้นก็คือ msg.sender ซึ่งเอาไว้อ้างถึง address หรือที่อยู่ของบุคคล (หรือ smart contract) ที่เป็นผู้เรียกใช้ฟังก์ชั่นดังกล่าว

Note: การเรียกใช้ฟังก์ชั่นใน Solidity จะเริ่มต้นจากการที่มีผู้เรียกใช้จากภายนอก (external caller) เสมอ โดย contract หนึ่ง ๆ จะอยูบน blockchain เฉย ๆ จนกว่าจะมีผู้เรียกใช้หนึ่งในฟังก์ชั่นของมันขึ้นมา ดังนั้นเราจึงต้องมี msg.senderเสมอ

ต่อไปนี้จะเป็นตัวอย่างของการใช้ msg.sender และอัพเดท mapping:
mapping (address => uint) favoriteNumber;
function setMyNumber(uint _myNumber) public {
  // อัพเดท `favoriteNumber` ของเรา mapเพื่อเก็บค่า `_myNumber` ภายใต้การใช้ `msg.sender`
  favoriteNumber[msg.sender] = _myNumber;
  // ^ syntax สำหรับการจัดเก็บข้อมูลลงใน mapping มีรูปแบบเหมือนกับของ arrays
}

function whatIsMyNumber() public view returns (uint) {
  // รับค่าที่ถูกเก็บไว้ใน address ของผู้ส่ง
  // จะมีค่าเป็น `0` หากผู้ใช้ยังไม่ได้เรียกฟังก์ชั่น `setMyNumber` ขึ้นมา
  return favoriteNumber[msg.sender];
}
ในตัวอย่างง่ายๆ ข้างต้น ใครก็สามารถเรียก setMyNumber และเก็บข้อมูลชนิด uint ลงใน contract ของเราได้ ซึ่งข้อมูลจะถูกผูกเข้ากับ address ของผู้นั้น ฉะนั้นเมื่อไหร่ที่มีการเรียกฟังก์ชั่น whatIsMyNumber จะหมายถึงการรีเทิร์นข้อมูลชนิด uint ถูกได้ถูกเก็บไว้ออกมา

การใช้ msg.sender จะสร้างความปลอดภัยบน blockchin บน Ethereum ให้แก่ผู้ใช้ — หนทางเดียวที่ผู้อื่นจะสามารถเข้ามาปรับแต่งข้อมูลของอีกฝ่ายได้ คือต้องทำการขโมยข้อมูลส่วนตัวทีเชื่อมกับ address บน Ethereum เท่านั้น

ลองมาทดสอบกันดีกว่า
มาทำการอัพเดท method _createZombie จากในบทที่ 1 เพื่อกำหนดค่าความเป็นเจ้าของของคนที่สร้าง zombies ขึ้นมา

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

    function _createZombie(string _name, uint _dna) private {
        uint id = zombies.push(Zombie(_name, _dna)) - 1;
        // เริ่มตรงนี้
        // มีค่าเป็นศูนย์ถ้ายังไม่ได้เรียกฟังช์ชัน _createZombie
        zombieToOwner[id] = msg.sender; // กำหนด id ของ zombieToOwner เท่ากับ address
        ownerZombieCount[msg.sender]++; // เพิ่มจำนวน ownerZombieCount ที่เท่ากับ address ของ zombieToOwner 
        NewZombie(id, _name, _dna);
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
