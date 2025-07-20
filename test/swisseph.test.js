import { describe, it, expect, beforeAll } from 'vitest'
import swisseph from '../lib/swisseph.js'

describe('Swiss Ephemeris', () => {
  beforeAll(() => {
    // Set ephemeris path
    swisseph.swe_set_ephe_path(require('path').join(__dirname, '../ephe'))
  })

  it('should get Swiss Ephemeris version', () => {
    const version = swisseph.swe_version()
    expect(version).toBeDefined()
    expect(typeof version).toBe('string')
    expect(version).toMatch(/^\d+\.\d+\.\d+$/)
  })

  it('should calculate Julian day correctly', () => {
    const date = { year: 2012, month: 1, day: 1, hour: 0 }
    
    return new Promise((resolve) => {
      swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, (julday_ut) => {
        expect(julday_ut).toBe(2455927.5)
        resolve()
      })
    })
  })

  it('should convert date correctly', () => {
    const date = { year: 2012, month: 1, day: 1, hour: 0 }
    
    return new Promise((resolve) => {
      swisseph.swe_date_conversion(date.year, date.month, date.day, date.hour, 'g', (result) => {
        expect(result.error).toBeFalsy()
        expect(result.julianDay).toBe(2455927.5)
        resolve()
      })
    })
  })

  it('should get Sun position', () => {
    const julday_ut = 2455927.5
    const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH
    
    return new Promise((resolve) => {
      swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, (body) => {
        expect(body.error).toBeFalsy()
        expect(body.longitude).toBeDefined()
        expect(body.latitude).toBeDefined()
        expect(body.distance).toBeDefined()
        expect(body.rflag).toBeDefined()
        resolve()
      })
    })
  })

  it('should get Moon position', () => {
    const julday_ut = 2455927.5
    const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH
    
    return new Promise((resolve) => {
      swisseph.swe_calc_ut(julday_ut, swisseph.SE_MOON, flag, (body) => {
        expect(body.error).toBeFalsy()
        expect(body.longitude).toBeDefined()
        expect(body.latitude).toBeDefined()
        expect(body.distance).toBeDefined()
        expect(body.rflag).toBeDefined()
        resolve()
      })
    })
  })

  it('should calculate houses', () => {
    const julday_ut = 2455927.5
    
    return new Promise((resolve) => {
      swisseph.swe_houses(julday_ut, 0, 0, 'K', (result) => {
        expect(result.error).toBeFalsy()
        expect(result.house).toBeDefined()
        expect(Array.isArray(result.house)).toBe(true)
        expect(result.house.length).toBe(12)
        expect(result.ascendant).toBeDefined()
        expect(result.mc).toBeDefined()
        resolve()
      })
    })
  })

  it('should get planet name', () => {
    return new Promise((resolve) => {
      swisseph.swe_get_planet_name(swisseph.SE_SUN, (body) => {
        expect(body.error).toBeFalsy()
        expect(body.name).toBe('Sun')
        resolve()
      })
    })
  })

  it('should get fixed star position', () => {
    const julday_ut = 2455927.5
    const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH
    
    return new Promise((resolve) => {
      swisseph.swe_fixstar_ut('Aldebaran', julday_ut, flag, (body) => {
        expect(body.error).toBeFalsy()
        expect(body.name).toBeDefined()
        expect(body.longitude).toBeDefined()
        expect(body.latitude).toBeDefined()
        expect(body.distance).toBeDefined()
        resolve()
      })
    })
  })
}) 