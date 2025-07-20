{
  'targets': [
    {
      'target_name': 'swisseph',
      'sources': [
        'src/util.cc',
        'src/date.cc',
        'src/swisseph.cc',
        'src/callback.cc',
        'src/pos.cc',
        'src/hel.cc',
        'src/house.cc',
        'src/eclipse.cc'
      ],
      'dependencies': [
      	'deps/swisseph/swisseph.gyp:swissephz'
      ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "deps/swisseph"
      ],
      "cflags": [
        "-Wno-unused-result",
        "-Wno-unused-parameter",
        "-Wno-unused-but-set-parameter",
        "-Wno-missing-field-initializers",
        "-Wno-sign-compare"
      ],
      "cflags_cc": [
        "-Wno-unused-parameter",
        "-Wno-unused-but-set-parameter",
        "-Wno-missing-field-initializers",
        "-Wno-sign-compare"
      ],
      "xcode_settings": {
        "WARNING_CFLAGS": [
          "-Wno-unused-parameter",
          "-Wno-unused-but-set-parameter", 
          "-Wno-missing-field-initializers",
          "-Wno-sign-compare"
        ]
      }
    }
  ]
}
