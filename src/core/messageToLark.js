const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

// Thay YOUR_APP_ID và YOUR_APP_SECRET bằng thông tin thật của bạn
const APP_ID = 'cli_a7f5b0d4d2f85010';
const APP_SECRET = 'APIV0EVE31v2hY6TSvbSXxMTirZNoZgO';

// Địa chỉ endpoint để lấy App Access Token
const url = 'https://open.larksuite.com/open-apis/auth/v3/app_access_token/internal/';

// Hàm lấy App Access Token
const getAppAccessToken = async () => {
  try {
    // Gửi yêu cầu POST để lấy token
    const response = await axios.post(url, {
      app_id: APP_ID,
      app_secret: APP_SECRET,
    });

    // Kiểm tra xem response có chứa dữ liệu hợp lệ không
    if (response.data && response.data.code === 0) {
      // Lấy app_access_token từ response đúng cách
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
  form.append('image', fs.createReadStream('./IMG.jpg')); // Đường dẫn tới tệp hình ảnh

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

// Hàm gửi tin nhắn chứa hình ảnh
const sendImageMessage = async (APP_ACCESS_TOKEN, imageKey) => {
  const sendMessageUrl = 'https://open.larksuite.com/open-apis/bot/v2/hook/e34bb71e-0465-4049-88fb-b1c73b628a1d';
  
  // Thay "user_id" bằng ID người nhận thực tế hoặc ID của nhóm bạn muốn gửi
  const messagePayload = {
    "user_id": "user_id_của_bạn", // Thay bằng user_id của người nhận hoặc chat_id của nhóm
    "msg_type": "image",
    "content": {
      "image_key": imageKey
    }
  };

  try {
    const response = await axios.post(sendMessageUrl, messagePayload, {
      headers: {
        'Authorization': `Bearer ${APP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
    });

    if (response.data.code === 0) {
      console.log('Tin nhắn đã được gửi thành công!');
    } else {
      console.log('Lỗi khi gửi tin nhắn:', response.data.msg);
    }
  } catch (error) {
    console.error('Lỗi khi gửi tin nhắn:', error.message);
  }
};

// Hàm tải lên hình ảnh và gửi tin nhắn
const uploadAndSendImage = async () => {
  const token = await getAppAccessToken();
  if (token) {
    const imageKey = await uploadImage(token);  // Tải lên hình ảnh và lấy image_key
    if (imageKey) {
      await sendImageMessage(token, imageKey);  // Gửi tin nhắn chứa hình ảnh
    }
  }
};

// Chạy hàm chính
uploadAndSendImage();