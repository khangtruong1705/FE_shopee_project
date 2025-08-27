import { Input, Select } from 'antd';

 const { Option } = Select;


export const categories = ["Thời Trang Nam", "Thiết Bị Điện Tử", "Máy Tính Và Laptop",
    "Máy Ảnh", "Đồng Hồ", "Giày Dép Nam", "Thiết Bị Điện Gia Dụng", "Thể Thao Và Du Lịch",
    "Ôtô, Xe Máy, Xe Đạp", "Thời Trang Nữ", "Mẹ Và Bé", "Nhà Cửa Và Đời Sống", "Sắc Đẹp",
    "Sức Khỏe", "Túi, Ví Nữ", "Giày Dép Nữ", "Phụ kiện, Trang Sức Nữ", "Bách Khoa Online",
    "Nhà Sách Online", "Điện Thoại"];

export  const formFields = [
        {
            name: 'product_name',
            label: 'Product Name',
            rules: [{ required: true, message: 'Please enter product name' }],
            component: <Input placeholder="Please enter product name" />,
            span: 12,
        },
        {
            name: 'price',
            label: 'Price',
            rules: [{ required: true, message: 'Please enter price' }],
            component: <Input type="number" addonAfter="VNĐ" placeholder="Please enter price" />,
            span: 12,
        },
        {
            name: 'description',
            label: 'Description',
            rules: [{ required: true, message: 'Please enter description' }],
            component: <Input placeholder="Please enter description" />,
            span: 12,
        },
        {
            name: 'type',
            label: 'Type (category)',
            rules: [{ required: true, message: 'Please choose the type' }],
            component: (
                <Select placeholder="Please choose the type">
                    {categories.map((category, index) => (
                        <Option key={index + 1} value={index + 1}>
                            {category}
                        </Option>
                    ))}
                </Select>
            ),
            span: 12,
        },
        {
            name: 'description_detail',
            label: 'Description Detail',
            rules: [{ required: true, message: 'Please enter description detail' }],
            component: <Input.TextArea rows={4} placeholder="Please enter description detail" />,
            span: 24,
        },
    ];