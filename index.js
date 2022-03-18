/* 
https://cryptozombies.io/th/lesson/2/chapter/7
หัวข้อ 7: Storage vs. Memory

Storage หมายถึงตัวแปรที่ถูกจัดเก็บอย่างถาวรบน blokchain Memory หมายถึงตัวแปรที่ถูกจัดเก็บชั่วคราว และจะถูกลบออกไประหว่างที่ฟังก์ชั่นภายเรียกใช้ contract เปรียบเทียบความแตกต่างของ 2 สิ่ง ว่าเหมือนระหว่าง hard disk กับ RAM

โดยทั่วไปแล้วเราไม่จำเป็นต้องมายุ่งกับ keyword พวกนี้เนื่องจาก Solidity จะจัดการให้ตั้งแต่แรกเริ่มแล้ว โดยแรกเริ่มแล้ว State variables (ตัวแปรที่ถูกประกาศค่าจากภายนอกฟังก์ชั่น) จะอยู่ใน storage และถูกเขียนอย่างถาวรลงใน blockchain ในขณะที่ตัวแปรที่ถูกประกาศค่าภายในฟังก์ชั่นจะอยู่ใน memory และจะหายไปเมื่อการเรียกฟังก์ชั่นนั้น ๆ ได้สิ้นสุดลง

อย่างไรก็ตาม อาจมีบางกรณีที่เราจะต้องมายุ่งกับคำพวกนี้ เช่นเมื่อต้องใช้ structs และ arrays ภายในฟังก์ชั่น:

contract SandwichFactory {
  struct Sandwich {
    string name;
    string status;
  }

  Sandwich[] sandwiches;

  function eatSandwich(uint _index) public {
    // Sandwich mySandwich = sandwiches[_index];

    // ^ ดูผิวเผินแล้วไม่มีอะไร แต่ Solidity จะเตือนว่าเราต้องประกาศ ณ //ตรงนี้ว่าเป็น `storage` หรือ `memory` 

    // ดังนั้นเราจึงควรประกาศด้วยคำว่า `storage` ดังต่อไปนี้:
    Sandwich storage mySandwich = sandwiches[_index];
    // ...กรณีนี้ `mySandwich` เป็น pointer ไปยัง `sandwiches[_index]`
    // ภายใน storage และ...
    mySandwich.status = "Eaten!";
    // ...`sandwiches[_index]`จะถูกเปลี่ยนถาวรบน blockchain ณ จุดนี้

    // หากต้องการก็อปปี้ สามารถใช้คำว่า `memory` แทน:
    Sandwich memory anotherSandwich = sandwiches[_index + 1];
    // ...กรณีนี้ `anotherSandwich` จะเป็นข้อมูลก็อปปี้ของข้อมูลใน memory
    //และ ...
    anotherSandwich.status = "Eaten!";
    // ...จะเปลี่ยนแปลงตัวแปรชนิดชั่วคราวและไม่มีผลใด ๆ ต่อ `sandwiches[_index + 1]`แต่เราสามารถทำแบบนี้ได้:
    sandwiches[_index + 1] = anotherSandwich;
    // ...หากต้องการทำสำเนาของการเปลี่ยนแปลงกลับไปยังใน storage ของ blockchain
  }
}

มาทดสอบกันดูดีกว่า
ถึงเวลาแล้วที่จะมอบความสามารถให้ซอมบี้ของเรานั้นกินได้หลาย ๆ อย่าง!

เมื่อใดที่ซอมบี้กินสิ่งมีชีวิตเข้าไป DNA ของมันจะไปรวมกับ DNA ของเหยื่อดังกล่าวและผลิตซอมบี้ตัวใหม่ขึ้นมา

สร้างฟังก์ชั่นที่มีชื่อว่า feedAndMultiply ให้รับ parameter 2 ค่า: _zombieId (ชนิด uint) และ _targetDna (ชนิด uint) ฟังก์ชั่นนี้ควรมีค่าเป็น public.

แต่เราไม่ต้องการให้ผู้อื่นมาให้อาหารซอมบี้ของเรา! ดังนั้นในอันดับแรก ต้องทำให้แน่ใจว่าซอมบี้นี้เป็นของเราเสียก่อน โดยใส่คำสั่ง require เพื่อให้มั่นใจว่า msg.sender คือเจ้าของของซอมบี้ (คล้ายกับตอนที่ทำในฟังก์ชั่น createRandomZombie).

Note: answer-checker ของเราค่อนข้างล้าหลัง จึงควรให้ msg.sender มาก่อน ไม่เช่นนั้นคำตอบจะถือว่าผิด แต่ในความเป็นจริงจะเอาอะไรขึ้นก่อนก็ไม่มีปัญหาแน่นอน

เราจำเป็นต้องมี DNA ของซอมบี้ เพราะฉะนั้น สิ่งที่ฟังก์ชั่นของเราต้องทำต่อไปก็คือการประกาศ local Zombie ที่มีชื่อว่า myZombie (ซึ่งจะเป็น pointer ของ storage ) ตั้งค่าตัวแปรนี้ให้เท่ากับ index _zombieId ใน array ชื่อ zombies

pragma solidity ^0.4.19;

import "./zombiefactory.sol";

contract ZombieFeeding is ZombieFactory {

  // เริ่มที่ตรงนี้
  function feedAndMultiply(uint _zombieId, uint _targetDna) public {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
  }

}

*/
