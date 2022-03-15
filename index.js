/* 
https://cryptozombies.io/th/lesson/2/chapter/6
หัวข้อ 6: Import

เมื่อมีไฟล์มากกว่า 1 เราจะต้องทำการอิมพอร์ตไฟล์ให้เข้าไปอยู่ในอีกไฟล์หนึ่ง โดย Solidity จะใช้คำว่า import :

import "./someothercontract.sol";

contract newContract is SomeOtherContract {

}

ในตอนนี้หลังจากได้ตั้งค่าโครงสร้างหลายไฟล์ขึ้นมา (multi-file structure) เราจำเป็นจะต้องใช้คำสั่ง import เพื่ออ่านเนื้อหาของอีกไฟล์หนึ่งด้วย:

อิมพอร์ต zombiefactory.sol เข้าไปในไฟล์ใหม่ที่ชื่อว่า zombiefeeding.sol

pragma solidity ^0.4.19;

// put import statement here
import "./zombiefactory.sol";

contract ZombieFeeding is ZombieFactory {

}

*/
