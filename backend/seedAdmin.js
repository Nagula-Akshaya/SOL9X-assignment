require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, User } = require('./models');
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced successfully!');
    const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const [admin, created] = await User.findOrCreate({
      where: { email: process.env.ADMIN_EMAIL },
      defaults: { name: 'Admin', email: process.env.ADMIN_EMAIL, password: hashed, role: 'admin' }
    });
    if (created) console.log('🎉 Admin account created:', process.env.ADMIN_EMAIL);
    else console.log('ℹ️ Admin account already exists:', process.env.ADMIN_EMAIL);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin:', err);
    process.exit(1);
  }
})();
