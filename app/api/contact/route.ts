import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '../../../lib/mongodb';
import Contact from '../../../lib/models/Contact';

const fallbackContacts: Array<{ name: string; email: string; message: string; createdAt: string }> = [];

const sendNotificationEmail = async (payload: { name: string; email: string; message: string; createdAt: string }) => {
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
    EMAIL_TO,
    EMAIL_FROM,
  } = process.env;

  if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS || !EMAIL_TO) {
    console.warn('Email config is missing; skipping notification email.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Number(EMAIL_PORT) === 465, // true for 465, false for other ports
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: EMAIL_FROM || EMAIL_USER,
    to: EMAIL_TO,
    subject: `New message from ${payload.name} via portfolio contact form`,
    html: `
      <p><strong>Name:</strong> ${payload.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${payload.email}">${payload.email}</a></p>
      <p><strong>Submitted:</strong> ${payload.createdAt}</p>
      <hr />
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap">${payload.message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, message } = body;

  // Validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Please provide all required fields' },
      { status: 400 }
    );
  }

  if (name.trim().length < 2) {
    return NextResponse.json(
      { error: 'Name must be at least 2 characters' },
      { status: 400 }
    );
  }

  if (message.trim().length < 10) {
    return NextResponse.json(
      { error: 'Message must be at least 10 characters' },
      { status: 400 }
    );
  }

  // Email validation regex
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email.toLowerCase())) {
    return NextResponse.json(
      { error: 'Please provide a valid email' },
      { status: 400 }
    );
  }

  const contactPayload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  if (!process.env.MONGODB_URI) {
    // Fallback storage when MongoDB isn't configured
    fallbackContacts.unshift(contactPayload);

    await sendNotificationEmail(contactPayload);

    return NextResponse.json(
      {
        message: 'Message received (stored locally).',
        warning: 'MongoDB is not configured; messages are stored in-memory.',
        data: contactPayload,
      },
      { status: 200 }
    );
  }

  try {
    await connectDB();

    // Create contact
    const contact = await Contact.create(contactPayload);

    // Send notification email (if configured)
    await sendNotificationEmail(contactPayload);

    return NextResponse.json(
      {
        message: 'Message sent successfully!',
        data: contact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    // Store in fallback buffer so submissions aren't lost
    fallbackContacts.unshift(contactPayload);

    // Send notification email even if Mongo fails
    await sendNotificationEmail(contactPayload);

    return NextResponse.json(
      {
        message: 'Message received (stored locally).',
        warning: 'Could not connect to MongoDB; saved locally for now.',
        data: contactPayload,
      },
      { status: 200 }
    );
  }
}


export async function GET() {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is not configured. Returning empty list.');
    return NextResponse.json(
      { data: [], warning: 'MONGODB_URI is not configured' },
      { status: 200 }
    );
  }

  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        data: contacts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch contacts error:', error);
    return NextResponse.json(
      {
        data: fallbackContacts,
        warning: 'Could not fetch contacts from MongoDB. Using local cache.',
      },
      { status: 200 }
    );
  }
}
