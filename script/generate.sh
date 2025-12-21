#!/bin/sh
WORKDIR="$(mktemp -d)"
BASENAME="japan_latest_$(date -I)"
QUACKOSM_WORKDIR="$WORKDIR/qosm"
GEOPARQUET_FILE="$QUACKOSM_WORKDIR/$BASENAME.parquet"
VAR_FILE="$WORKDIR/variable"

(
    cd "$WORKDIR" || exit
    PBF_URL="$(curl -sSL -w '%{url_effective}' -I -o /dev/null  https://download.geofabrik.de/asia/japan-latest.osm.pbf)"
    PBF_BASENAME="$(basename "$PBF_URL")"
    PBF_FILE="$WORKDIR/$PBF_BASENAME"
    echo "$PBF_FILE" > "$VAR_FILE"
    PBF_MD5_FILE="$PBF_FILE.md5"
    curl --output-dir "$WORKDIR" -O -sSL "$PBF_URL"
    curl --output-dir "$WORKDIR" -O -sSL "$PBF_URL.md5"
    if ! md5sum -c --quiet --status "$PBF_MD5_FILE"
    then
        echo "checksum not match"
        exit 1
    fi
)

mkdir -p "$QUACKOSM_WORKDIR"
PBF_FILE="$(cat "$VAR_FILE" | head -n1)"
uv run -- quackosm \
    --osm-tags-filter '{"atm": true, "amenity": "atm", "shop": "convenience"}' \
    --keep-all-tags \
    --silent \
    -o "$GEOPARQUET_FILE" \
    --work-dir "$QUACKOSM_WORKDIR" \
    "$PBF_FILE"

uv run src/atmjsongen/main.py "$GEOPARQUET_FILE" 
