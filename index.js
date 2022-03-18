/* 
https://cryptozombies.io/th/lesson/2/chapter/8
หัวข้อ 8: DNA ซอมบี้

มาทำฟังก์ชั่น feedAndMultiply ให้สำเร็จกันเถอะ

สูตรสำหรับการคำนวณ DNA ในซอมบี้ตัวใหม่นั้นไม่ยุ่งยากเลย: คือการใช้ค่าเฉลี่ยระหว่าง DNA ของซอมบี้ตัวที่กิน กับ DNA ของเหยื่อ

function testDnaSplicing() public {
  uint zombieDna = 2222222222222222;
  uint targetDna = 4444444444444444;
  uint newZombieDna = (zombieDna + targetDna) / 2;
  // ^ จะมีค่าเท่ากับ 3333333333333333
}

ทดสอบ
อันดับแรกต้องมั่นใจว่า _targetDna มีความยาวไม่เกิน 16 ตัว ในการทำเช่นนั้น สามารถตั้งค่า _targetDna ให้เท่ากับ _targetDna % dnaModulus เพื่อให้รับ input ที่มีความยาวไม่เกิน 16 ตัว

ต่อมาฟังก์ชั่นของเราควรประกาศข้อมูลชนิด uint ที่มีชื่อว่า newDnaและ set ให้เท่ากับค่าเฉลี่ยระหว่าง DNA ของ myZombie และ _targetDna (เหมือนในตัวอย่างทางด้านบน)

Note: สามารถเข้าถึง property ของ myZombie โดยการใช้ myZombie.name และ myZombie.dna

เมื่อได้ DNA ใหม่ขึ้นมาแล้ว ก็ถึงเวลาของการเรียกฟังก์ชั่น _createZombie โดยสามารถเข้าไปดูได้ที่ tab zombiefactory.sol หากลืมว่าฟังก์ชั่นนี้ต้องเรียก parameter ตัวใดบ้าง อย่าลืมว่าเราต้องการชื่อของซอมบี้อีกด้วย ดังนั้นให้ตั้งชื่อว่า "NoName" ไปก่อน — สามารถมาเขียนฟังก์ชั่นสำหรับการเปลี่ยนชื่อซอมบี้ในภายหลังได้

pragma solidity ^0.4.19;

import "./zombiefactory.sol";

contract ZombieFeeding is ZombieFactory {

  function feedAndMultiply(uint _zombieId, uint _targetDna) public {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
    // start here
    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myZombie.dna + _targetDna) / 2;
    _createZombie("NoName", newDna);
  }

}

*/
