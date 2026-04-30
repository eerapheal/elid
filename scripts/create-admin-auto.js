const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🚀 LID EVENT - Automatic Admin Creation');

  // Load .env.local
  let mongoUri = '';
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/^MONGODB_URI\s*=\s*["']?([^"'\s]+)["']?/m);
      if (match) mongoUri = match[1];
    }
  } catch (err) {
    console.error('Failed to read .env.local');
  }

  if (!mongoUri) {
    console.error('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected');

    const adminSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    });

    // Use existing model if available, otherwise define it
    const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

    const admins = [
      { email: 'admin@lident.com', password: 'adminpassword123', name: 'LID Admin' },
      { email: 'admin@admin.com', password: 'password123', name: 'Test Admin' }
    ];

    for (const adminData of admins) {
      const existingAdmin = await Admin.findOne({ email: adminData.email });
      if (existingAdmin) {
        console.log('ℹ️ Admin already exists:', adminData.email);
        const hashedPassword = await bcrypt.hash(adminData.password, 10);
        existingAdmin.password = hashedPassword;
        await existingAdmin.save();
        console.log(`✅ Password updated for ${adminData.email}`);
      } else {
        console.log(`Creating admin: ${adminData.email}...`);
        const hashedPassword = await bcrypt.hash(adminData.password, 10);
        const admin = new Admin({ ...adminData, password: hashedPassword });
        await admin.save();
        console.log(`✅ Admin ${adminData.email} created!`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
