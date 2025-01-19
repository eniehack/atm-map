import quackosm as qosm
from argparse import ArgumentParser
from typing import Callable
from pathlib import Path
import geopandas
from classopt import classopt, config
from time import strftime


@classopt
class CLIOpt:
    parquet: Path = config(long=True)
    geojson_dir: Path = config(long=True)

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

def is_convenience(tags):
    if "shop" in tags and tags["shop"] == "convenience":
        return True
    return False


if __name__ == "__main__":
    # argparser = ArgumentParser()
    # argparser.add_argument("-f", "--parquet", type=Path)
    # argparser.add_argument("-t", "--geojson_dir", type=Path)
    # argparser.parse_args()
    opt: CLIOpt = CLIOpt.from_args()

    gdf = geopandas.read_parquet(opt.parquet)
    gdf["tags"] = gdf["tags"].apply(lambda l: {i[0]: i[1] for i in l})
    gdf["brand"] = gdf["tags"].apply(get_sometag("brand"))
    gdf["name"] = gdf["tags"].apply(get_sometag("name"))
    gdf["atm"] = gdf["tags"].apply(is_atm)
    gdf["convenience"] = gdf["tags"].apply(is_convenience)
    gdf["opening_hours"] = gdf["tags"].apply(get_sometag("opening_hours"))
    gdf.geometry = gdf.representative_point()
    gdf.geometry = gdf.geometry.set_precision(grid_size=0.0000001)
    atm_gdf = gdf[gdf["atm"]]
    atm_gdf = atm_gdf[["feature_id", "brand", "name", "opening_hours", "geometry"]]
    atm_gdf.to_file(opt.geojson_dir / f"atm-{strftime("%Y%m%d")}.json", driver="GeoJSON")
    convenience_gdf = gdf[gdf["convenience"] & ~gdf["atm"]]
    convenience_gdf = convenience_gdf[["feature_id", "brand", "name", "opening_hours", "geometry"]]
    convenience_gdf.to_file(opt.geojson_dir / f"convenience-{strftime("%Y%m%d")}.json", driver="GeoJSON")