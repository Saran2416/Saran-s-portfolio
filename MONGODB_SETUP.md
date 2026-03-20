# MongoDB Integration Setup Guide

## Overview
This portfolio website now includes a full-stack contact form with MongoDB database integration. All contact submissions are securely stored in the database and can be viewed through the admin dashboard.

## Setup Instructions

### 1. MongoDB Setup

1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier is available)
3. Go to Database → Collections → Create a database named `portfolio`
4. Create a user and get the connection string
5. Update your `.env.local` file with your connection string:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 2. Install Dependencies

The `mongoose` package has been added to your `package.json`. Run:

```bash
npm install
```

### 3. Project Structure

```
├── lib/
│   ├── mongodb.ts           # MongoDB connection handler
│   └── models/
│       └── Contact.ts       # Contact schema/model
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts     # API endpoint for form submissions
│   └── admin/
│       └── messages/
│           └── page.tsx     # Admin dashboard
└── components/
    └── Contact.tsx          # Updated contact form
```

## Features

### Contact Form (`/api/contact` - POST)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello! I want to work with you..."
}
```

**Validation:**
- Name: 2+ characters
- Email: Valid email format
- Message: 10+ characters

**Response (Success - 201):**
```json
{
  "message": "Message sent successfully!",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!...",
    "createdAt": "2024-03-19T...",
    "updatedAt": "2024-03-19T..."
  }
}
```

**Response (Error - 400/500):**
```json
{
  "error": "Please provide all required fields"
}
```

### Get All Messages (`/api/contact` - GET)

Returns all contact form submissions sorted by newest first.

**Response (200):**
```json
{
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Message content...",
      "createdAt": "2024-03-19T...",
      "updatedAt": "2024-03-19T..."
    }
  ]
}
```

### Admin Dashboard (`/admin/messages`)

Beautiful admin interface to view all contact submissions:
- **Total Messages Count** - Real-time message statistics
- **Unique Contacts** - Number of different senders
- **Message Cards** - Individual message display with:
  - Sender name
  - Email address (clickable mailto link)
  - Message content
  - Timestamp of submission
  - Hover animations

## Frontend Features

### Contact Form Component

**File:** `components/Contact.tsx`

**Features:**
- Real-time form validation
- Error messages with visual feedback
- Success confirmation messages
- Loading state on submit
- Uses Framer Motion for smooth animations
- Responsive design (mobile & desktop)

**States:**
- **Idle:** Ready for input
- **Submitting:** Shows "Sending..." button state
- **Success:** Green success alert with checkmark
- **Error:** Red error alert with message

### Admin Page Component

**File:** `app/admin/messages/page.tsx`

**Features:**
- Real-time message fetching from API
- Beautiful card-based layout
- Statistics display (total messages, unique contacts)
- Loading state while fetching
- Empty state message
- Formatted timestamps
- Clickable email links
- Smooth animations
- Easy navigation back to portfolio

## How It Works

1. **User Submits Form** → Contact component sends POST to `/api/contact`
2. **API Validates Data** → Checks for required fields and format
3. **Database Storage** → Mongoose saves validated data to MongoDB
4. **Confirmation Response** → Returns success/error to user
5. **Admin Access** → View all submissions at `/admin/messages`

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# REQUIRED: MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Error Handling

The API includes comprehensive error handling:
- **400 Bad Request:** Missing fields, invalid format, validation failures
- **500 Internal Server Error:** Database connection issues, server errors

All errors are logged to the console for debugging.

## Database Schema

### Contact Model

```typescript
{
  name: String (required, 2+ chars)
  email: String (required, valid email format)
  message: String (required, 10+ chars)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## Security Features

✅ Email validation (regex pattern)  
✅ Input trimming and sanitization  
✅ Required field validation  
✅ Message length validation  
✅ Database model validation  
✅ Error messages don't expose sensitive info  
✅ MongoDB prevents model re-creation (prevents memory leaks)

## Testing

### Test the Contact Form
1. Go to `http://localhost:3000#contact`
2. Fill the form with valid data
3. Click "Send Message"
4. Verify success message appears
5. Check admin dashboard at `/admin/messages`

### Test Validation
- Try submitting with empty fields
- Use invalid email format
- Enter short messages (<10 chars)
- Observe error messages

## Troubleshooting

**"Cannot find MONGODB_URI" error:**
- Ensure `.env.local` file exists in root directory
- Check MongoDB connection string format
- Verify URI includes username, password, and cluster

**"Cannot connect to database" error:**
- Check MongoDB Atlas cluster is running
- Verify IP whitelist includes your current IP
- Test connection string on MongoDB Atlas

**Admin page shows no messages:**
- Verify API endpoint is working: `GET /api/contact`
- Check MongoDB database has data
- View browser console for errors

## Next Steps

- Deploy to Vercel (MongoDB Atlas works with free Vercel tier)
- Add email notifications when form is submitted
- Create automated email responses to users
- Add message search/filtering to admin panel
- Add authentication to admin section
- Export messages as CSV

## Support

For issues with MongoDB Atlas, visit: https://docs.mongodb.com
For Next.js API route issues: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
For Mongoose documentation: https://mongoosejs.com/docs/
