/* 
Arrays
เมื่อคุณต้องการชุดข้อมูลของอะไรบางอย่าง คุณสามารถใช้ array มาช่วยในการจัดการได้ ซึ่งใน Solidity นั้นเราจะมี arrays อยู่2 ชนิด ได้แก่: fixed arrays และ dynamic arrays:

// fixed Array จำกัดความยาวให้มีแค่2 elements :
uint[2] fixedArray;
// หรือจะเป็น fixed Array ที่สามารถมีข้อมูลชนิด Strings ได้ 5 ตัวก็จะเขียนได้ว่า:
string[5] stringArray ;
// Dynamic Array – จะไม่จำกัดขนาดที่แน่นอน ซึ่งแปลว่า array ชนิดนี้สามารถมีขนาดเพิ่มได้เรื่อยๆ :
uint[] dynamicArray;

ตัวอย่าง dynamic Array
Person[] people;

*/