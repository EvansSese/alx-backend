#!/usr/bin/env python3
"""MRU Cache class"""

BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """MRU Cache class"""
    def __init__(self):
        """Init method"""
        super().__init__()
        self.order_of_access = []

    def put(self, key, item):
        """Put method implementation"""
        if key is not None and item is not None:
            if len(self.cache_data) >= self.MAX_ITEMS:
                mru_key = list(self.cache_data.keys())[-1]
                print("DISCARD: {}".format(mru_key))
                del self.cache_data[mru_key]

            self.cache_data[key] = item

    def get(self, key):
        """Get method implementation"""
        if key is not None:
            return self.cache_data.get(key, None)
        else:
            return None
