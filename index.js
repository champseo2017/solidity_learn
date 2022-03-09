/* 
หัวข้อ 2: Mappings and Addresses

ถึงเวลาในการสร้างเกมส์แบบ multi-player ของเรา โดยการเพิ่มเจ้าของให้กับซอมบี้ที่อยู่ใน database

ในการที่จะทำเช่นนั้นได้ เราต้องใช้ข้อมูลอยู่ 2 ชนิด ได้แก่ mapping และ address.

Addresses
blockchain ของ Ethereum ถูกสร้างขึ้นมาจาก accounts ซึ่งสามารถเปรียบเทียบได้กับบัญชีธนาคารที่เราใช้กันทั่วๆ ไป บัญชีนี้จะมียอดของ Ether (เป็นค่าเงินที่ใช้ภายใน blockchain บน Ethereum)และสามารถแลกเปลี่ยนการใช้จ่าย Ether payment ไปยังบัญชีอื่น ๆ ได้อีกด้วย ซึ่งเหมือนกับการโอนเงินผ่านบัญชีธนาคารไปยังบัญชีของผู้อื่นในโลกความเป็นจริงนั่นเอง

แต่ละบัญชีจะมี address ที่เปรียบเสมือนกับเลขบัญชีธนาคาร โดยจะมีความจำเพาะต่อบัญชีหนึ่งบัญชี เท่านั้น หน้าตาจะเป็นดังนี้้:

0x0cE446255506E92DF41614C46F1d6df9Cc969183

โดยเราจะลงรายละเอียดเกี่ยวกับ addresses ในบทหลังจากนี้ ณ ตอนนี้ขอเพียงแค่เข้าใจว่า address จะจำเพาะเจาะจงต่อผู้ใช้เพียงคนเดียวเท่านั้น (หรือว่าเป็น smart contract นั่นเอง).

จึงสามารถใช้ address เป็น unique ID สำหรับเจ้าของซอมบี้ของเราได้ เมื่อผู้ใช้สร้างซอมบี้ตัวใหม่ขึ้นจากการเล่นแอพพลิคเคชั่นของเรา ซอมบี้เหล่านั้นจะถูกสร้างความเป็นเจ้าของ (ownership) ต่อ Ethereum address ซึ่งเรียกอีกอย่างหนึ่งว่าฟังก์ชั่น

Mappings
ในบทเรียนที่ 1 เราให้ความสนใจกับ structs และ arrays Mappings เป็นอีกทางหนึ่งในการจัดเก็บข้อมูลที่เตรียมไว้ลงใน Solidity

การให้นิยาม mapping จะมีหน้าตาดังนี้:
// สำหรับแอพพลิเคชั่นทางด้านการเงิน การเก็บข้อมูลชนิด uint ที่เก็บยอดคงเหลื่อในบัญชีของผู้ใช้:
mapping (address => uint) public accountBalance;
// หรือสามารถใช้ในการเก็บ / แสดงผล username ที่ขึ้นอยู่กับ userId
mapping (uint => string) userIdToName;

mapping เป็นหัวใจสำคัญหลัก ๆ ในการเก็บหรือแสดงผลของข้อมูล ในตัวอย่างแรก จะมีส่วนสำคัญ (key) คือ address ซึ่งมีชนิดเป็น uintแล key ในตัวอย่างที่สองได้แก่ uint ซึ่งมีชนิดเป็น string

ในการเก็บค่าความเป็นเจ้าของแก่ซอมบี้ จะต้องใช้ 
mappings 2 อย่าง: 
อันแรกสำหรับการติดตามค่า address ที่จำเพาะต่อซอมบี้

อันที่สองไว้ใช้ติดตามค่าจำนวนของซอมบี้ที่เจ้าของมี

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

    // ประกาศ mapping ตรงนี้
    mapping เป็นหัวใจสำคัญหลัก ๆ ในการเก็บหรือแสดงผลของข้อมูล
    key เป็น uint มีค่าเป็น address
    mapping (uint => address) public zombieToOwner; // อันแรกสำหรับการติดตามค่า address ที่จำเพาะต่อซอมบี้

    key เป็น address โดยจะมีค่าเป็น uint
    mapping (address => uint) ownerZombieCount; // อันที่สองไว้ใช้ติดตามค่าจำนวนของซอมบี้ที่เจ้าของมี

    function _createZombie(string _name, uint _dna) private {
        uint id = zombies.push(Zombie(_name, _dna)) - 1;
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
