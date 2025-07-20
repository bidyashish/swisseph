{
  "targets": [
    {
      "target_name": "swissephz",
      "type": "static_library",
      "sources": [
        "swecl.c",
        "swedate.c",
        "swehel.c",
        "swehouse.c",
        "swejpl.c",
        "swemmoon.c",
        "swemplan.c",
        "sweph.c",
        "swephlib.c"
      ],
      "include_dirs": [
        "."
      ],
      "defines": [
        "USE_DLL=0",
        "USE_DOUBLE=1",
        "_WINDOWS=0"
      ],
      "cflags": [
        "-w",
        "-fms-extensions",
        "-Wno-unused-parameter",
        "-Wno-unused-but-set-parameter",
        "-Wno-missing-field-initializers",
        "-Wno-sign-compare"
      ],
      "xcode_settings": {
        "WARNING_CFLAGS": [
          "-w",
          "-Wno-unused-parameter",
          "-Wno-unused-but-set-parameter", 
          "-Wno-missing-field-initializers",
          "-Wno-sign-compare"
        ]
      }
    }
  ]
} 