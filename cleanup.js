const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayrvedic';

async function cleanup() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    
    const db = mongoose.connection;
    const result = await db.collection('batches').deleteMany({});
    
    console.log(`✓ Deleted ${result.deletedCount} demo batches`);
    
    const remaining = await db.collection('batches').countDocuments({});
    console.log(`✓ Remaining batches: ${remaining}`);
    
    await mongoose.disconnect();
    console.log('✓ Done! Stats will now show 0');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

cleanup();
