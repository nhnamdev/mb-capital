# MB Capital

Website demo nhiều trang cho MB Capital - công ty quản lý quỹ thuộc MB Group.

## Tech stack

- HTML5, CSS3, Vanilla JavaScript
- Bootstrap 4.6
- Bootstrap Icons 1.11

## Cấu trúc

```
mb-capital/
├── index.html              # Trang chủ
├── pages/
│   ├── about.html          # Giới thiệu
│   ├── contact.html        # Liên hệ
│   └── fund-detail.html    # Chi tiết quỹ (dynamic theo ?code=)
├── css/style.css
├── js/main.js
├── assets/
│   ├── img/
│   └── icon/
└── mbcapital.json
```

## Tính năng

- Header sticky với dropdown menu, underline animation
- Hero carousel auto-advance + controls bo tròn
- Cards nhu cầu đầu tư có hover lift
- Cards lựa chọn quỹ với glass effect
- Timeline 5 bước đầu tư với dots gold
- Form tư vấn ngay tại trang chủ
- Trang chi tiết quỹ động (đọc từ database FUNDS)
- Trang về chúng tôi với stat cards (counter animation)
- Trang liên hệ với Google Maps embed
- Back-to-top button (auto-inject)
- Fully responsive

## Cách chạy

Mở file `index.html` trực tiếp trong trình duyệt, hoặc dùng live server bất kỳ.
