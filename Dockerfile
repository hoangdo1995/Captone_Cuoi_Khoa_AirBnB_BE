# Sử dụng một hình ảnh Node.js làm cơ sở
FROM node:18

# Đặt thư mục làm việc mặc định trong hình ảnh
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các phụ thuộc của ứng dụng
RUN npm install

# Sao chép tất cả tệp trong dự án NestJS vào hình ảnh
COPY . .

# Tạo cơ sở dữ liệu PostgreSQL thông qua Prisma
RUN npx prisma generate

# Xây dựng ứng dụng NestJS
RUN npm run build

# Expose cổng mà ứng dụng sẽ chạy trên
EXPOSE 8080

# Khởi chạy ứng dụng NestJS
CMD ["yarn", "start"]