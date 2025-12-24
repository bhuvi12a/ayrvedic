const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ayrvedic';

async function verify() {
  try {
    console.log('Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri);
    
    const db = mongoose.connection;
    
    // Check current count
    const count = await db.collection('batches').countDocuments({});
    console.log(`Current batches in database: ${count}`);
    
    if (count > 0) {
      // Get all batches to see what's there
      const batches = await db.collection('batches').find({}).toArray();
      console.log('Batches found:');
      batches.forEach((b, i) => {
        console.log(`  ${i + 1}. ${b.batchName || 'Unnamed'} (ID: ${b._id})`);
      });
      
      // Delete all
      const result = await db.collection('batches').deleteMany({});
      console.log(`\n✓ Deleted ${result.deletedCount} batches`);
    }
    
    // Verify deletion
    const finalCount = await db.collection('batches').countDocuments({});
    console.log(`✓ Final count: ${finalCount}`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

verify();
