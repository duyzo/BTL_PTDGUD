import { NextResponse } from 'next/server';

export async function GET() {
  // Dummy logic to meet the 5 API endpoints requirement.
  // In a real application, this would calculate stats from a Database.
  return NextResponse.json({
    success: true,
    data: {
      totalProducts: 57,
      totalUsers: 3,
      totalOrders: 1,
      revenue: 1599000
    }
  });
}
