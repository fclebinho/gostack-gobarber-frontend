import { renderHook, act } from '@testing-library/react-hooks';
import MockAxios from 'axios-mock-adapter';

import { useAuth, AuthProvider } from '../../hooks/auth/auth';
import api from '../../services/api';

const apiMock = new MockAxios(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const apiResponse = {
      user: {
        id: 'b803fce7-6ecf-447b-9981-d76d78fb2580',
        name: 'John Doe',
        email: 'johndoe@example.com',
        created_at: '2020-05-30T17:37:30.438Z',
        updated_at: '2020-07-10T00:48:01.424Z',
        avatar_url:
          'http://localhost:3333/files/59827b62b44e427071a7-220d7a13f04530bc3230cb67ef54eb21.jpg',
      },
      token: 'user-token',
    };

    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:token', 'user-token');
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiResponse.user),
    );
    expect(result.current.user.email).toEqual('johndoe@example.com');
  });

  it('should restore saved data from storage when auth inits', () => {
    const setGetSpy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key) => {
        switch (key) {
          case '@GoBarber:token':
            return 'user-token';
          case '@GoBarber:user':
            return JSON.stringify({
              id: 'b803fce7-6ecf-447b-9981-d76d78fb2580',
              name: 'John Doe',
              email: 'johndoe@example.com',
              created_at: '2020-05-30T17:37:30.438Z',
              updated_at: '2020-07-10T00:48:01.424Z',
              avatar_url:
                'http://localhost:3333/files/59827b62b44e427071a7-220d7a13f04530bc3230cb67ef54eb21.jpg',
            });
          default:
            return null;
        }
      });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual('johndoe@example.com');
  });

  it('should be able to sign out', async () => {
    const setGetSpy = jest
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key) => {
        switch (key) {
          case '@GoBarber:token':
            return 'user-token';
          case '@GoBarber:user':
            return JSON.stringify({
              id: 'b803fce7-6ecf-447b-9981-d76d78fb2580',
              name: 'John Doe',
              email: 'johndoe@example.com',
              created_at: '2020-05-30T17:37:30.438Z',
              updated_at: '2020-07-10T00:48:01.424Z',
              avatar_url:
                'http://localhost:3333/files/59827b62b44e427071a7-220d7a13f04530bc3230cb67ef54eb21.jpg',
            });
          default:
            return null;
        }
      });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => result.current.signOut());

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    const user = {
      id: 'b803fce7-6ecf-447b-9981-d76d78fb2580',
      name: 'John Doe',
      email: 'johndoe@example.com',
      avatar_url:
        'http://localhost:3333/files/59827b62b44e427071a7-220d7a13f04530bc3230cb67ef54eb21.jpg',
    };

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );
    expect(result.current.user).toEqual(user);
  });
});
