#!/usr/bin/env python3
"""Basic Cache class"""

BasicCaching = __import__('base_caching').BaseCaching


class BasicCache(BasicCaching):
    """Basic cache implementation class"""
    def __init__(self):
        super().__init__()

    def put(self, key, item):
        """Put method implementation"""
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        try:
            if key is None:
                return None
            return self.cache_data[key]
        except KeyError:
            return None
