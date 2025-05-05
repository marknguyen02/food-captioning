# 🚨 **Lưu ý: Dự án vẫn đang trong quá trình phát triển và chưa hoàn thành.** 🚨

# Visual Captioning Application

## 1. Giới thiệu

Dự án này tập trung vào việc phát triển ứng dụng web Visual Captioning cho các hình ảnh. Mục tiêu là xây dựng một hệ thống có thể tự động tạo mô tả văn bản cho các hình ảnh , đồng thời cung cấp cho người dùng một giao diện dễ sử dụng để tương tác với mô hình. 
---

## 2. Yêu cầu hệ thống
Trước khi bắt đầu, bạn cần cài đặt:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

---

## 3. Cài đặt và chạy dự án

### 3.1 Clone dự án
```sh
git clone https://github.com/marknguyen02/web-authentication.git
cd web-authentication
```

### 3.2 Cấu hình biến môi trường
Tạo file `.env` ở thư mục gốc và thêm nội dung sau:
```env
# PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456
POSTGRES_DB=test_database
POSTGRES_HOST=db
POSTGRES_PORT=5432

# JWT Token
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# Any key you want
JWT_SECRET_KEY="your-secret-key"
ALGORITHM=HS256

# Base64-encoded 32 bytes
FERNET_SECRET_KEY="bTbJ2cBmXwfYSlI4bU28OmZLPGhinYADav2amYpA3ss="
```

### 3.3 Chạy Docker Compose
```sh
docker-compose up --build
```
Lệnh này sẽ:
- Tạo và chạy container cho PostgreSQL, FastAPI và React
- Cài đặt tất cả dependencies cần thiết
- Mở cổng:
  - Backend: `http://localhost:8000`
  - Frontend: `http://localhost:5173`

---

## 4. Cấu trúc thư mục
```
📂 web-authentication/
│── 📂 backend/            # FastAPI Backend
│── 📂 frontend/           # React Frontend
│── 📄 docker-compose.yml  # Docker Compose file
│── 📄 .env                # Environment Variables
│── 📄 README.md           # Hướng dẫn
```

---

## 5. Sử dụng
### 5.1 Kiểm tra logs container
```sh
docker-compose logs -f
```

### 5.2 Dừng tất cả container
```sh
docker-compose down
```

### 5.3 Nếu có lỗi cổng bị chiếm dụng, chạy lệnh:
```sh
docker ps  # Kiểm tra container đang chạy
docker stop <container_id>  # Dừng container chiếm dụng
```

---

## 6. Mở rộng
- **Frontend**: Vào thư mục `frontend` và chạy `npm run dev`
- **Backend**: Vào thư mục `backend` và chạy `uvicorn main:app --reload`

Chúc bạn cài đặt thành công! 🚀

