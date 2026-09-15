import assert from 'node:assert/strict'
import test from 'node:test'

import { getNextTheme, resolveTheme } from '../src/lib/theme.ts'

test('resolveTheme uses a persisted light or dark preference', () => {
  assert.equal(resolveTheme('light', false), 'light')
  assert.equal(resolveTheme('dark', true), 'dark')
})

test('resolveTheme follows the system preference when no valid preference is stored', () => {
  assert.equal(resolveTheme(null, true), 'light')
  assert.equal(resolveTheme(null, false), 'dark')
  assert.equal(resolveTheme('unknown', true), 'light')
  assert.equal(resolveTheme('unknown', false), 'dark')
})

test('getNextTheme alternates between light and dark', () => {
  assert.equal(getNextTheme('dark'), 'light')
  assert.equal(getNextTheme('light'), 'dark')
})
