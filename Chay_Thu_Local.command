#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"

PORT=8088

echo "========================================================"
echo "   🚀 VIBEAPP HUB - CỔNG ỨNG DỤNG VIBE-CODING CỦA BẠN"
echo "========================================================"
echo ""
echo " Đang khởi chạy máy chủ kiểm thử tại: http://localhost:$PORT"
echo " Nhấn Ctrl + C để dừng máy chủ."
echo "--------------------------------------------------------"

# Tự động mở trình duyệt web sau 1 giây
(sleep 1 && open "http://localhost:$PORT") &

# Chạy server với python3
python3 -m http.server $PORT
