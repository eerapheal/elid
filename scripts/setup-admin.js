#!/usr/bin/env node

/**
 * Admin User Setup Script
 * 
 * This script helps you create an admin user for the Events & More dashboard.
 * Run with: node scripts/setup-admin.js
 */

const readline = require('readline');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function main() {
  console.log('\n🔐 Events & More - Admin User Setup\n');

  // Get MongoDB URI
  const mongoUri = await question('MongoDB URI (from .env.local): ');
  if (!mongoUri) {
    console.error('❌ MongoDB URI is required');
    process.exit(1);
  }

  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB\n');

    // Get admin credentials
    const email = await question('Admin Email: ');
    const name = await question('Admin Name: ');
    const password = await question('Admin Password: ');
    const confirmPassword = await question('Confirm Password: ');

    if (!email || !name || !password) {
      console.error('❌ All fields are required');
      process.exit(1);
    }

    if (password !== confirmPassword) {
      console.error('❌ Passwords do not match');
      process.exit(1);
    }

    // Define Admin schema
    const adminSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    });

    const Admin = mongoose.model('Admin', adminSchema);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.error('❌ Admin with this email already exists');
      process.exit(1);
    }

    // Hash password
    console.log('\nHashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    console.log('Creating admin user...');
    const admin = new Admin({
      email,
      name,
      password: hashedPassword,
    });

    await admin.save();
    console.log('✅ Admin user created successfully!\n');

    console.log('Login credentials:');
    console.log(`  Email: ${email}`);
    console.log(`  URL: http://localhost:3000/admin/login\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
