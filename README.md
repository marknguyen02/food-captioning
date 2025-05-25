# Visual Captioning

## Overview

Visual Captioning là dự án tạo chú thích tự động cho ảnh sử dụng học sâu. Hệ thống này kết hợp các mô hình học sâu tiên tiến để phân tích hình ảnh và tạo mô tả chính xác bằng ngôn ngữ tự nhiên.

## Tính năng chính

- **Phân tích hình ảnh tự động** sử dụng các mô hình CNN và Vision Transformer
- **Giao diện web thân thiện** cho người dùng
- **Lưu trữ đám mây** để quản lý hình ảnh và mô tả
- **API RESTful** cho tích hợp với các ứng dụng khác

## Yêu cầu hệ thống

- Python 3.8+
- Node.js 16+
- Docker và Docker Compose
- MongoDB
- AWS S3

## Hướng dẫn cài đặt

### 1. Chuẩn bị cơ sở dữ liệu

#### MongoDB Cloud

1. Tạo tài khoản và cluster trên [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Tạo database và user có quyền truy cập
3. Lấy **MongoDB URI** có dạng:
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

#### AWS S3 Storage

1. Đăng ký tài khoản [AWS](https://aws.amazon.com/) nếu chưa có
2. Tạo S3 bucket mới cho lưu trữ hình ảnh
3. Tạo IAM user với quyền truy cập S3
4. Tạo và lưu **Access Key ID** và **Secret Access Key**

### 2. Clone và cấu hình dự án

```bash
git clone git@github.com:anh7777/visual_captioning_website.git

cd backend
```

Tạo file `.env` với nội dung sau:

```env
ACCESS_TOKEN_EXPIRE_MINUTES="30"
REFRESH_TOKEN_EXPIRE_DAYS="7"
JWT_SECRET_KEY="your-secret-key"
JWT_ALGORITHM="HS256"
MONGO_URI="mongodb+srv://your_mongo_user:your_mongo_password@cluster0.mongodb.net/your_db_name?retryWrites=true&w=majority"
MONGO_DB_NAME="your_db_name"
AWS_ACCESS_KEY="YOUR_AWS_ACCESS_KEY_ID"
AWS_SECRET_KEY="YOUR_AWS_SECRET_ACCESS_KEY"
BUCKET_NAME="your_s3_bucket_name"
```

> **Lưu ý**: Thay thế các giá trị mẫu bằng thông tin thực của bạn.

### 3. Triển khai với Docker

```bash
cd ../

docker-compose build

docker-compose up
```

Sau khi triển khai thành công:
- Backend API: http://localhost:8000
- Frontend: http://localhost:3000

### 4. Triển khai thủ công

#### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend

```bash
cd frontend
npm install
npm start
```

## Triển khai từ Docker Hub

Nếu bạn muốn sử dụng Docker image có sẵn:

```bash
docker pull marknguyenn02/visual-captioning-backend
docker pull marknguyenn02/visual-captioning-frontend

docker run -d -p 8000:8000 --env-file .env --name backend marknguyen02/visual-captioning-backend
docker run -d -p 3000:3000 --name frontend marknguyen02/visual-captioning-frontend
```

## Kết quả
Chi tiết video demo xem tại đây: [**Video**](https://drive.google.com/file/d/1OaFNeauY_yB5Tw9ItD_2tiuk_8JeoVlm/view?usp=sharing)
