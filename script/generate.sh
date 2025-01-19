#!/bin/sh
WORKDIR="$(mktemp -d)"
BASENAME="japan_latest_$(date -I)"
QUACKOSM_WORKDIR="$WORKDIR/qosm"
PBF_FILE="$WORKDIR/japan-latest.osm.pbf"
GEOPARQUET_FILE="$QUACKOSM_WORKDIR/$BASENAME.parquet"

(
    PBF_MD5_FILE="$PBF_FILE.md5"
    cd "$WORKDIR" || exit
    curl -o "$PBF_FILE" -sSL 'https://download.geofabrik.de/asia/japan-latest.osm.pbf'
    curl -o "$PBF_MD5_FILE" -sSL 'https://download.geofabrik.de/asia/japan-latest.osm.pbf.md5'
    if ! md5sum -c --quiet --status "$PBF_MD5_FILE"
    then
        echo "checksum not match"
        exit 1
    fi
)

mkdir -p "$QUACKOSM_WORKDIR"
rye run quackosm \
    --osm-tags-filter '{"atm": true, "amenity": "atm", "shop": "convenience"}' \
    --keep-all-tags \
    --silent \
    -o "$GEOPARQUET_FILE" \
    --work-dir "$QUACKOSM_WORKDIR" \
    "$PBF_FILE"

rye run python src/atmjsongen/main.py --parquet "$GEOPARQUET_FILE" --geojson_dir .