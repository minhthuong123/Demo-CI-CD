# Sử dụng base image với node
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json trước để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Lệnh chạy ứng dụng
CMD ["npm", "f L-01"]