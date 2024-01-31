#!/usr/bin/env python 3
"""LFU Class"""

BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    def __init__(self):
        """ Initialize LFUCache """
        super().__init__()
        self.frequency_counter = {}
        self.order_of_access = []

    def put(self, key, item):
        """ Add an item to the cache using LFU strategy """
        if key is not None and item is not None:

            self.frequency_counter[key] = self.frequency_counter.get(key, 0) + 1

            if len(self.cache_data) >= self.MAX_ITEMS:
                least_frequent_keys = [k for k, v in
                                       self.frequency_counter.items() if
                                       v == min(
                                           self.frequency_counter.values())]

                lru_key = min(least_frequent_keys,
                              key=lambda k: self.order_of_access.index(k)
                              if k in self.order_of_access else float('inf'))
                least_frequent_keys = [lru_key]

                lfu_key = least_frequent_keys[0]
                print("DISCARD: {}".format(lfu_key))
                if lfu_key in self.cache_data:
                    del self.cache_data[lfu_key]
                    del self.frequency_counter[lfu_key]
                    self.order_of_access.remove(lfu_key)

            self.cache_data[key] = item
            self.order_of_access.append(key)

    def get(self, key):
        """ Get an item from the cache by key """
        if key is not None:
            if key in self.order_of_access:
                self.order_of_access.remove(key)
                self.order_of_access.append(key)

            self.frequency_counter[key] = self.frequency_counter.get(key, 0) + 1

            return self.cache_data.get(key, None)
        else:
            return None
