const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const puppeteer = require('puppeteer');

// Get App Access Token
const getAppAccessToken = async () => {
  const APP_ID = 'cli_a7f5b0d4d2f85010';
  const APP_SECRET = 'APIV0EVE31v2hY6TSvbSXxMTirZNoZgO';
  const url = 'https://open.larksuite.com/open-apis/auth/v3/app_access_token/internal/';

  try {
    const response = await axios.post(url, {
      app_id: APP_ID,
      app_secret: APP_SECRET
    });

    if (response.data && response.data.code === 0) {
      const appAccessToken = response.data.app_access_token;
      console.log('App Access Token:', appAccessToken);
      return appAccessToken;
    } else {
      console.log('error:', response.data.msg);
    }
  } catch (error) {
    console.error('error get token:', error.message);
  }
};

// Up image và get image_key
const uploadImage = async (APP_ACCESS_TOKEN) => {
  const uploadImageUrl = 'https://open.larksuite.com/open-apis/im/v1/images';
  const form = new FormData();
  form.append('image_type', 'message'); // Type image
  form.append('image', fs.createReadStream('./netlify-page-screenshot.png')); // Path to file image

  try {
    const response = await axios.post(uploadImageUrl, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${APP_ACCESS_TOKEN}`
      }
    });

    console.log('Upload response:', response.data);

    if (response.data.code === 0) {
      const imageKey = response.data.data.image_key;
      console.log('Image Key:', imageKey);
      return imageKey;
    } else {
      console.log('error up image:', response.data.msg);
    }
  } catch (error) {
    console.error('error when up image:', error.response ? error.response.data : error.message);
  }
};

// Send message and image
const sendImageAndTextMessage = async (APP_ACCESS_TOKEN, imageKey, text) => {
  const sendMessageUrl = 'https://open.larksuite.com/open-apis/bot/v2/hook/e34bb71e-0465-4049-88fb-b1c73b628a1d';

  const messagePayload = {
    msg_type: 'text',
    content: {
      text: text
    }
  };

  const imagePayload = {
    msg_type: 'image',
    content: {
      image_key: imageKey
    }
  };

  try {
    // Send image
    const imageResponse = await axios.post(sendMessageUrl, imagePayload, {
      headers: {
        Authorization: `Bearer ${APP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    // Send text
    const textResponse = await axios.post(sendMessageUrl, messagePayload, {
      headers: {
        Authorization: `Bearer ${APP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (textResponse.data.code === 0 && imageResponse.data.code === 0) {
      console.log('Image and message send successfully!');
    } else {
      console.log('error message:', textResponse.data.msg || imageResponse.data.msg);
    }
  } catch (error) {
    console.error('error send message:', error.message);
  }
};

// Up image and send message text and image
const uploadAndSendImageAndText = async () => {
  const token = await getAppAccessToken();
  if (token) {
    const imageKey = await uploadImage(token); // Up image and get image_key
    if (imageKey) {
      const text = 'Report page: https://monumental-gingersnap-ec0aa5.netlify.app/'; // text
      await sendImageAndTextMessage(token, imageKey, text); // Send message
    }
  }
};

// Screenshot screen netlify
const captureAndUploadScreenshot = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });

  // Open page report
  await page.goto('https://monumental-gingersnap-ec0aa5.netlify.app/', { waitUntil: 'networkidle2' });

  await page.waitForSelector('body');
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Screenshot screen
  await page.screenshot({ path: 'netlify-page-screenshot.png', fullPage: true });
  console.log('Screenshot saved as netlify-page-screenshot.png');

  await browser.close();

  await uploadAndSendImageAndText();
};

captureAndUploadScreenshot();
