import { describe, it, expect } from 'vitest'
import { parseTimestamp } from '../utils/utils.js'

describe('parseTimestamp()', () => {
  it('parses hh:mm:ss', () => {
    expect(parseTimestamp("1:02:03")).toBe(3723)
  })

  it('parses mm:ss', () => {
    expect(parseTimestamp("10:15")).toBe(615)
  })

  it('returns null for malformed input', () => {
    expect(parseTimestamp("abc")).toBe(null)
    expect(parseTimestamp("1:2:3:4")).toBe(null)
    expect(parseTimestamp("")).toBe(null)
  })

  it('parses edge cases', () => {
    expect(parseTimestamp("0:00")).toBe(0)
    expect(parseTimestamp("59:59")).toBe(3599)
  })
})
