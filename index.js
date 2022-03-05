/* 
https://cryptozombies.io/th/lesson/1/chapter/11

Keccak256 and Typecasting
ถ้าเราต้องการที่จะให้ฟังก์ชั่น _generateRandomDna รีเทิร์นค่า (กึ่ง) สุ่มชนิด uint เราจะสามารถทำได้อย่างไร?

Ethereum มีฟังก์ชันแฮช (Hash function) keccak256 เป็นของตัวเอง ซึ่งในกรณีนี้จะเป็นเวอร์ชั่น SHA3 แฮชฟังก์ชั่นโดยปกติแล้วก็จะรวบรวมข้อมูล input ชนิด string เข้าให้เป็นเลขสุ่ม Hexadecimal ที่มี 256 บิท ทั้งนี้การเปลี่ยนแปลงของข้อมูล string เพียงเล็กน้อยก็จะส่งผลยิ่งใหญ่ต่อค่าแฮชได้ (hash)

ซึ่งฟังก์ชันแฮชดังที่กล่าวมานี้มีประโยชน์อย่างมากใน Ethereum แต่ในตอนนี้เราจะขอใช้ตัวสร้างเลขสุ่มเทียม(pseudo-random number generation) แทนไปก่อน
//6e91ec6b618bb462a4a6ee5aa2cb0e9cf30f7a052bb467b0ba58b8748c00d2e5
keccak256("aaaab");
//b1f078126895a1424524de5321b339ab00408010b7cf0e6ed451514981e58aa9
keccak256("aaaac");

Typcasting (การแปลง type)
ในบางครั้งเราก็ต้องการที่จะเปลี่ยนประเภทของข้อมูลหนึ่งไปเป็นอีกประเภทหนึ่ง ซึ่งก็สามารถทำได้ดังนี้:

uint8 a = 5;
uint b = 6;
//จะเกิด error ขึ้นเนื่องจาก a*b นั้นจะรีเทิร์นค่าออกมาเป็นชนิด uint แทนที่จะเป็น uint8
uint8 c = a * b; 
//เราจึงต้องทำการ typecast หรือแปลงชนิดของข้อมูล b ให้เป็น uint8 เพื่อที่จะทำให้ไม่เกิด error ขึ้น
uint8 c = a * uint8(b);

ในตัวอย่างข้างต้น a*b จะรีเทิร์นค่าออกมาเป็น uint แต่เนื่องจากเราต้องการที่จะเก็บค่าในรูปของ uint8 จึงทำให้เกิดปัญหาขึ้นมา ดังนั้นการที่ cast ข้อมูล input ให้กลายเป็น ‘uint8’ ก็จะทำให้โค้ดใช้งานได้อีกครั้งและไม่เกิด error ขึ้น

pragma solidity ^0.4.19;

contract ZombieFactory {

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    function _createZombie(string _name, uint _dna) private {
        zombies.push(Zombie(_name, _dna));
    } 

    function _generateRandomDna(string _str) private view returns (uint) {
        // start here
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }

}
*/