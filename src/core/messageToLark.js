const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const puppeteer = require('puppeteer');

// Định nghĩa hàm lấy App Access Token
const getAppAccessToken = async () => {
  const APP_ID = 'cli_a7f5b0d4d2f85010';
  const APP_SECRET = 'APIV0EVE31v2hY6TSvbSXxMTirZNoZgO';
  const url = 'https://open.larksuite.com/open-apis/auth/v3/app_access_token/internal/';

  try {
    const response = await axios.post(url, {
      app_id: APP_ID,
      app_secret: APP_SECRET,
    });

    if (response.data && response.data.code === 0) {
      const appAccessToken = response.data.app_access_token;
      console.log('App Access Token:', appAccessToken);
      return appAccessToken;
    } else {
      console.log('Lỗi:', response.data.msg || 'Không có thông tin trả về');
    }
  } catch (error) {
    console.error('Lỗi khi lấy token:', error.message);
  }
};

// Hàm tải lên hình ảnh và lấy image_key
const uploadImage = async (APP_ACCESS_TOKEN) => {
  const uploadImageUrl = 'https://open.larksuite.com/open-apis/im/v1/images';
  const form = new FormData();
  form.append('image_type', 'message'); // Loại hình ảnh (message hoặc avatar)
  form.append('image', fs.createReadStream('./netlify-page-screenshot.png')); // Đường dẫn tới tệp hình ảnh

  try {
    const response = await axios.post(uploadImageUrl, form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${APP_ACCESS_TOKEN}`,
      },
    });

    console.log('Upload response:', response.data);

    if (response.data.code === 0) {
      const imageKey = response.data.data.image_key;
      console.log('Image Key:', imageKey);
      return imageKey;
    } else {
      console.log('Lỗi tải lên hình ảnh:', response.data.msg);
    }
  } catch (error) {
    console.error('Lỗi khi tải lên hình ảnh:', error.response ? error.response.data : error.message);
  }
};

// Hàm gửi tin nhắn chứa hình ảnh và văn bản
const sendImageAndTextMessage = async (APP_ACCESS_TOKEN, imageKey, text) => {
  const sendMessageUrl = 'https://open.larksuite.com/open-apis/bot/v2/hook/e34bb71e-0465-4049-88fb-b1c73b628a1d';
  
  const messagePayload = {
    "user_id": "user_id_của_bạn", // Thay bằng user_id của người nhận hoặc chat_id của nhóm
    "msg_type": "text", // Chọn loại tin nhắn là văn bản
    "content": {
      "text": text,  // Nội dung văn bản bạn muốn gửi
    },
  };

  const imagePayload = {
    "user_id": "user_id_của_bạn", // Thay bằng user_id của người nhận hoặc chat_id của nhóm
    "msg_type": "image",  // Tin nhắn loại hình ảnh
    "content": {
      "image_key": imageKey, // Thêm image_key vào tin nhắn hình ảnh
    }
  };

  try {
    // Gửi tin nhắn hình ảnh
    const imageResponse = await axios.post(sendMessageUrl, imagePayload, {
      headers: {
        'Authorization': `Bearer ${APP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
    });

    // Gửi tin nhắn văn bản
    const textResponse = await axios.post(sendMessageUrl, messagePayload, {
      headers: {
        'Authorization': `Bearer ${APP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
    });

    if (textResponse.data.code === 0 && imageResponse.data.code === 0) {
      console.log('Tin nhắn văn bản và hình ảnh đã được gửi thành công!');
    } else {
      console.log('Lỗi khi gửi tin nhắn:', textResponse.data.msg || imageResponse.data.msg);
    }
  } catch (error) {
    console.error('Lỗi khi gửi tin nhắn:', error.message);
  }
};

// Hàm tải lên hình ảnh và gửi tin nhắn văn bản và hình ảnh
const uploadAndSendImageAndText = async () => {
  const token = await getAppAccessToken();
  if (token) {
    const imageKey = await uploadImage(token);  // Tải lên hình ảnh và lấy image_key
    if (imageKey) {
      const text = 'Report page: https://monumental-gingersnap-ec0aa5.netlify.app/';  // Văn bản bạn muốn gửi
      await sendImageAndTextMessage(token, imageKey, text);  // Gửi tin nhắn chứa hình ảnh và văn bản
    }
  }
};

// Chạy hàm chính
const captureAndUploadScreenshot = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Thiết lập viewport ở kích thước chuẩn (ví dụ 1280x800)
  await page.setViewport({ width: 1280, height: 800 });

  // Điều hướng trình duyệt đến URL của trang
  await page.goto('https://monumental-gingersnap-ec0aa5.netlify.app/', { waitUntil: 'networkidle2' });

  // Chờ đến khi body xuất hiện
  await page.waitForSelector('body'); 

  // Chờ thêm 5 giây để đảm bảo dữ liệu đã được load hoàn toàn
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Chụp ảnh màn hình
  await page.screenshot({ path: 'netlify-page-screenshot.png', fullPage: true });
  console.log('Screenshot saved as netlify-page-screenshot.png');

  await browser.close();

  // Tiếp tục upload và gửi tin nhắn
  await uploadAndSendImageAndText();
};

// Gọi hàm chính
captureAndUploadScreenshot();