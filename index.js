/* 
https://cryptozombies.io/th/lesson/2/chapter/5
หัวข้อ 5: Inheritance

ยังมี contract ที่เป็น feature หนึ่งใน Solidity ซึ่งช่วยในการจัดการก็คือ inheritance:

contract Doge {
  function catchphrase() public returns (string) {
    return "So Wow CryptoDoge";
  }
}

contract BabyDoge is Doge {
  function anotherCatchphrase() public returns (string) {
    return "Such Moon BabyDoge";
  }
}

BabyDoge inherits มาจาก Doge หมายถึงหากเรามีการ compile และเรียก BabyDoge ขึ้น จะสามารถเข้าถึงได้ทั้งฟังก์ชั่น catchphrase() และ anotherCatchphrase() (และยังสามารถเข้าถึงฟังก์ชั่นชนิด public ใดๆ ก็ตามที่เราอาจเพิ่มเข้าไปใน Doge).

วิธีนี้สามารถนำไปใช้ใน logical inheritance (อย่างเช่นใช้กับ subclass ว่า Cat นั้นเป็น Animal) นอกจากนี้ยังสามาถใช้เพื่อการจัดการโค้ดโดยการจัดกลุ่มให้ logic ที่มีความคล้ายคลึงกันให้อยู่ด้วยกันเป็นกลุ่มๆ

ทดสอบ
สร้าง contract ชื่อว่า ZombieFeeding ให้อยู่ด้านล่าง ZombieFactory โดย contract นี้จะต้องรับ inherit มาจาก contract ชื่อ ZombieFactory


*/
