## Mô tả Hệ thống

### Kiến trúc hệ thống

<p align="center">
  <img src="./images/Image Captioning Architecture.png" alt="Image Captioning Architecture">
  <br>
  <em>Hình 1: Kiến trúc tổng quan của hệ thống Visual Captioning</em>
</p>

Hệ thống Visual Captioning được thiết kế với kiến trúc đơn giản và dễ dàng triển khai:

* **Môi trường huấn luyện**: Kaggle Notebooks.
* **Cơ sở dữ liệu metadata**: MongoDB Cloud.
* **Hệ thống lưu trữ NoSQL**: AWS S3.
* **Máy chủ triển khai**: AWS EC2.

### Lược đồ dữ liệu

<img src="./images/Image Captioning Architecture.png" alt="Data Schema">

Lược đồ dữ liệu mô tả cách tổ chức và liên kết giữa các thành phần: hình ảnh, caption, nguyên liệu và hướng dẫn nấu ăn. Việc tổ chức dữ liệu theo cấu trúc linh hoạt giúp tăng hiệu quả truy xuất và phục vụ các tác vụ phân tích sau này.
