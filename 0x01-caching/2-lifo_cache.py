#!/usr/bin/env python3
"""LIFO Cache class"""

BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """FIFO Cache class"""
    def __init__(self):
        """Init method"""
        super().__init__()

    def put(self, key, item):
        """Put method implementation"""
        if key is not None and item is not None:
            if len(self.cache_data) >= self.MAX_ITEMS:
                """Remove the oldest item (first inserted)"""
                newest_key = list(self.cache_data)[-1]
                print("DISCARD: {}".format(newest_key))
                del self.cache_data[newest_key]

            self.cache_data[key] = item

    def get(self, key):
        """Get method implementation"""
        super().get(key)
