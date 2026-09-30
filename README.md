# Chanh Xinhhh – Website bán váy

Website bán hàng tĩnh (HTML/CSS/JavaScript thuần) với 3 giao diện theo mùa: **20/10**, **Noel**, **Tết Nguyên Đán**.

## Cấu trúc
- `index.html` – cấu trúc trang
- `style.css` – giao diện và 3 bộ màu theme
- `script.js` – logic: đổi theme, giỏ hàng, lọc sản phẩm, hiệu ứng rơi
- `images/` – ảnh sản phẩm

## Chỉnh sửa nhanh (đầu file `script.js`)
- `CONFIG.zalo`: số Zalo nhận đơn
- `CONFIG.schedule`: lịch tự đổi giao diện theo ngày
- `PRODUCTS`: tên, giá, ảnh, size của sản phẩm
- `THEMES`: nội dung, mã giảm giá, ngày đếm ngược từng mùa

## Chạy thử
Mở `index.html` bằng trình duyệt, hoặc chạy `python3 -m http.server` rồi vào http://localhost:8000

## Đăng lên GitHub Pages
1. Tạo repo mới trên GitHub, đẩy toàn bộ thư mục này lên.
2. Vào **Settings → Pages**, chọn Branch `main`, thư mục `/ (root)`, bấm Save.
3. Sau vài phút web chạy tại `https://<tên-tài-khoản>.github.io/<tên-repo>/`
