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
    supabase.auth.getSession().then(({ data: { session } }) => {
      // TODO: continue here
      // setSession(session);
    });
  });
});
