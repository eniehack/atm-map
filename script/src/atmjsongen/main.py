import json
from collections.abc import Callable
from pathlib import Path

import geopandas
import pandas
import typer


def get_sometag(target_tag: str) -> Callable[[dict[str, str]], str | None]:
    def func(tags: dict) -> str | None:
        if target_tag in tags:
            return tags[target_tag]
        else:
            return None

    return func


def is_atm(tags: dict):
    if "amenity" in tags and tags["amenity"] == "atm":
        return True
    elif "atm" in tags and tags["atm"] == "yes":
        return True
    else:
        return False


def is_bank(tags: dict):
    if "amenity" in tags and tags["amenity"] == "bank":
        return True
    else:
        return False


def is_convenience(tags: dict):
    if "shop" in tags and tags["shop"] == "convenience":
        return True
    return False


def get_openinghours(tags: dict):
    atm_opening = get_sometag("opening_hours:atm")(tags)
    if atm_opening is None:
        return get_sometag("opening_hours")(tags)
    return atm_opening


def extract_tags(row: list):
    tags = dict(row)
    typ: str
    if is_atm(tags):
        typ = "atm"
    elif is_bank(tags):
        typ = "bank"
    elif is_convenience(tags):
        typ = "convenience"
    return pandas.Series(
        {
            "brand": get_sometag("brand")(tags),
            "name": get_sometag("name")(tags),
            "type": typ,
            "opening_hours": get_openinghours(tags),
        }
    )


def main(parquet: Path, geojson_dir: Path = Path.cwd()):  # noqa: B008
    gdf = geopandas.read_parquet(parquet)
    gdf[
        [
            "brand",
            "name",
            "type",
            "opening_hours",
        ]
    ] = gdf["tags"].apply(extract_tags)

    gdf.geometry = gdf.representative_point().set_precision(grid_size=0.0000001)

    d: dict[str, geopandas.GeoDataFrame] = {}
    for typ in ("atm", "bank", "convenience"):
        d[f"{typ}.json"] = gdf[gdf["type"] == typ]

    for filename, target_gdf in d.items():
        target_gdf = target_gdf[
            ["feature_id", "brand", "name", "opening_hours", "geometry"]
        ]
        geojson_str = target_gdf.to_json()
        geojson_dict = json.loads(geojson_str)
        with open(geojson_dir / filename, "w", encoding="utf-8") as f:
            json.dump(geojson_dict, f, separators=(",", ":"), ensure_ascii=False)


if __name__ == "__main__":
    typer.run(main)
