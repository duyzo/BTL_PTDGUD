import { getUsers } from '@/utils/userStore';

describe('userStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return users array', () => {
    const users = getUsers();
    expect(Array.isArray(users)).toBe(true);
  });
});
