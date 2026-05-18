import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Dummy logic for API endpoint requirement. 
    // In a real DB, you'd check email/password here.
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Simulated auth success
    const mockUser = {
      id: 'mock-id',
      email: email,
      name: 'Mock User',
      role: email === 'admin@toykingdom.com' ? 'admin' : 'user'
    };

    const response = NextResponse.json({ success: true, data: mockUser });
    
    // Set HTTP-only cookie
    response.cookies.set('toy_session', mockUser.role, {
      httpOnly: false, // In a real app this should be true for security, but keeping false to match local behavior if needed
      path: '/',
      maxAge: 86400,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
