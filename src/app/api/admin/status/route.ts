import { NextRequest, NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const dbConnected = await checkDatabaseConnection();
    const serverStatus = 'online'; // Server is running if this endpoint responds

    return NextResponse.json(
      {
        success: true,
        data: {
          server: serverStatus,
          database: dbConnected ? 'connected' : 'disconnected',
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: {
          server: 'online',
          database: 'disconnected',
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    );
  }
}
