# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive GitHub Actions CI/CD pipeline
- Modern Vitest testing framework alongside legacy tests
- Test coverage reporting with v8 provider
- Complete API documentation in README
- Modern ES6+ usage examples
- Multiple test workflows for different scenarios

### Changed
- Updated README.md with modern documentation
- Enhanced package.json with better metadata and scripts
- Improved build configuration with warning suppression
- Updated to Swiss Ephemeris library version 2.10.03
- Node.js requirement updated to >=18.0.0

### Fixed
- Removed all compiler warnings from build process
- Fixed node-gyp build configuration
- Improved error handling in test suites

## [0.5.18] - 2024-XX-XX

### Changed
- Updated Swiss Ephemeris library to version 2.10.03
- Improved build system with node-gyp 11.2.0
- Updated dependencies

### Fixed
- Build warnings suppressed through improved compiler flags
- Better compatibility with modern Node.js versions

## [0.5.9] - Previous Release

### Added
- Updated to Swiss Ephemeris v2.07.01
- New functions: fixstar2 and ayanamsa_ex
- Basic ephemeris files for 1800-2399 (including Chiron)
- Updated stars and asteroids list (sefstars.txt and seasnam.txt)

### Fixed
- Fixed polar ascendant calculations

## [0.5.7] - Previous Release

### Fixed
- Fixed UT/ET julian time calculations

## [0.5.6] - Previous Release  

### Fixed
- Fixed build compatibility for Node.js 4.x

## [0.5.5] - Previous Release

### Fixed
- Fixed house calculations for Gauquelin system

## [0.5.4] - Previous Release

### Changed
- Updated Swiss Ephemeris to v2.02.01

## [0.5.3] - Previous Release

### Fixed
- Fixed Windows build issues

## [0.5.2] - Previous Release

### Added
- Added NAN building for Node.js 0.10 and 0.12 support

## [0.5.1] - Previous Release

### Fixed
- Documentation improvements and fixes

## [0.5.0] - Previous Release

### Added
- Major project restructure
- Split into swisseph (this project) and swisseph-api
- Node.js 0.12+ requirement due to C addon API compatibility

### Changed
- Major refactor of the binding layer
- Improved API consistency
- Updated build system
