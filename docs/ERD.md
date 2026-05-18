# Entity Relationship Diagram (ERD)

Sơ đồ cơ sở dữ liệu dự kiến cho hệ thống ToyKingdom. Mặc dù hiện tại dự án sử dụng Mock Data và `localStorage`, cấu trúc bên dưới được thiết kế chuẩn để dễ dàng chuyển đổi sang PostgreSQL / MongoDB khi kết nối backend thật.

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER {
        string id PK
        string name
        string email
        string password
        string phone
        string address
        string role "user | admin"
    }
    
    PRODUCT ||--o{ ORDER_ITEM : "belongs to"
    PRODUCT {
        string id PK
        string name
        string slug
        string category
        float price
        float oldPrice
        string ageRange
        string brand
        string image
        string description
        int rating
        int sold
        int stock
    }
    
    ORDER ||--|{ ORDER_ITEM : contains
    ORDER {
        string id PK
        string userId FK
        string customerName
        string customerPhone
        string customerAddress
        float totalAmount
        string status "pending | processing | shipped | delivered"
        string paymentMethod "cod | banking"
        datetime createdAt
    }
    
    ORDER_ITEM {
        string id PK
        string orderId FK
        string productId FK
        int quantity
        float price
    }
    
    CATEGORY ||--o{ PRODUCT : contains
    CATEGORY {
        string id PK
        string name
        string slug
        string icon
    }
```
