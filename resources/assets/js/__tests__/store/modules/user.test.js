import user from '@/store/modules/user'
import client from '@/store/client'
import ls from 'local-storage'

jest.mock('@/store/client')
jest.mock('local-storage')

const state = { ...user.state }
const getters = user.getters
const { SET_USER } = user.mutations
const { fetchUser } = user.actions
const ctx = { commit: jest.fn() }

describe('User Module', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
  })

  describe('User state', () => {
    it('returns the user-related state', () => {
      expect(state).toEqual({ user: {} })
    })
  })

  describe('User getters', () => {
    it('returns the user', () => {
      expect(getters.user(state)).toEqual(state.user)

      ls.mockReturnValueOnce('abcde12345')
      expect(getters.isAuthenticated(state)).toBe(true)
      ls.mockReturnValueOnce('')
      expect(getters.isAuthenticated(state)).toBe(false)
    })
  })

  describe('User mutations', () => {
    it('sets the user object', () => {
      const newUser = {
        username: 'syropian'
      }

      SET_USER(state, newUser)

      expect(state.user).toEqual(newUser)
    })
  })

  describe('User actions', () => {
    it('fetches the authenticated user', async () => {
      const res = { username: 'syropian' }
      client.get.mockResolvedValue(res)

      await fetchUser(ctx)

      expect(client.withAuth).toHaveBeenCalled()
      expect(client.get).toHaveBeenCalledWith('/api/auth/me')
      expect(ctx.commit).toHaveBeenCalledWith('SET_USER', res)
    })
  })
})
