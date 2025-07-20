import { describe, it, expect, beforeAll } from 'vitest'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Import swisseph using require to maintain compatibility
const swisseph = require('../lib/swisseph.js')

describe('Swiss Ephemeris', () => {
  beforeAll(() => {
    // Set ephemeris path
    swisseph.swe_set_ephe_path(path.join(__dirname, '../ephe'))
  })

  describe('Version and Basic Info', () => {
    it('should get Swiss Ephemeris version', () => {
      const version = swisseph.swe_version()
      expect(version).toBeDefined()
      expect(typeof version).toBe('string')
      expect(version).toMatch(/^\d+\.\d+\.\d+$/)
      console.log('Swiss Ephemeris version:', version)
    })
  })

  describe('Date Conversions', () => {
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

    it('should reverse Julian day to date', () => {
      const julday = 2455927.5
      
      return new Promise((resolve) => {
        swisseph.swe_revjul(julday, swisseph.SE_GREG_CAL, (result) => {
          expect(result.year).toBe(2012)
          expect(result.month).toBe(1)
          expect(result.day).toBe(1)
          expect(result.hour).toBe(0)
          resolve()
        })
      })
    })

    it('should handle UTC to JD conversion', () => {
      const date = { year: 2012, month: 1, day: 1, hour: 0 }
      
      return new Promise((resolve) => {
        swisseph.swe_utc_to_jd(date.year, date.month, date.day, date.hour, 0, 0, swisseph.SE_GREG_CAL, (result) => {
          expect(result.error).toBeFalsy()
          expect(result.julianDayET).toBeDefined()
          expect(result.julianDayUT).toBeDefined()
          resolve()
        })
      })
    })
  })

  describe('Planet Calculations', () => {
    const julday_ut = 2455927.5
    const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH

    it('should get Sun position', () => {
      return new Promise((resolve) => {
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, (body) => {
          expect(body.error).toBeFalsy()
          expect(body.longitude).toBeDefined()
          expect(body.latitude).toBeDefined()
          expect(body.distance).toBeDefined()
          expect(body.longitudeSpeed).toBeDefined()
          expect(body.latitudeSpeed).toBeDefined()
          expect(body.distanceSpeed).toBeDefined()
          expect(body.rflag).toBeDefined()
          
          // Check reasonable ranges
          expect(body.longitude).toBeGreaterThanOrEqual(0)
          expect(body.longitude).toBeLessThan(360)
          expect(body.distance).toBeGreaterThan(0.9)
          expect(body.distance).toBeLessThan(1.1)
          
          resolve()
        })
      })
    })

    it('should get Moon position', () => {
      return new Promise((resolve) => {
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_MOON, flag, (body) => {
          expect(body.error).toBeFalsy()
          expect(body.longitude).toBeDefined()
          expect(body.latitude).toBeDefined()
          expect(body.distance).toBeDefined()
          expect(body.rflag).toBeDefined()
          
          // Check reasonable ranges
          expect(body.longitude).toBeGreaterThanOrEqual(0)
          expect(body.longitude).toBeLessThan(360)
          expect(body.distance).toBeGreaterThan(0.002)
          expect(body.distance).toBeLessThan(0.003)
          
          resolve()
        })
      })
    })

    it('should get Mercury position', () => {
      return new Promise((resolve) => {
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_MERCURY, flag, (body) => {
          expect(body.error).toBeFalsy()
          expect(body.longitude).toBeDefined()
          expect(body.latitude).toBeDefined()
          expect(body.distance).toBeDefined()
          resolve()
        })
      })
    })

    it('should get Venus position', () => {
      return new Promise((resolve) => {
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_VENUS, flag, (body) => {
          expect(body.error).toBeFalsy()
          expect(body.longitude).toBeDefined()
          expect(body.latitude).toBeDefined()
          expect(body.distance).toBeDefined()
          resolve()
        })
      })
    })

    it('should get Mars position', () => {
      return new Promise((resolve) => {
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_MARS, flag, (body) => {
          expect(body.error).toBeFalsy()
          expect(body.longitude).toBeDefined()
          expect(body.latitude).toBeDefined()
          expect(body.distance).toBeDefined()
          resolve()
        })
      })
    })

    it('should get Jupiter position', () => {
      return new Promise((resolve) => {
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_JUPITER, flag, (body) => {
          expect(body.error).toBeFalsy()
          expect(body.longitude).toBeDefined()
          expect(body.latitude).toBeDefined()
          expect(body.distance).toBeDefined()
          resolve()
        })
      })
    })
  })

  describe('Node and Apsis Calculations', () => {
    const julday_ut = 2455927.5
    const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH

    it('should get Mean Node position', () => {
      return new Promise((resolve) => {
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_MEAN_NODE, flag, (body) => {
          expect(body.error).toBeFalsy()
          expect(body.longitude).toBeDefined()
          expect(body.latitude).toBeDefined()
          expect(body.distance).toBeDefined()
          resolve()
        })
      })
    })

    it('should get True Node position', () => {
      return new Promise((resolve) => {
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_TRUE_NODE, flag, (body) => {
          expect(body.error).toBeFalsy()
          expect(body.longitude).toBeDefined()
          expect(body.latitude).toBeDefined()
          expect(body.distance).toBeDefined()
          resolve()
        })
      })
    })

    it('should get Mean Apogee position', () => {
      return new Promise((resolve) => {
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_MEAN_APOG, flag, (body) => {
          expect(body.error).toBeFalsy()
          expect(body.longitude).toBeDefined()
          expect(body.latitude).toBeDefined()
          expect(body.distance).toBeDefined()
          resolve()
        })
      })
    })
  })

  describe('Asteroid Calculations', () => {
    const julday_ut = 2455927.5
    const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH

    it('should get Chiron position', () => {
      return new Promise((resolve) => {
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_CHIRON, flag, (body) => {
          expect(body.error).toBeFalsy()
          expect(body.longitude).toBeDefined()
          expect(body.latitude).toBeDefined()
          expect(body.distance).toBeDefined()
          resolve()
        })
      })
    })
  })

  describe('House Calculations', () => {
    const julday_ut = 2455927.5

    it('should calculate Placidus houses', () => {
      const latitude = 52.5
      const longitude = 13.4
      
      return new Promise((resolve) => {
        swisseph.swe_houses(julday_ut, latitude, longitude, 'P', (result) => {
          expect(result.error).toBeFalsy()
          expect(result.house).toBeDefined()
          expect(Array.isArray(result.house)).toBe(true)
          expect(result.house.length).toBe(12)
          expect(result.ascendant).toBeDefined()
          expect(result.mc).toBeDefined()
          
          // Validate house positions are in reasonable range
          result.house.forEach((house, index) => {
            expect(house).toBeGreaterThanOrEqual(0)
            expect(house).toBeLessThan(360)
          })
          
          resolve()
        })
      })
    })

    it('should calculate Koch houses', () => {
      return new Promise((resolve) => {
        swisseph.swe_houses(julday_ut, 52.5, 13.4, 'K', (result) => {
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

    it('should calculate Equal houses', () => {
      return new Promise((resolve) => {
        swisseph.swe_houses(julday_ut, 52.5, 13.4, 'E', (result) => {
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
  })

  describe('Planet Names', () => {
    it('should get Sun name', () => {
      return new Promise((resolve) => {
        swisseph.swe_get_planet_name(swisseph.SE_SUN, (result) => {
          expect(result.error).toBeFalsy()
          expect(result.name).toBe('Sun')
          resolve()
        })
      })
    })

    it('should get Moon name', () => {
      return new Promise((resolve) => {
        swisseph.swe_get_planet_name(swisseph.SE_MOON, (result) => {
          expect(result.error).toBeFalsy()
          expect(result.name).toBe('Moon')
          resolve()
        })
      })
    })

    it('should get Mercury name', () => {
      return new Promise((resolve) => {
        swisseph.swe_get_planet_name(swisseph.SE_MERCURY, (result) => {
          expect(result.error).toBeFalsy()
          expect(result.name).toBe('Mercury')
          resolve()
        })
      })
    })
  })

  describe('Fixed Stars', () => {
    const julday_ut = 2455927.5
    const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH

    it('should get Aldebaran position', () => {
      return new Promise((resolve) => {
        swisseph.swe_fixstar_ut('Aldebaran', julday_ut, flag, (body) => {
          expect(body.error).toBeFalsy()
          expect(body.name).toBeDefined()
          expect(body.longitude).toBeDefined()
          expect(body.latitude).toBeDefined()
          expect(body.distance).toBeDefined()
          expect(body.name).toContain('Aldebaran')
          resolve()
        })
      })
    })

    it('should get Sirius position', () => {
      return new Promise((resolve) => {
        swisseph.swe_fixstar_ut('Sirius', julday_ut, flag, (body) => {
          expect(body.error).toBeFalsy()
          expect(body.name).toBeDefined()
          expect(body.longitude).toBeDefined()
          expect(body.latitude).toBeDefined()
          expect(body.distance).toBeDefined()
          expect(body.name).toContain('Sirius')
          resolve()
        })
      })
    })

    it('should get fixed star magnitude', () => {
      return new Promise((resolve) => {
        swisseph.swe_fixstar_mag('Aldebaran', (result) => {
          expect(result.error).toBeFalsy()
          expect(result.name).toBeDefined()
          expect(result.magnitude).toBeDefined()
          expect(typeof result.magnitude).toBe('number')
          resolve()
        })
      })
    })
  })

  describe('Time Functions', () => {
    const julday_ut = 2455927.5

    it('should get delta T', () => {
      return new Promise((resolve) => {
        swisseph.swe_deltat(julday_ut, (result) => {
          expect(result.delta).toBeDefined()
          expect(typeof result.delta).toBe('number')
          expect(result.delta).toBeGreaterThan(0)
          resolve()
        })
      })
    })

    it('should get sidereal time', () => {
      return new Promise((resolve) => {
        swisseph.swe_sidtime(julday_ut, (result) => {
          expect(result.siderialTime).toBeDefined()
          expect(typeof result.siderialTime).toBe('number')
          expect(result.siderialTime).toBeGreaterThanOrEqual(0)
          expect(result.siderialTime).toBeLessThan(24)
          resolve()
        })
      })
    })
  })

  describe('Coordinate Systems', () => {
    const julday_ut = 2455927.5

    it('should calculate equatorial coordinates', () => {
      const flag = swisseph.SEFLG_EQUATORIAL | swisseph.SEFLG_MOSEPH
      
      return new Promise((resolve) => {
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, (body) => {
          expect(body.error).toBeFalsy()
          expect(body.rectAscension).toBeDefined()
          expect(body.declination).toBeDefined()
          expect(body.distance).toBeDefined()
          resolve()
        })
      })
    })

    it('should calculate rectangular coordinates', () => {
      const flag = swisseph.SEFLG_XYZ | swisseph.SEFLG_MOSEPH
      
      return new Promise((resolve) => {
        swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, (body) => {
          expect(body.error).toBeFalsy()
          expect(body.x).toBeDefined()
          expect(body.y).toBeDefined()
          expect(body.z).toBeDefined()
          resolve()
        })
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid planet numbers', () => {
      const julday_ut = 2455927.5
      const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH
      
      return new Promise((resolve) => {
        swisseph.swe_calc_ut(julday_ut, 999, flag, (body) => {
          expect(body.error).toBeDefined()
          expect(body.error).toBeTruthy()
          resolve()
        })
      })
    })

    it('should handle invalid dates', () => {
      return new Promise((resolve) => {
        swisseph.swe_date_conversion(2012, 13, 32, 25, 'g', (result) => {
          expect(result.error).toBeDefined()
          expect(result.error).toBeTruthy()
          resolve()
        })
      })
    })
  })
}) 