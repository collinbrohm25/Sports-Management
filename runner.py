"""Module to run all of the services."""

from services.loader import Loader
from services.transformer import Transformer

def main():
    loader = Loader()
    loaded_data = loader.load_current_week()
    transformer = Transformer()
    transformer.transform_week(loaded_data)

if __name__ == '__main__':
    main()