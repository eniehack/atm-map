from collections.abc import Callable
from pathlib import Path

import geopandas
import typer


def get_sometag(target_tag: str) -> Callable[dict, str | None]:
    def func(tags):
        if target_tag in tags:
            return tags[target_tag]
        else:
            return None

    return func


def is_atm(tags):
    if "amenity" in tags and tags["amenity"] == "atm":
        return True
    elif "atm" in tags and tags["atm"] == "yes":
        return True
    else:
        return False


def is_bank(tags):
    if "amenity" in tags and tags["amenity"] == "bank":
        return True
    else:
        return False


def is_convenience(tags):
    if "shop" in tags and tags["shop"] == "convenience":
        return True
    return False


def get_openinghours(tags):
    atm_opening = get_sometag("opening_hours:atm")(tags)
    if atm_opening is None:
        return get_sometag("opening_hours")(tags)
    return atm_opening


def main(parquet: Path, geojson_dir: Path = Path.cwd()): # noqa: B008
    gdf = geopandas.read_parquet(parquet)
    # タグはlist[tuple]の構造になっているので使いやすいようにdictに変換する
    gdf["tags"] = gdf["tags"].apply(lambda lst: {i[0]: i[1] for i in lst})
    gdf["brand"] = gdf["tags"].apply(get_sometag("brand"))
    gdf["name"] = gdf["tags"].apply(get_sometag("name"))
    gdf["atm"] = gdf["tags"].apply(is_atm)
    gdf["bank"] = gdf["tags"].apply(is_bank)
    gdf["convenience"] = gdf["tags"].apply(is_convenience)
    gdf["opening_hours"] = gdf["tags"].apply(get_openinghours)

    gdf.geometry = gdf.representative_point()
    gdf.geometry = gdf.geometry.set_precision(grid_size=0.0000001)

    d: dict[str, geopandas.GeoDataFrame] = {}
    atm_gdf = gdf[gdf["atm"]]
    d["atm.json"] = atm_gdf

    bank_gdf = gdf[gdf["bank"] & ~gdf["atm"]]
    d["bank.json"] = bank_gdf

    convenience_gdf = gdf[gdf["convenience"] & ~gdf["atm"]]
    d["convenicence.json"] = convenience_gdf

    for filename, target_gdf in d.items():
        target_gdf = target_gdf[
            ["feature_id", "brand", "name", "opening_hours", "geometry"]
        ]
        target_gdf.to_file(
            geojson_dir / filename, driver="GeoJSON", separators=(",", ":")
        )


if __name__ == "__main__":
    typer.run(main)
