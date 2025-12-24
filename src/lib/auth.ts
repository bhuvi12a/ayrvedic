import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function verifyAdmin(token: string | null): boolean {
  try {
    if (!token) {
      return false;
    }
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}

export function verifyAdminFromRequest(request: Request): boolean {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1] ||
                  (request as any).cookies?.get('admin-token')?.value;
    return verifyAdmin(token);
  } catch (error) {
    return false;
  }
}
