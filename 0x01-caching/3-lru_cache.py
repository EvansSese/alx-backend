#!/usr/bin/env python3
"""LRU Cache class"""

BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """LRU Cache class"""
    def __init__(self):
        """Init method"""
        super().__init__()
        self.order_of_access = []

    def put(self, key, item):
        """Put method implementation"""
        if key is not None and item is not None:
            if len(self.cache_data) >= self.MAX_ITEMS:
                """Remove the least recently used item"""
                lru_key = self.order_of_access.pop(0)
                print("DISCARD: {}".format(lru_key))
                del self.cache_data[lru_key]

            self.cache_data[key] = item
            self.order_of_access.append(key)

    def get(self, key):
        """Get method implementation"""
        if key is not None:
            if key in self.order_of_access:
                self.order_of_access.remove(key)
                self.order_of_access.append(key)

            return self.cache_data.get(key, None)
        else:
            return None
