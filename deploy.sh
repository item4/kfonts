#!/bin/sh
(
    cd packages && find . -maxdepth 1 -type d \( ! -name . \) -exec bash -c "cd '{}' && npm publish --access public" \;
)