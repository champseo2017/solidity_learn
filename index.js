/* 
Public Arrays
เราสามารถประกาศ array ให้มีค่าเป็น public และ Solidity ก็จะสร้าง getter method ขึ้นมาโดยอัตโนมัติสำหรับ array นี้ โดยหน้าตาของ syntax จะเป็นดังต่อไปนี้:

Person[] public people;

ทำให้ contract อื่นๆ จะสามารถอ่านค่าได้ (แต่ไม่สามารถเขียนได้) ลงใน array นี้ ดังนั้นpattern นี้จึงเหมาะสำหรับการบรรจุข้อมูลที่เป็นสาธารณะหรือว่า public ใน contract ของคุณ

*/