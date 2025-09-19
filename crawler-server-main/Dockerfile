# Sử dụng Node.js phiên bản mới
FROM node:20

# Đặt thư mục làm việc
WORKDIR /crawler-server

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Cài đặt đầy đủ dependencies (bao gồm devDependencies)
RUN npm ci

# Sao chép mã nguồn
COPY . .

# Build TypeScript sang JavaScript
RUN npm run build

# Xóa devDependencies để giảm kích thước image
RUN npm prune --omit=dev

# Expose port
EXPOSE 5000

# Chạy ứng dụng từ mã đã build
CMD ["npm", "start"]