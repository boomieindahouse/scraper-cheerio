const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs'); // ใช้สำหรับเขียนไฟล์

// ฟังก์ชันดึงข้อมูลจากเว็บ
async function scrapeData(url) {
  try {
    // ดึงข้อมูล HTML จาก URL
    const { data } = await axios.get(url);

    // โหลด HTML ลงใน Cheerio
    const $ = cheerio.load(data);

    // ดึงลิงก์รูปภาพทั้งหมด
    const images = [];
    $('img').each((index, element) => {
      const imgSrc = $(element).attr('src');
      images.push(imgSrc); // เก็บลิงก์รูปภาพ
    });

    // แปลง array เป็น string และเขียนลงไฟล์
    const result = images.join('\n'); // แยกแต่ละลิงก์ด้วยบรรทัดใหม่
    fs.writeFileSync('result.txt', result, 'utf-8'); // บันทึกลงไฟล์

    console.log('✅ บันทึกผลลัพธ์ลง result.txt เรียบร้อย');
  } catch (error) {
    console.error('❌ Error scraping data:', error);
  }
}

// เรียกใช้ฟังก์ชัน
scrapeData('https://meeting.co.th/webdesign');
