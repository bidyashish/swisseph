# Swiss Ephemeris for Node.js

[![npm version](https://badge.fury.io/js/swisseph.svg)](https://badge.fury.io/js/swisseph)
[![Node.js CI](https://github.com/bidyashish/swisseph/actions/workflows/ci.yml/badge.svg)](https://github.com/bidyashish/swisseph/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-AGPL%2FGPL-blue.svg)](https://github.com/astrodienst/swisseph)

Swiss Ephemeris binding for Node.js - High precision astronomy and astrology calculations.

## About

Swiss Ephemeris binding for Node.js providing accurate astronomical calculations for:
- Planet positions and movements
- Lunar and solar eclipses
- House calculations
- Fixed stars positions
- Astrological aspects
- And much more...

Based on the Swiss Ephemeris library version **2.10.03** by Astrodienst AG.

See [Swiss Ephemeris](http://www.astro.com/swisseph/swephinfo_e.htm) for more details.

**Supported platforms:** macOS | Windows | Linux | FreeBSD

## Installation

### Prerequisites

- Node.js 18 or newer
- Python 3.x (for compilation)
- C++ compiler (automatically handled by node-gyp)

### Install via npm

```bash
npm install swisseph
```

### Install from source

```bash
git clone https://github.com/bidyashish/swisseph.git
cd swisseph
npm install
npm run build
```

## Quick Start

### Basic Usage

```javascript
const swisseph = require('swisseph');

// Set ephemeris data path (optional, uses Moshier by default)
swisseph.swe_set_ephe_path(__dirname + '/ephe');

// Test date
const date = { year: 2024, month: 1, day: 1, hour: 0 };

// Get Julian Day
swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, (julday_ut) => {
  console.log('Julian Day:', julday_ut);

  const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;

  // Get Sun position
  swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, (sun) => {
    console.log('Sun position:', {
      longitude: sun.longitude,
      latitude: sun.latitude,
      distance: sun.distance
    });
  });

  // Get Moon position
  swisseph.swe_calc_ut(julday_ut, swisseph.SE_MOON, flag, (moon) => {
    console.log('Moon position:', {
      longitude: moon.longitude,
      latitude: moon.latitude,
      distance: moon.distance
    });
  });
});
```

### Modern ES6+ Usage

```javascript
import swisseph from 'swisseph';

const calculatePlanet = (julday, planet) => {
  return new Promise((resolve, reject) => {
    const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;
    swisseph.swe_calc_ut(julday, planet, flag, (result) => {
      if (result.error) {
        reject(new Error(result.error));
      } else {
        resolve(result);
      }
    });
  });
};

// Usage with async/await
async function getPositions() {
  try {
    const julday = 2460676.5; // 2024-01-01
    const sun = await calculatePlanet(julday, swisseph.SE_SUN);
    const moon = await calculatePlanet(julday, swisseph.SE_MOON);
    
    console.log('Sun:', sun);
    console.log('Moon:', moon);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

## API Reference

### Main Calculation Functions

- `swe_calc_ut(julday, planet, flags, callback)` - Calculate planet positions
- `swe_julday(year, month, day, hour, calendar, callback)` - Convert date to Julian Day
- `swe_houses(julday, lat, lon, hsys, callback)` - Calculate astrological houses
- `swe_fixstar_ut(star, julday, flags, callback)` - Calculate fixed star positions

### Available Planets

```javascript
swisseph.SE_SUN        // Sun
swisseph.SE_MOON       // Moon
swisseph.SE_MERCURY    // Mercury
swisseph.SE_VENUS      // Venus
swisseph.SE_MARS       // Mars
swisseph.SE_JUPITER    // Jupiter
swisseph.SE_SATURN     // Saturn
swisseph.SE_URANUS     // Uranus
swisseph.SE_NEPTUNE    // Neptune
swisseph.SE_PLUTO      // Pluto
swisseph.SE_CHIRON     // Chiron
```

### Ephemeris Types

The library supports three ephemeris types:

1. **Moshier** - Built-in, no external files needed (default)
2. **Swiss Ephemeris** - High precision, requires data files (~90MB)
3. **JPL** - Highest precision, requires data files (~2.9GB)

```javascript
// Moshier (default)
const flag = swisseph.SEFLG_MOSEPH;

// Swiss Ephemeris (requires data files)
const flag = swisseph.SEFLG_SWIEPH;

// JPL (requires data files)
const flag = swisseph.SEFLG_JPLEPH;

## Advanced Features

### House Calculations

```javascript
swisseph.swe_houses(julday, latitude, longitude, 'P', (result) => {
  console.log('Houses:', result.house);
  console.log('Ascendant:', result.ascendant);
  console.log('MC:', result.mc);
});
```

### Eclipse Calculations

```javascript
// Solar eclipse
swisseph.swe_sol_eclipse_when_glob(julday, 0, 0, (result) => {
  console.log('Next solar eclipse:', result);
});

// Lunar eclipse
swisseph.swe_lun_eclipse_when(julday, 0, 0, (result) => {
  console.log('Next lunar eclipse:', result);
});
```

### Fixed Stars

```javascript
swisseph.swe_fixstar_ut('Aldebaran', julday, swisseph.SEFLG_MOSEPH, (star) => {
  console.log('Aldebaran position:', star);
});
```

## Testing

The project includes comprehensive tests using both legacy Node.js test runner and modern Vitest.

### Run all tests
```bash
npm test
```

### Run specific test suites
```bash
npm run test:main        # Legacy tests
npm run test:datetime    # Date/time tests  
npm run test:vitest      # Modern Vitest tests
npm run test:vitest:run  # Run Vitest in CI mode
npm run test:vitest:ui   # Run Vitest with UI
```

### Test with different Node.js versions
```bash
# The package is tested on Node.js 18, 20, and 22
node --version  # Check your version
npm test
```

## Development

### Building from source
```bash
git clone https://github.com/bidyashish/swisseph.git
cd swisseph
npm install
npm run build
```

### Available scripts
```bash
npm run build       # Build the native module
npm run clean       # Clean build artifacts
npm test           # Run all tests
npm run test:vitest # Run modern tests with Vitest
```

### Debugging build issues
```bash
# Clean everything and rebuild
npm run clean
rm -rf node_modules
npm install
npm run build
```

## Examples

See the `examples/` folder for comprehensive usage examples:

- `examples/astro.js` - Basic astronomical calculations
- `examples/planets.js` - Planet position calculations
- `examples/eclipses.js` - Eclipse calculations
- `examples/houses.js` - Astrological house systems
- `examples/stars.js` - Fixed star positions

## Coordinate Systems

The library supports different coordinate systems:

```javascript
// Ecliptic coordinates (default)
const flag = swisseph.SEFLG_MOSEPH;

// Equatorial coordinates
const flag = swisseph.SEFLG_MOSEPH | swisseph.SEFLG_EQUATORIAL;

// Rectangular coordinates
const flag = swisseph.SEFLG_MOSEPH | swisseph.SEFLG_XYZ;
```

## Data Files

### Swiss Ephemeris Files
Download from: [ftp://www.astro.com/pub/swisseph/ephe](ftp://www.astro.com/pub/swisseph/ephe)
- Size: ~90MB
- Precision: 0.001 arcseconds
- Coverage: 13000 BC - 17000 AD

### JPL Files  
Download from: [ftp://www.astro.com/pub/jplfiles](ftp://www.astro.com/pub/jplfiles)
- Size: ~2.9GB
- Precision: Maximum available
- Coverage: 13000 BC - 17000 AD

## Version History

- **0.5.18** - Updated to Swiss Ephemeris 2.10.03, improved build system
- **0.5.9** - Updated to Swiss Ephemeris 2.07.01, added new functions
- **0.5.0** - Major refactor, Node.js 0.12+ support

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

### Reporting Issues

Please report bugs and feature requests on [GitHub Issues](https://github.com/bidyashish/swisseph/issues).

## License

This project is licensed under the same terms as the original Swiss Ephemeris:
- **AGPL 3.0** for open source projects  
- **Commercial license** available from Astrodienst AG

See the [Swiss Ephemeris license page](http://www.astro.com/swisseph/swephinfo_e.htm) for details.

## Documentation & Resources

- [Swiss Ephemeris Programming Interface](http://www.astro.com/swisseph/swephprg.htm)
- [Swiss Ephemeris Documentation](http://www.astro.com/swisseph/swephinfo_e.htm)
- [Astrodienst AG](http://www.astro.com) - Original authors

---

**Maintained by:** [bidyashish](https://github.com/bidyashish)  
**Original Author:** [mivion](https://github.com/mivion)
