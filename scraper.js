const axios = require('axios');
const cheerio = require('cheerio');

// ฟังก์ชันดึงข้อมูลจากเว็บ
async function scrapeData(url) {
  try {
    // ดึงข้อมูล HTML จาก URL
    const { data } = await axios.get(url);

    // โหลด HTML ลงใน Cheerio
    const $ = cheerio.load(data);

    // ตัวอย่างการดึงข้อมูล เช่น หารูปภาพจากหน้าเว็บ
    const images = [];
    $('img').each((index, element) => {
      const imgSrc = $(element).attr('src');
      images.push(imgSrc); // เก็บลิงค์รูปภาพ
    });

    console.log(images); // แสดงผลลัพธ์
  } catch (error) {
    console.error('Error scraping data:', error);
  }
}

// เรียกใช้ฟังก์ชัน
scrapeData('your-url.com'); // เปลี่ยน URL ตามที่ต้องการ
