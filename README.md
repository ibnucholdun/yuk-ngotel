# Yuk Ngotel 🏨

Yuk Ngotel is a modern, full-featured hotel reservation application built with Next.js 16, TypeScript, and Tailwind CSS. It provides a seamless experience for users to browse rooms, make reservations, and manage their bookings, while offering robust tools for administrators.

## 🚀 Features

### User Features

- **Room Browsing**: Explore available rooms with detailed descriptions, amenities, and images.
- **Secure Booking**: Real-time availability checks and secure reservation process.
- **Payment Integration**: Integrated with **Midtrans** for secure and reliable payment processing.
- **User Dashboard**:
  - **My Reservations**: View booking history and status.
  - **Profile Management**: Update personal information and profile picture.
- **Authentication**: Secure sign-up and sign-in using NextAuth.js.
- **Contact & Support**: Integrated contact form and newsletter subscription.

### Admin Features

- **Dashboard**: Overview of hotel performance.
- **Room Management**: Add, edit, and remove rooms and amenities.
- **Reservation Management**: View and manage customer reservations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via Vercel Postgres)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://authjs.dev/) (v5 Beta)
- **Payment Gateway**: [Midtrans](https://midtrans.com/)
- **Forms**: React Hook Form + Zod Validation
- **UI Components**: React Icons, Swiper, React Datepicker, React Hot Toast
- **Email**: Nodemailer
- **Storage**: Vercel Blob

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- PostgreSQL database

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/yuk-ngotel.git
    cd yuk-ngotel
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add the following variables:

        ```env
        # Database (Prisma / Vercel Postgres)
        DATABASE_URL="postgresql://..."
        POSTGRES_PRISMA_URL="postgresql://..."
        POSTGRES_URL_NON_POOLING="postgresql://..."

        # NextAuth
        AUTH_SECRET="your-secret-key" # Generate with `npx auth secret`
        NEXT_PUBLIC_BASE_URL="http://localhost:3000"

        # Midtrans Payment Gateway
        MIDTRANS_SERVER_KEY="your-server-key"
        NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="your-client-key"

        # Vercel Blob (Image Storage)
        BLOB_READ_WRITE_TOKEN="your-blob-token"

        # Email Service (Nodemailer)
        SMTP_USER=example@gmail.com
        SMTP_PASS=your-smtp-password
        NEXT_PUBLIC_APP_URL=your-app-url

4.  **Initialize the Database:**

    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
yuk-ngotel/
├── prisma/              # Prisma schema and migrations
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── (public)/    # Public routes (Home, About, etc.)
│   │   ├── admin/       # Admin dashboard routes
│   │   ├── api/         # API routes (Payment notifications, etc.)
│   │   └── my-dashboard/# User dashboard routes
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utility functions and configurations
│   └── ...
├── .env                 # Environment variables
├── next.config.mjs      # Next.js configuration
└── package.json         # Project dependencies
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
