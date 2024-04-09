import { supabase } from '../supabase';

const USER_EMAIL = 'gedesurya125@gmail.com';
const USER_PASSWORD = 'Karisma125!';

describe('this test the supabase integration', () => {
  beforeAll(() => {
    supabase.auth.startAutoRefresh();
  });

  afterAll(() => {
    supabase.auth.stopAutoRefresh();
  });

  it('should sign in the user successfully', async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: USER_EMAIL,
      password: USER_PASSWORD
    });

    expect(error).toBeFalsy();
  });

  it('should keep the current user logged in', async () => {
    await supabase.auth.getSession().then(({ data: { session } }) => {
      expect(session?.user).toBeDefined();
    });
  });
  it(`should have email same with the loggin user ${USER_EMAIL}`, async () => {
    await supabase.auth.getSession().then(({ data: { session } }) => {
      expect(session?.user?.email).toBe(USER_EMAIL);
    });
  });

  it(`should sign out the user with email ${USER_EMAIL}`, async () => {
    supabase.auth.signOut();
    await supabase.auth.getSession().then(({ data: { session } }) => {
      expect(session?.user?.email).toBeUndefined();
    });
  });
});
